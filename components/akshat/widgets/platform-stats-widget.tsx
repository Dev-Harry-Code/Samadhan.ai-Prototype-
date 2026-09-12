"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  IndianRupee,
  Loader2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useAkshat } from "@/components/akshat/akshat-context";

interface PlatformStatsWidgetProps {
  compact?: boolean;
  columns?: 2 | 3 | 4 | 6;
  className?: string;
}

export function PlatformStatsWidget({
  compact = false,
  columns,
  className = "",
}: PlatformStatsWidgetProps) {
  const { t } = useAkshat();

  const stats = [
    {
      id: "total",
      title: t("metricTotalIssues", "Total Issues"),
      value: "48",
      growth: "+12%",
      subtext: t("metricVsLast7Days", "vs last 7 days"),
      icon: <FileText className="h-4 w-4 text-emerald-600" />,
      bgCard: "bg-emerald-50/70 border-emerald-200/80 hover:border-emerald-300",
      iconBg: "bg-emerald-100 text-emerald-700",
      badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
      accentColor: "text-emerald-700",
    },
    {
      id: "high_priority",
      title: t("metricHighPriority", "High Priority Issues"),
      value: "7",
      growth: "+2%",
      subtext: t("metricNeedAttention", "needs attention"),
      icon: <AlertTriangle className="h-4 w-4 text-rose-600" />,
      bgCard: "bg-rose-50/70 border-rose-200/80 hover:border-rose-300",
      iconBg: "bg-rose-100 text-rose-700",
      badgeBg: "bg-rose-100 text-rose-800 border-rose-300",
      accentColor: "text-rose-700",
    },
    {
      id: "pending",
      title: t("metricPending", "Pending Issues"),
      value: "18",
      growth: "+5%",
      subtext: t("metricNeedAssignment", "need assignment"),
      icon: <Clock className="h-4 w-4 text-amber-600" />,
      bgCard: "bg-amber-50/70 border-amber-200/80 hover:border-amber-300",
      iconBg: "bg-amber-100 text-amber-700",
      badgeBg: "bg-amber-100 text-amber-800 border-amber-300",
      accentColor: "text-amber-700",
    },
    {
      id: "in_progress",
      title: t("metricInProgress", "In Progress Issues"),
      value: "14",
      growth: "+8%",
      subtext: t("metricOnGoing", "ongoing work"),
      icon: <Loader2 className="h-4 w-4 animate-spin text-sky-600" />,
      bgCard: "bg-sky-50/70 border-sky-200/80 hover:border-sky-300",
      iconBg: "bg-sky-100 text-sky-700",
      badgeBg: "bg-sky-100 text-sky-800 border-sky-300",
      accentColor: "text-sky-700",
    },
    {
      id: "resolved",
      title: t("metricResolved", "Resolved Issues"),
      value: "16",
      growth: "+20%",
      subtext: t("metricThisWeek", "this week"),
      icon: <CheckCircle2 className="h-4 w-4 text-teal-600" />,
      bgCard: "bg-teal-50/70 border-teal-200/80 hover:border-teal-300",
      iconBg: "bg-teal-100 text-teal-700",
      badgeBg: "bg-teal-100 text-teal-800 border-teal-300",
      accentColor: "text-teal-700",
    },
    {
      id: "impact",
      title: t("metricRevenueImpact", "Community Impact"),
      value: "₹24,500",
      growth: "+18%",
      subtext: t("metricThisMonth", "this month"),
      icon: <IndianRupee className="h-4 w-4 text-purple-600" />,
      bgCard: "bg-purple-50/70 border-purple-200/80 hover:border-purple-300",
      iconBg: "bg-purple-100 text-purple-700",
      badgeBg: "bg-purple-100 text-purple-800 border-purple-300",
      accentColor: "text-purple-700",
    },
  ];

  const renderTitle = (title: string, compactMode: boolean) =>
    title.split(" ").map((word, idx, arr) => (
      <span key={idx as never}>
        <span>{word}</span>
        {idx < arr.length - 1 && (
          <span
            className={cn("inline-block select-none", compactMode ? "w-1.5 sm:w-2" : "w-1.5")}
            aria-hidden="true"
          >
            &nbsp;
          </span>
        )}
      </span>
    ));

  if (compact) {
    const gridCols =
      columns === 2
        ? "grid-cols-2 gap-2.5 sm:gap-3"
        : columns === 3
          ? "grid-cols-3 gap-2 sm:gap-2.5"
          : columns === 4
            ? "grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5"
            : columns === 6
              ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5"
              : "grid-cols-3 gap-2 sm:gap-2.5";

    return (
      <div className={cn("grid", gridCols, className)}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
            whileHover={{ scale: 1.02 }}
            className={cn(
              "flex flex-col justify-between rounded-2xl border p-2.5 backdrop-blur-sm transition-all sm:p-3",
              stat.bgCard,
            )}
          >
            <div className="mb-1.5 flex items-center justify-between gap-1">
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-xl sm:h-8 sm:w-8",
                  stat.iconBg,
                )}
              >
                {stat.icon}
              </div>
              <span
                className={cn(
                  "rounded-full border px-1.5 py-0.5 text-[9px] font-bold sm:text-[9.5px]",
                  stat.badgeBg,
                )}
              >
                {stat.growth}
              </span>
            </div>

            <div className="mb-1 text-base font-black leading-none text-slate-900 sm:text-lg">
              {stat.value}
            </div>

            <div
              title={stat.title}
              className="flex items-center whitespace-nowrap text-[9.5px] font-bold text-slate-700 sm:text-[10.5px]"
            >
              {renderTitle(stat.title, true)}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6",
        className,
      )}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.06 }}
          whileHover={{ scale: 1.03, boxShadow: "0 8px 24px -4px rgba(15, 23, 42, 0.08)" }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border p-4 transition-all duration-200",
            stat.bgCard,
          )}
        >
          <div className="relative z-10 mb-2 flex items-center justify-between gap-1">
            <span
              title={stat.title}
              className="inline-flex items-center text-[10px] font-extrabold uppercase tracking-normal text-slate-700 sm:text-[11px]"
            >
              {renderTitle(stat.title, false)}
            </span>
            <div
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-xl",
                stat.iconBg,
              )}
            >
              {stat.icon}
            </div>
          </div>

          <div className="my-1">
            <div className="text-xl font-black leading-tight tracking-tight text-slate-900 sm:text-2xl">
              {stat.value}
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <span
                className={cn(
                  "rounded-full border px-1.5 py-0.5 text-[10px] font-bold",
                  stat.badgeBg,
                )}
              >
                {stat.growth}
              </span>
              <span className="truncate text-[10px] text-slate-500">{stat.subtext}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}