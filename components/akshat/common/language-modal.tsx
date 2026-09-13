"use client";

import { motion } from "framer-motion";
import { Check, Globe } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogXClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n/language-context";
import { AKSHAT_LANGUAGES } from "@/lib/i18n/akshat-translations";
import { useAkshat } from "@/components/akshat/akshat-context";

export function LanguageSelectorModal() {
  const { t, isLanguageModalOpen, setIsLanguageModalOpen } = useAkshat();
  const { lang, setLang } = useLang();

  const current = AKSHAT_LANGUAGES.find((l) => l.code === lang) ?? AKSHAT_LANGUAGES[0];

  return (
    <Dialog open={isLanguageModalOpen} onOpenChange={setIsLanguageModalOpen}>
      <DialogContent className="max-w-md overflow-hidden rounded-3xl p-0">
        <div className="border-b border-slate-100 px-6 pb-4 pt-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-teal-200 bg-teal-50 text-teal-700 shadow-xs">
                <Globe className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <DialogTitle className="flex items-center gap-1.5 text-base font-black">
                  {t("multiLanguageTitle", "Multi-Language / भाषा")}
                </DialogTitle>
                <DialogDescription className="text-[11px]">
                  {t(
                    "chooseLanguageDesc",
                    "Select your preferred language for instant platform translation.",
                  )}
                </DialogDescription>
              </div>
            </div>
            <DialogXClose onClick={() => setIsLanguageModalOpen(false)} />
          </div>
        </div>


        <div className="flex items-center justify-between border-b border-teal-100 bg-teal-50/60 px-6 py-3 text-xs">
          <span className="font-semibold text-teal-900">
            {t("currentLanguageLabel", "Current Language")}
          </span>
          <span className="rounded-full border border-teal-200 bg-white px-2.5 py-0.5 font-bold text-teal-700">
            {current.nativeName} ({current.code.toUpperCase()})
          </span>
        </div>


        <div className="max-h-[380px] space-y-2 overflow-y-auto p-4 sm:p-6">
          {AKSHAT_LANGUAGES.map((langItem) => {
            const isSelected = lang === langItem.code;
            return (
              <motion.div
                key={langItem.code}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setLang(langItem.code);
                  setTimeout(() => setIsLanguageModalOpen(false), 250);
                }}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 transition-all",
                  isSelected
                    ? "border-teal-600 bg-teal-50/80 shadow-xs"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-label={langItem.name}>
                    {langItem.flag}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                      <span>{langItem.nativeName}</span>
                      <span className="text-xs font-medium text-slate-700">({langItem.name})</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-700">
                      {t("isoCode", "ISO Code:")} {langItem.code}
                    </span>
                  </div>
                </div>

                <div
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full border transition-all",
                    isSelected
                      ? "border-teal-600 bg-teal-600 text-white shadow-xs"
                      : "border-slate-300 bg-white",
                  )}
                >
                  {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </div>
              </motion.div>
            );
          })}
        </div>


        <div className="flex items-center justify-between bg-slate-50 px-6 py-4">
          <span className="text-[11px] text-slate-700">
            {t("liveInstantTranslation", "Live instant translation applied")}
          </span>
          <Button onClick={() => setIsLanguageModalOpen(false)}>
            {t("applyLanguage", "Apply Language")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
