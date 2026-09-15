"use client";

import { PieChart } from "lucide-react";

import { useAkshat } from "@/components/akshat/akshat-context";

export const CategoryGaugeWidget = () => {
  const { t } = useAkshat();

  const categories = [
    { label: t("gaugeWater", "Water"), count: "524", pct: 42, color: "#0D9488" },
    { label: t("gaugeHealth", "Health"), count: "274", pct: 28, color: "#F97316" },
    { label: t("gaugeRoads", "Civic Roads"), count: "225", pct: 18, color: "#0284C7" },
    { label: t("gaugeEnergy", "Energy"), count: "148", pct: 12, color: "#10B981" },
  ];

  return (
    <div className="relative box-border flex h-full min-h-[380px] w-full min-w-0 flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2 min-w-0">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-slate-900 sm:text-base">
            {t("sectorBreakdown", "Sector Breakdown")}
          </h3>
          <p className="text-xs text-slate-700">
            {t("sectorBreakdownSub", "Distribution of challenges")}
          </p>
        </div>
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-teal-100 bg-teal-50 text-teal-700">
          <PieChart className="h-4 w-4" />
        </div>
      </div>

      <div className="my-auto flex w-full flex-col items-center justify-center py-2">
        <div className="relative flex h-28 w-48 items-center justify-center">
          <svg viewBox="0 0 100 55" className="h-full w-full overflow-visible">
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 10 50 A 40 40 0 0 1 45 12"
              fill="none"
              stroke="#0D9488"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 45 12 A 40 40 0 0 1 75 22"
              fill="none"
              stroke="#F97316"
              strokeWidth="10"
            />
            <path
              d="M 75 22 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="#0284C7"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute bottom-0 flex flex-col items-center text-center">
            <span className="text-2xl font-black leading-none tracking-tight text-slate-900 sm:text-3xl">
              1,247
            </span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-700">
              {t("totalReports", "Total Reports")}
            </span>
          </div>
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-2 border-t border-slate-100 pt-3">
        {categories.map((c, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-2"
          >
            <div className="flex min-w-0 items-center gap-1.5">
              <span
                className="h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: c.color }}
              ></span>
              <span className="truncate text-[11px] font-semibold text-slate-700">
                {c.label}
              </span>
            </div>
            <span className="flex-shrink-0 font-mono text-[11px] font-bold text-slate-900">
              {c.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
