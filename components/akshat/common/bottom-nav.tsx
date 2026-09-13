"use client";

import { motion } from "framer-motion";
import { Clock, Home, Plus, Search, User } from "lucide-react";

import type { ScreenId } from "@/lib/akshat-types";
import { cn } from "@/lib/utils";
import { useAkshat } from "@/components/akshat/akshat-context";

interface BottomNavProps {
  currentScreen: ScreenId;
  setScreen: (screen: ScreenId) => void;
}

export function BottomNav({ currentScreen, setScreen }: BottomNavProps) {
  const { t } = useAkshat();

  const tabClass = (screens: ScreenId[]) =>
    cn(
      "flex h-full flex-1 flex-col items-center justify-center space-y-1 transition-all",
      screens.includes(currentScreen) ? "font-bold text-teal-700" : "text-slate-700 hover:text-slate-900",
    );

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-40 flex justify-center px-4 md:hidden">
      <nav className="pointer-events-auto relative flex h-14 w-full max-w-md items-center justify-between gap-1 rounded-full bg-white/95 px-2 shadow-xl ring-1 ring-slate-900/10 backdrop-blur-xl">
        <div className="flex flex-1 justify-around">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setScreen("home")}
            className={tabClass(["home"])}
          >
            <Home className="h-5 w-5" />
            <span className="mt-0.5 text-[10px]">{t("navHome", "Home")}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setScreen("issues_feed")}
            className={tabClass(["issues_feed", "issue_details"])}
          >
            <Search className="h-5 w-5" />
            <span className="mt-0.5 text-[10px]">{t("navSearch", "Search")}</span>
          </motion.button>
        </div>

        <div className="relative flex h-14 w-14 flex-shrink-0 justify-center">
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 8px 30px rgba(249, 115, 22, 0.65)" }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setScreen("report")}
            title={t("reportWithAI", "Report Civic Issue")}
            className={cn(
              "fab-pulse absolute -top-6 z-10 flex h-12 w-12 items-center justify-center rounded-2xl text-white transition-all",
              currentScreen === "report"
                ? "scale-105 bg-orange-600 shadow-[0_6px_25px_rgba(249,115,22,0.6)] ring-4 ring-orange-300"
                : "bg-orange-500 shadow-[0_4px_20px_rgba(249,115,22,0.45)] hover:bg-orange-600",
            )}
          >
            <Plus className="h-6 w-6 stroke-[2.5]" />
          </motion.button>
        </div>

        <div className="flex flex-1 justify-around">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setScreen("ai_confirmation")}
            className={tabClass(["ai_confirmation", "ai_analysis"])}
          >
            <Clock className="h-5 w-5" />
            <span className="mt-0.5 text-[10px]">{t("navActivity", "Activity")}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setScreen("profile")}
            className={tabClass(["profile"])}
          >
            <User className="h-5 w-5" />
            <span className="mt-0.5 text-[10px]">{t("navProfile", "Profile")}</span>
          </motion.button>
        </div>
      </nav>
    </div>
  );
}
