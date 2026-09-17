
"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { UploadCloud, File, Image as ImageIcon, X, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DocumentUploaderProps {
  label?: string;
  hint?: string;
  accept?: string;
  maxSizeMB?: number;
  onUploadSuccess?: (file: File) => void;
  onFileReady?: (file: File) => void;
}

type UploadState = "idle" | "dragging" | "uploading" | "success" | "error";

export function DocumentUploader({
  label = "Upload Document",
  hint = "Supports PDF, PNG, JPG. Max 10MB.",
  accept = "image/*,.pdf",
  maxSizeMB = 10,
  onUploadSuccess,
  onFileReady,
}: DocumentUploaderProps) {
  const [state, setState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (state !== "uploading" && state !== "success") {
      setState("dragging");
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (state === "dragging") {
      setState("idle");
    }
  };

  const validateAndProcessFile = (selectedFile: File) => {
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setErrorMsg(`File exceeds ${maxSizeMB}MB limit.`);
      setState("error");
      return;
    }

    setFile(selectedFile);
    setState("uploading");
    setProgress(0);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15 + 5;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setState("success");
          onUploadSuccess?.(selectedFile);
          onFileReady?.(selectedFile);
        }, 300);
      } else {
        setProgress(currentProgress);
      }
    }, 150);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (state === "uploading" || state === "success") return;
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      validateAndProcessFile(droppedFiles[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const handleReset = () => {
    setState("idle");
    setFile(null);
    setProgress(0);
    setErrorMsg("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isImage = file?.type.startsWith("image/");

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-bold text-slate-900">{label}</label>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => state === "idle" || state === "error" ? fileInputRef.current?.click() : undefined}
        className={cn(
          "relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-200",
          state === "idle" ? "cursor-pointer border-slate-300 bg-slate-50 hover:border-primary-400 hover:bg-slate-100" : "",
          state === "dragging" ? "cursor-copy border-primary-500 bg-primary-50" : "",
          state === "uploading" ? "cursor-wait border-slate-200 bg-white" : "",
          state === "success" ? "border-emerald-200 bg-emerald-50/50" : "",
          state === "error" ? "cursor-pointer border-rose-300 bg-rose-50" : "",
        )}
      >
        <input
          type="file"
          className="hidden"
          accept={accept}
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <AnimatePresence mode="wait">
          {(state === "idle" || state === "dragging") && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-900/5">
                <UploadCloud className="h-6 w-6 text-slate-500" />
              </div>
              <p className="text-sm font-medium text-slate-700">
                <span className="font-bold text-primary-600">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs font-medium text-slate-500">{hint}</p>
            </motion.div>
          )}

          {state === "uploading" && (
            <motion.div
              key="uploading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex w-full flex-col items-center gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="animate-pulse rounded-lg bg-slate-100 p-2">
                  <File className="h-5 w-5 text-slate-400" />
                </div>
                <div className="text-left">
                  <p className="max-w-[200px] truncate text-sm font-bold text-slate-900">
                    {file?.name}
                  </p>
                  <p className="text-xs font-medium text-slate-500">
                    Uploading... {Math.round(progress)}%
                  </p>
                </div>
              </div>
              <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full bg-primary-500 transition-all duration-150 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          )}

          {state === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex w-full items-center justify-between gap-4 rounded-xl bg-white p-3 shadow-sm ring-1 ring-emerald-200"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  {isImage ? <ImageIcon className="h-5 w-5" /> : <File className="h-5 w-5" />}
                </div>
                <div className="min-w-0 text-left">
                  <p className="truncate text-sm font-bold text-slate-900">{file?.name}</p>
                  <p className="text-xs font-medium text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Upload complete
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                className="shrink-0 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                title="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          {state === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-rose-200">
                <AlertCircle className="h-6 w-6 text-rose-500" />
              </div>
              <p className="text-sm font-bold text-rose-700">Upload failed</p>
              <p className="text-xs font-medium text-rose-600">{errorMsg}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                  fileInputRef.current?.click();
                }}
                className="mt-2 text-xs font-bold text-slate-700 hover:text-slate-900 underline underline-offset-2"
              >
                Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

