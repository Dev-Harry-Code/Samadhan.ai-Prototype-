"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type MetricTone = "emerald" | "rose" | "amber" | "sky" | "teal" | "purple";

const TONES: Record<MetricTone, { bgCard: string; iconBg: string; badgeBg: string }> = {
  emerald: {
    bgCard: "bg-white border border-slate-200 shadow-sm",
    iconBg: "bg-emerald-100 text-emerald-800",
    badgeBg: "bg-emerald-100 text-emerald-900 font-bold border border-emerald-300",
  },
  rose: {
    bgCard: "bg-white border border-slate-200 shadow-sm",
    iconBg: "bg-rose-100 text-rose-800",
    badgeBg: "bg-rose-100 text-rose-900 font-bold border border-rose-300",
  },
  amber: {
    bgCard: "bg-white border border-slate-200 shadow-sm",
    iconBg: "bg-amber-100 text-amber-800",
    badgeBg: "bg-amber-100 text-amber-950 font-bold border border-amber-300",
  },
  sky: {
    bgCard: "bg-white border border-slate-200 shadow-sm",
    iconBg: "bg-blue-100 text-blue-800",
    badgeBg: "bg-blue-100 text-blue-900 font-bold border border-blue-300",
  },
  teal: {
    bgCard: "bg-white border border-slate-200 shadow-sm",
    iconBg: "bg-teal-100 text-teal-800",
    badgeBg: "bg-teal-100 text-teal-900 font-bold border border-teal-300",
  },
  purple: {
    bgCard: "bg-white border border-slate-200 shadow-sm",
    iconBg: "bg-purple-100 text-purple-800",
    badgeBg: "bg-purple-100 text-purple-900 font-bold border border-purple-300",
  },
};

export interface MetricCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  growth: string;
  subtext: string;
  tone?: MetricTone;
  delay?: number;
}

export function MetricCard({
  icon,
  title,
  value,
  growth,
  subtext,
  tone = "emerald",
  delay = 0,
}: MetricCardProps) {
  const t = TONES[tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ scale: 1.03, boxShadow: "0 8px 24px -4px rgba(15, 23, 42, 0.08)" }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative flex w-full min-w-0 flex-col justify-between overflow-hidden rounded-2xl border p-3 sm:p-4 transition-all duration-200",
        t.bgCard,
      )}
    >
      <div className="relative z-10 mb-2 flex w-full min-w-0 items-center justify-between gap-1.5 overflow-hidden">
        <span
          title={title}
          className="min-w-0 flex-1 truncate text-[11px] font-bold uppercase tracking-wider text-slate-700 sm:text-xs"
        >
          {title}
        </span>
        <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-xl", t.iconBg)}>
          {icon}
        </div>
      </div>

      <div className="my-1 min-w-0">
        <div className="truncate text-xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-2xl">
          {value}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-1.5 min-w-0">
          <span className={cn("shrink-0 rounded-full px-1.5 py-0.5 text-[10px]", t.badgeBg)}>
            {growth}
          </span>
          <span className="truncate text-xs font-medium text-slate-700">{subtext}</span>
        </div>
      </div>
    </motion.div>
  );
}