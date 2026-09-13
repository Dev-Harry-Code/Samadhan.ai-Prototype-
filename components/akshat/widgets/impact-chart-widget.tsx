"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAkshat } from "@/components/akshat/akshat-context";

interface CommunityImpactChartProps {
  className?: string;
}

export const CommunityImpactChart = ({ className = "" }: CommunityImpactChartProps) => {
  const { t } = useAkshat();
  const [activeRange, setActiveRange] = useState<"month" | "quarter" | "year">("month");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(4);

  const data = [
    { month: "Apr", submitted: 45, resolved: 32 },
    { month: "May", submitted: 65, resolved: 50 },
    { month: "Jun", submitted: 88, resolved: 72 },
    { month: "Jul", submitted: 110, resolved: 94 },
    { month: "Aug", submitted: 145, resolved: 128 },
    { month: "Sep", submitted: 190, resolved: 175 },
    { month: "Oct", submitted: 220, resolved: 205 },
  ];

  const maxVal = 240;

  return (
    <div className={cn("relative box-border flex h-full min-h-[390px] flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5", className)}>
      <div className="relative z-10 mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 flex-shrink-0 text-teal-600" />
            <h3 className="whitespace-normal text-base font-black tracking-tight text-slate-900 sm:text-lg">
              {t("impactAnalytics", "Community Impact Analytics")}
            </h3>
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-600"></span>
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-700">
            {t("chartSubtitle", "Civic challenges submitted vs. verified solutions")}
          </p>
        </div>

        <div className="flex flex-shrink-0 items-center self-start rounded-xl border border-slate-200 bg-slate-100 p-1 text-xs font-semibold sm:self-auto">
          <button
            onClick={() => setActiveRange("month")}
            className={cn(
              "flex-1 rounded-lg px-3 py-1.5 text-center transition-all",
              activeRange === "month"
                ? "bg-teal-600 font-bold text-white shadow-xs"
                : "text-slate-700 hover:text-slate-900",
            )}
          >
            {t("thisMonth", "This Month")}
          </button>
          <button
            onClick={() => setActiveRange("quarter")}
            className={cn(
              "flex-1 rounded-lg px-3 py-1.5 text-center transition-all",
              activeRange === "quarter"
                ? "bg-teal-600 font-bold text-white shadow-xs"
                : "text-slate-700 hover:text-slate-900",
            )}
          >
            {t("quarter", "Quarter")}
          </button>
          <button
            onClick={() => setActiveRange("year")}
            className={cn(
              "flex-1 rounded-lg px-3 py-1.5 text-center transition-all",
              activeRange === "year"
                ? "bg-teal-600 font-bold text-white shadow-xs"
                : "text-slate-700 hover:text-slate-900",
            )}
          >
            {t("year", "Year")}
          </button>
        </div>
      </div>

      <div className="relative z-10 mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-teal-600"></span>
            <span className="font-medium text-slate-700">
              {t("resolved", "Resolved")} ({hoveredIndex !== null ? data[hoveredIndex].resolved : 175})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300"></span>
            <span className="font-medium text-slate-700">
              {t("submitted", "Submitted")} ({hoveredIndex !== null ? data[hoveredIndex].submitted : 190})
            </span>
          </div>
        </div>
        <div className="rounded-md border border-teal-200 bg-teal-50 px-2 py-0.5 font-mono text-xs font-bold text-teal-700">
          {t("resolutionRate", "Resolution Rate: 92.1%")}
        </div>
      </div>

      <div className="relative z-10 flex h-44 w-full items-end justify-between gap-1 pt-3 sm:gap-3 sm:px-3 overflow-x-auto overflow-y-hidden pb-1 scrollbar-hide">
        {data.map((item, idx) => {
          const resolvedHeight = Math.min(100, Math.max(12, (item.resolved / maxVal) * 100));
          const submittedHeight = Math.min(100, Math.max(12, (item.submitted / maxVal) * 100));
          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              className="group flex h-full min-w-[36px] max-w-[42px] flex-1 cursor-pointer flex-col items-center justify-end"
            >
              <div className="flex h-6 items-center justify-center">
                {isHovered ? (
                  <span className="rounded-md bg-slate-900 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-md sm:text-[10px]">
                    {item.resolved} {t("fixedLabel", "fixed")}
                  </span>
                ) : null}
              </div>

              <div className="relative flex h-28 w-full items-end justify-center gap-1.5">
                <div
                  style={{ height: `${submittedHeight}%` }}
                  className="w-2 rounded-t-md bg-slate-200 transition-all duration-300 group-hover:bg-slate-300 sm:w-3"
                ></div>
                <div
                  style={{ height: `${resolvedHeight}%` }}
                  className={cn(
                    "relative w-2 rounded-t-md transition-all duration-300 sm:w-3",
                    isHovered ? "bg-teal-700 shadow-sm" : "bg-teal-600",
                  )}
                ></div>
              </div>

              <span
                className={cn(
                  "mt-2 text-[10px] font-bold transition-colors sm:text-[11px]",
                  isHovered ? "font-black text-slate-900" : "text-slate-700",
                )}
              >
                {t(`m_${item.month.toLowerCase()}`, item.month)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
