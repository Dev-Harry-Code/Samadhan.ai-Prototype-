"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Send } from "lucide-react";

import type { ScreenId } from "@/lib/akshat-types";
import { useAkshat } from "@/components/akshat/akshat-context";
import { PlatformStatsWidget } from "@/components/akshat/widgets/platform-stats-widget";

interface AIConfirmationScreenProps {
  setScreen: (screen: ScreenId) => void;
  onSubmitReport: () => void;
}

export const AIConfirmationScreen = ({
  setScreen,
  onSubmitReport,
}: AIConfirmationScreenProps) => {
  const { t } = useAkshat();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = () => {
    onSubmitReport();
    setShowSuccessModal(true);
    setTimeout(() => {
      setScreen("issues_feed");
    }, 2400);
  };

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
            onClick={() => setScreen("home")}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-xs transition-colors hover:bg-slate-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </motion.button>
          <div>
            <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
              {t("confirmedTitle", "AI Verification Confirmation")}
            </h2>
            <p className="text-xs text-slate-700">
              {t("confirmedSubtitle", "Validated with 96.8% confidence • Ready for dispatch")}
            </p>
          </div>
        </div>

        <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 shadow-2xs">
          {t("preApproved", "Pre-Approved")}
        </span>
      </div>

      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-700 shadow-sm"
          >
            <CheckCircle2 className="h-9 w-9 text-teal-600" />
          </motion.div>
          <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-700">
            {t("verifiedDispatched", "Verified & Dispatched")}
          </span>
          <h3 className="mt-2 text-2xl font-black text-slate-900">
            {t("confirmedTitle", "Issue Confirmed: #LOK-9428")}
          </h3>
          <p className="mx-auto mt-1 max-w-md text-xs text-slate-700">
            {t("confirmedDesc", "Your report has been validated with 96.8% AI confidence. Work orders and community volunteer alerts have been drafted.")}
          </p>
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-xs">
            <span className="font-medium text-slate-700">{t("trackingRef", "Tracking Reference")}</span>
            <span className="font-mono font-bold text-slate-900">#LOK-9428-RANCHI</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-xs">
            <span className="font-medium text-slate-700">{t("assignedUrgency", "Assigned Urgency")}</span>
            <span className="rounded border border-orange-200 bg-orange-50 px-2 py-0.5 font-bold text-orange-600">
              {t("urgencyHigh", "High Urgency")}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-xs">
            <span className="font-medium text-slate-700">{t("assignedDept", "Assigned Department")}</span>
            <span className="font-semibold text-slate-800">{t("deptWaterBoard", "Water Supply & Sanitation Board")}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-700">{t("karmaEarned", "Citizen Karma Earned")}</span>
            <span className="font-mono font-bold text-teal-700">+120 {t("xpPoints", "XP Points")}</span>
          </div>
        </div>

        <div className="space-y-2.5 pt-2">
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -4px rgba(13, 148, 136, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="btn-breathing flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-600 py-4 text-sm font-extrabold text-white shadow-md transition-all hover:bg-teal-700"
          >
            <Send className="h-4 w-4" />
            <span>{t("submitReport", "Submit Report")}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setScreen("home")}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 text-xs font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50"
          >
            {t("backToDashboard", "Cancel & Return to Dashboard")}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-2xl sm:p-8"
            >
              <div className="pointer-events-none absolute -top-12 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-teal-500/20 blur-2xl"></div>

              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl border-2 border-teal-500/30 bg-teal-50 text-teal-600 shadow-md"
              >
                <CheckCircle2 className="h-12 w-12 stroke-[2.5]" />
              </motion.div>

              <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-700">
                {t("submissionSuccess", "Submission Successful")}
              </span>

              <h4 className="mb-1 mt-3 text-xl font-black text-slate-900">
                {t("reportDispatched", "Report Dispatched!")}
              </h4>

              <p className="mb-4 text-xs leading-relaxed text-slate-700">
                {t("loggedLedgerPrefix", "Issue")} <strong className="text-slate-900">#LOK-9428</strong>{" "}
                {t("loggedLedger", "has been logged to the public ledger.")}{" "}
                <span className="font-bold text-teal-700">+120 Karma XP</span>{" "}
                {t("karmaAddedToProfile", "added to your citizen profile!")}
              </p>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setScreen("issues_feed")}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-teal-600 py-3 text-xs font-bold text-white shadow-md hover:bg-teal-700"
              >
                <span>{t("viewFeedNow", "View on Public Feed Now")}</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
