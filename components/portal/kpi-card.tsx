"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const TONES: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-600",
  teal: "bg-teal-50 text-teal-600",
  indigo: "bg-indigo-50 text-indigo-600",
  amber: "bg-amber-50 text-amber-600",
  violet: "bg-violet-50 text-violet-600",
  sky: "bg-sky-50 text-sky-600",
  rose: "bg-rose-50 text-rose-600",
  slate: "bg-slate-100 text-slate-700",
};

export function PortalKpi({
  icon,
  tone = "emerald",
  label,
  value,
  sub,
}: {
  icon: ReactNode;
  tone?: keyof typeof TONES & string;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="glass rounded-2xl p-4 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
      <div className={cn("mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl", TONES[tone])}>
        {icon}
      </div>
      <div className="text-xl font-extrabold tracking-tight text-slate-900">{value}</div>
      <div className="text-[11px] font-medium text-slate-700">{label}</div>
      {sub && <div className="mt-0.5 text-[10px] font-bold text-emerald-600">{sub}</div>}
    </div>
  );
}

export function PortalPageHeader({
  icon,
  iconBg = "bg-gradient-to-br from-primary-600 to-teal-700 text-white",
  title,
  subtitle,
  action,
}: {
  icon: ReactNode;
  iconBg?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl shadow-md shadow-primary-600/20", iconBg)}>
        {icon}
      </div>
      <div className="min-w-0">
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-700">{subtitle}</p>}
      </div>
      {action && <div className="ml-auto">{action}</div>}
    </div>
  );
}
