"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Camera,
  MapPin,
  X,
} from "lucide-react";

import type { ScreenId } from "@/lib/akshat-types";
import { cn } from "@/lib/utils";
import { useAkshat } from "@/components/akshat/akshat-context";
import { DocumentUploader } from "@/components/ui/document-uploader";

interface ReportIssueScreenProps {
  setScreen: (screen: ScreenId) => void;
}

const PHOTO_URL =
  "https://images.pexels.com/photos/19156793/pexels-photo-19156793.jpeg?auto=compress&cs=tinysrgb&w=800";

export const ReportIssueScreen = ({ setScreen }: ReportIssueScreenProps) => {
  const { t } = useAkshat();
  const [photo, setPhoto] = useState<string | null>(PHOTO_URL);
  const [description, setDescription] = useState<string | null>(null);
  const shownDescription =
    description ??
    t(
      "issue.lok-001.description",
      "The main pipeline feeding the community water tap has been fractured for 3 weeks, leaving over 50 families without clean municipal drinking water.",
    );
  const [category, setCategory] = useState("Water Resources");
  const [urgency] = useState<"High Urgency" | "Moderate" | "Critical">("High Urgency");

  const handleConfirmLocation = () => {
    setScreen("ai_analysis");
  };

  return (
    <div className="relative z-10 mx-auto min-h-full max-w-2xl bg-transparent p-4 pb-28 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0 4px 12px rgba(13, 148, 136, 0.15)" }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setScreen("home")}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-xs transition-colors hover:bg-slate-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </motion.button>
          <div>
            <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
              {t("reportWithAI", "Report Civic Issue")}
            </h2>
            <p className="text-xs text-slate-700">
              {t("reportSubtitle", "AI triage will verify & categorize automatically")}
            </p>
          </div>
        </div>

        <span className="flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700 shadow-2xs">
          <AlertTriangle className="h-3.5 w-3.5 text-orange-500" />
          {t("urgencyHigh", urgency)}
        </span>
      </div>

      <div className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="mb-2.5 flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Camera className="h-3.5 w-3.5 text-teal-600" />
              <span>{t("photoEvidence", "Photographic Evidence")}</span>
            </label>
            <span className="rounded-full border border-teal-200 bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-teal-700">
              {t("aiVisionReady", "AI Vision Ready")}
            </span>
          </div>

          {photo ? (
            <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
              <Image src={photo} alt="Issue" fill sizes="(max-width: 768px) 100vw, 672px" className="object-cover" />
              <button
                onClick={() => setPhoto(null)}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black/80"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white/90 px-3 py-1 text-xs font-semibold text-teal-800 shadow-xs backdrop-blur-md">
                <MapPin className="h-3.5 w-3.5 text-teal-600" />
                {t("gpsExifVerified", "GPS EXIF Verified")}
              </div>
            </div>
          ) : (
            <DocumentUploader
              label="Capture or Upload Photo"
              hint="Supports JPG, PNG. Automatic location tagging enabled."
              accept="image/*"
              onUploadSuccess={() => setPhoto(PHOTO_URL)}
            />
          )}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs">
          <label className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
            <MapPin className="h-3.5 w-3.5 text-teal-600" />
            <span>{t("autoGpsLocation", "Auto-Detected GPS Location")}</span>
          </label>
          <div className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
            <div className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 flex-shrink-0 text-teal-600" />
              <span className="font-medium text-slate-900">{t("reportLocation", "Village X, Ranchi, Jharkhand (Ward 14)")}</span>
            </div>
            <span className="rounded border border-teal-200 bg-teal-50 px-2 py-0.5 font-mono text-xs font-bold text-teal-700">{t("accuracyLabel", "Accuracy: 4m")}</span>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs">
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
            {t("categoryField", "Category")}
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[
              { id: "Water Resources", label: t("catWater", "Water Resources"), bg: "border-sky-400 bg-sky-50 text-sky-800" },
              { id: "Sanitation", label: t("catGarbage", "Sanitation"), bg: "border-teal-400 bg-teal-50 text-teal-800" },
              { id: "Roads", label: t("catRoad", "Roads"), bg: "border-emerald-400 bg-emerald-50 text-emerald-800" },
              { id: "Electricity", label: t("catElectricity", "Electricity"), bg: "border-amber-400 bg-amber-50 text-amber-800" },
              { id: "Transport", label: t("catTransport", "Transport"), bg: "border-purple-400 bg-purple-50 text-purple-800" },
              { id: "Healthcare", label: t("catHealthcare", "Healthcare"), bg: "border-rose-400 bg-rose-50 text-rose-800" },
            ].map((catItem) => (
              <motion.button
                key={catItem.id}
                type="button"
                whileHover={{ scale: 1.04, boxShadow: "0 4px 12px rgba(13, 148, 136, 0.15)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategory(catItem.id)}
                className={cn(
                  "rounded-xl border px-3 py-2 text-xs font-bold transition-all",
                  category === catItem.id
                    ? `${catItem.bg} shadow-xs ring-2 ring-teal-500`
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100",
                )}
              >
                {catItem.label}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs">
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
            {t("problemDescription", "Problem Description")}
          </label>
          <textarea
            value={shownDescription}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition-all placeholder-slate-500 focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
            placeholder={t("descriptionPlaceholder", "Describe what's happening, e.g., Community drinking tap fractured for 3 weeks...")}
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 12px 28px -4px rgba(13, 148, 136, 0.45)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleConfirmLocation}
          disabled={!photo || shownDescription.length < 4}
          className="btn-breathing flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-600 py-4 font-extrabold text-white shadow-md transition-all hover:bg-teal-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
        >
          <MapPin className="h-5 w-5" />
          <span>{t("confirmLocation", "Confirm Location")}</span>
          <ArrowRight className="ml-1 h-5 w-5" />
        </motion.button>
      </div>
    </div>
  );
};
