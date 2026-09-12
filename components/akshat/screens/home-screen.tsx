"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";

import type { Issue, ScreenId } from "@/lib/akshat-types";
import { cn } from "@/lib/utils";
import { useAkshat } from "@/components/akshat/akshat-context";
import { PlatformStatsWidget } from "@/components/akshat/widgets/platform-stats-widget";
import { ColorfulCategoryBentoWidget } from "@/components/akshat/widgets/category-bento-widget";
import { CommunityImpactChart } from "@/components/akshat/widgets/impact-chart-widget";
import { CategoryGaugeWidget } from "@/components/akshat/widgets/category-gauge-widget";
import { TopVolunteersWidget } from "@/components/akshat/widgets/top-volunteers-widget";
import { RecentIssuesFeedWidget } from "@/components/akshat/widgets/recent-issues-widget";

interface HomeScreenProps {
  setScreen: (screen: ScreenId) => void;
  setSelectedIssue: (issue: Issue) => void;
}

export const HomeScreen = ({ setScreen, setSelectedIssue }: HomeScreenProps) => {
  const { t } = useAkshat();
  const [activeTab, setActiveTab] = useState<"overview" | "issues" | "volunteers" | "funds">("overview");

  return (
    <div className="relative min-h-full overflow-hidden bg-transparent pb-36 pt-2">
      <div className="pointer-events-none absolute left-1/2 top-6 h-[250px] w-[500px] -translate-x-1/2 rounded-full bg-teal-500/10 blur-[100px]"></div>
      <div className="pointer-events-none absolute right-[-10%] top-96 h-[350px] w-[350px] rounded-full bg-orange-500/10 blur-[110px]"></div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-6 px-3 sm:px-6">
        <div className="mx-auto max-w-3xl pb-2 pt-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-800 shadow-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500"></span>
            <span className="font-medium">
              {t("heroTag", "AI-Powered Civic Problem Solving")}
            </span>
          </div>

          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {t("heroTitlePrefix", "Crowdsourcing Actionable Solutions for")}{" "}
            <span className="text-teal-600">{t("heroTitleAccent", "Societal Impact")}</span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-slate-600 sm:text-sm">
            {t("heroDesc", "Connecting proactive citizens, verified NGOs, and CSR entities with autonomous AI triage to detect, fund, and solve community issues with verifiable impact.")}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 10px 25px -4px rgba(13, 148, 136, 0.35)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setScreen("report")}
              className="btn-breathing flex items-center gap-2 rounded-2xl bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-teal-700 hover:shadow-lg"
            >
              <span>{t("reportWithAI", "Report Issue with AI")}</span>
              <Plus className="h-4 w-4 stroke-[2.5]" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 8px 20px -2px rgba(15, 23, 42, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setScreen("issues_feed")}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50"
            >
              <span>{t("exploreFeed", "Explore Public Feed")}</span>
              <ArrowUpRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm sm:gap-x-3 sm:p-2">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
            <span className="mr-1 hidden text-xs font-bold text-slate-900 md:inline">
              {t("hubTitle", "Samadhan Hub")}
            </span>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("overview")}
              className={cn(
                "flex-shrink-0 whitespace-nowrap rounded-xl px-3 py-1.5 text-[11px] font-semibold transition-all sm:px-3.5 sm:text-xs",
                activeTab === "overview"
                  ? "bg-teal-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              )}
            >
              {t("navOverview", "Overview")}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setScreen("issues_feed")}
              className="flex-shrink-0 whitespace-nowrap rounded-xl px-3 py-1.5 text-[11px] font-semibold text-slate-600 transition-all sm:px-3.5 sm:text-xs hover:bg-slate-100 hover:text-slate-900"
            >
              {t("navFeed", "Issues Feed")}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("volunteers")}
              className={cn(
                "flex-shrink-0 whitespace-nowrap rounded-xl px-3 py-1.5 text-[11px] font-semibold transition-all sm:px-3.5 sm:text-xs",
                activeTab === "volunteers"
                  ? "bg-teal-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              )}
            >
              {t("navLeaderboard", "Leaderboard")}
            </motion.button>
          </div>

          <div className="ml-auto flex flex-shrink-0 items-center gap-2 text-xs">
            <span className="flex items-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50 px-2 py-1 font-mono text-[10px] font-semibold text-teal-700 sm:text-[11px]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-600"></span>
              {t("liveSyncActive", "Live Sync Active")}
            </span>
          </div>
        </div>

        <PlatformStatsWidget />

        <ColorfulCategoryBentoWidget setScreen={setScreen} />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CommunityImpactChart />
          </div>
          <div className="lg:col-span-1">
            <CategoryGaugeWidget />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <TopVolunteersWidget />
          <RecentIssuesFeedWidget
            setScreen={setScreen}
            setSelectedIssue={setSelectedIssue}
          />
        </div>

        <div className="flex flex-wrap items-center justify-around gap-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-center">
            <div className="text-2xl font-black text-slate-900 sm:text-3xl">
              24+
            </div>
            <div className="mt-0.5 text-[11px] font-medium text-slate-500">{t("statMunicipalWards", "Municipal Wards")}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-slate-900 sm:text-3xl">
              130K+
            </div>
            <div className="mt-0.5 text-[11px] font-medium text-slate-500">{t("statActiveCitizens", "Active Citizens")}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-slate-900 sm:text-3xl">
              42K+
            </div>
            <div className="mt-0.5 text-[11px] font-medium text-slate-500">{t("statVerifiedSolved", "Verified Solved")}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-slate-900 sm:text-3xl">
              76+
            </div>
            <div className="mt-0.5 text-[11px] font-medium text-slate-500">{t("statNgoPartners", "NGOs & CSR Partners")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};