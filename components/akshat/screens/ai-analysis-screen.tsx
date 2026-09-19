"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";

import type { ScreenId } from "@/lib/akshat-types";
import { cn } from "@/lib/utils";
import { useAkshat } from "@/components/akshat/akshat-context";
import { AISphere } from "@/components/akshat/common/ai-sphere";
import { PlatformStatsWidget } from "@/components/akshat/widgets/platform-stats-widget";

interface AIAnalysisScreenProps {
  setScreen: (screen: ScreenId) => void;
}

export const AIAnalysisScreen = ({ setScreen }: AIAnalysisScreenProps) => {
  const { t } = useAkshat();
  const [analysisProgress, setAnalysisProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 3000;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.round((elapsed / duration) * 100));
      setAnalysisProgress(progress);

      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setScreen("ai_confirmation");
        }, 500);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [setScreen]);

  const steps = [
    {
      id: "step-image",
      title: t("aiStepImage", "Image Processing & Damage Segmentation"),
      isDone: analysisProgress >= 30,
      statusText: analysisProgress >= 30 ? t("statusVerified", "Verified") : t("statusProcessing", "Processing..."),
    },
    {
      id: "step-location",
      title: t("aiStepLocation", "Location Analysis & GPS EXIF Verification"),
      isDone: analysisProgress >= 60,
      statusText: analysisProgress >= 60 ? t("statusPassed", "Passed") : t("statusTriaging", "Triaging..."),
    },
    {
      id: "step-classification",
      title: t("aiStepClassification", "Issue Classification & CSR Impact Match"),
      isDone: analysisProgress >= 90,
      statusText: analysisProgress >= 90 ? t("statusMatched", "Matched") : t("statusQueueing", "Queueing..."),
    },
  ];

  return (
    <div className="relative z-10 mx-auto min-h-full max-w-2xl bg-transparent p-4 pb-28 sm:p-6">
      <div className="mb-4">
        <PlatformStatsWidget compact={true} columns={3} />
      </div>

      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0 4px 12px rgba(13, 148, 136, 0.15)" }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setScreen("report")}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-xs transition-colors hover:bg-slate-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </motion.button>
          <div>
            <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
              {t("aiTriageRunning", "AI Autonomous Triage")}
            </h2>
            <p className="text-xs text-slate-700">
              {t("aiAnalyzingDesc", "Computer vision inspecting damage severity & dispatching orders")}
            </p>
          </div>
        </div>

        <span className="flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700 shadow-2xs">
          <AlertTriangle className="h-3.5 w-3.5 text-orange-500" />
          {t("urgencyHigh", "High Urgency")}
        </span>
      </div>

      <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-lg sm:p-8">
        <AISphere progress={analysisProgress} />

        <div>
          <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-600">
            {t("aiTriageRunning", "AI Triage Running")} ({analysisProgress}%)
          </span>
          <h3 className="mt-3 text-xl font-black text-slate-900">
            {t("aiAnalyzingTitle", "Analyzing Structural Defect & Impact")}
          </h3>
          <p className="mx-auto mt-1 max-w-md text-xs text-slate-700">
            {t("aiAnalyzingDesc", "Deep neural vision is verifying leak signature, estimating affected population, and matching local engineering faculties.")}
          </p>
        </div>

        <div className="h-3.5 w-full overflow-hidden rounded-full border border-slate-200 bg-slate-100 p-0.5">
          <div
            className="h-full rounded-full bg-teal-600 transition-all duration-75"
            style={{ width: `${analysisProgress}%` }}
          ></div>
        </div>

        <div className="space-y-2.5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
          {steps.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24, delay: index * 0.18 }}
              className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-2.5 text-xs shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                {item.isDone ? (
                  <CheckCircle className="h-4 w-4 flex-shrink-0 text-teal-600" />
                ) : (
                  <Loader2 className="h-4 w-4 flex-shrink-0 animate-spin text-orange-500" />
                )}
                <span className="font-semibold text-slate-800">{item.title}</span>
              </div>
              <span
                className={cn(
                  "font-mono text-[11px] font-bold",
                  item.isDone ? "text-teal-700" : "text-orange-600",
                )}
              >
                {item.statusText}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 pt-2 text-left sm:grid-cols-3">
          <div className="rounded-2xl border border-sky-200 bg-sky-50/80 p-3 shadow-2xs">
            <span className="block text-[10px] font-extrabold uppercase text-sky-700">{t("identifiedObject", "Identified Object")}</span>
            <span className="mt-0.5 block text-xs font-bold text-slate-900">{t("identifiedObjectValue", "4-inch Fractured PVC Pipe")}</span>
          </div>
          <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-3 shadow-2xs">
            <span className="block text-[10px] font-extrabold uppercase text-rose-700">{t("estimatedImpact", "Estimated Impact")}</span>
            <span className="mt-0.5 block text-xs font-bold text-rose-700">{t("estimatedImpactValue", "50+ Families Cut Off")}</span>
          </div>
          <div className="rounded-2xl border border-purple-200 bg-purple-50/80 p-3 shadow-2xs">
            <span className="block text-[10px] font-extrabold uppercase text-purple-700">{t("aiMatchPartner", "AI Match Partner")}</span>
            <span className="mt-0.5 block text-xs font-bold text-purple-800">{t("aiMatchPartnerValue", "IIT Jodhpur Water Systems")}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 pt-2 font-mono text-[11px] text-slate-700">
          <span className="h-2 w-2 animate-ping rounded-full bg-teal-600"></span>
          {t("autoForwarding", "Auto-forwarding to verification receipt in 3 seconds...")}
        </div>
      </div>
    </div>
  );
};
