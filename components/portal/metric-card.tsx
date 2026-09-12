"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type MetricTone = "emerald" | "rose" | "amber" | "sky" | "teal" | "purple";

const TONES: Record<MetricTone, { bgCard: string; iconBg: string; badgeBg: string }> = {
  emerald: {
    bgCard: "bg-emerald-50/70 border-emerald-200/80 hover:border-emerald-300",
    iconBg: "bg-emerald-100 text-emerald-700",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  rose: {
    bgCard: "bg-rose-50/70 border-rose-200/80 hover:border-rose-300",
    iconBg: "bg-rose-100 text-rose-700",
    badgeBg: "bg-rose-100 text-rose-800 border-rose-300",
  },
  amber: {
    bgCard: "bg-amber-50/70 border-amber-200/80 hover:border-amber-300",
    iconBg: "bg-amber-100 text-amber-700",
    badgeBg: "bg-amber-100 text-amber-800 border-amber-300",
  },
  sky: {
    bgCard: "bg-sky-50/70 border-sky-200/80 hover:border-sky-300",
    iconBg: "bg-sky-100 text-sky-700",
    badgeBg: "bg-sky-100 text-sky-800 border-sky-300",
  },
  teal: {
    bgCard: "bg-teal-50/70 border-teal-200/80 hover:border-teal-300",
    iconBg: "bg-teal-100 text-teal-700",
    badgeBg: "bg-teal-100 text-teal-800 border-teal-300",
  },
  purple: {
    bgCard: "bg-purple-50/70 border-purple-200/80 hover:border-purple-300",
    iconBg: "bg-purple-100 text-purple-700",
    badgeBg: "bg-purple-100 text-purple-800 border-purple-300",
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
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-4 transition-all duration-200",
        t.bgCard,
      )}
    >
      <div className="relative z-10 mb-2 flex items-center justify-between gap-1">
        <span
          title={title}
          className="inline-flex items-center text-[10px] font-extrabold uppercase tracking-normal text-slate-700 sm:text-[11px]"
        >
          {title}
        </span>
        <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-xl", t.iconBg)}>
          {icon}
        </div>
      </div>

      <div className="my-1">
        <div className="text-xl font-black leading-tight tracking-tight text-slate-900 sm:text-2xl">
          {value}
        </div>
        <div className="mt-1 flex items-center gap-1.5">
          <span className={cn("rounded-full border px-1.5 py-0.5 text-[10px] font-bold", t.badgeBg)}>
            {growth}
          </span>
          <span className="truncate text-[10px] text-slate-500">{subtext}</span>
        </div>
      </div>
    </motion.div>
  );
}