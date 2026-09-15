"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock,
  Eye,
  Folder,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { PortalPageHeader } from "@/components/portal/kpi-card";
import { ProgressBar } from "@/components/ui/stat-card";
import { cn } from "@/lib/utils";
import { COMPANY_ANALYTICS, COMPANY_ISSUES, COMPANY_PIE_COLORS } from "@/lib/data/company-mock";

const RANGES = ["7D", "30D", "90D", "12M"] as const;
type AnalyticsRange = (typeof RANGES)[number];

const ANALYTICS_BY_RANGE: Record<
  AnalyticsRange,
  {
    kpis: Array<{ label: string; value: string; delta: string; icon: typeof Folder; tone: string }>;
    trend: Array<{ month: string; reported: number; resolved: number }>;
    resolutionTrend: Array<{ name: string; time: number }>;
    deliverables: Array<{ name: string; value: number }>;
  }
> = {
  "7D": {
    kpis: [
      { label: "Total reports", value: "142", delta: "+4.1%", icon: Folder, tone: "emerald" },
      { label: "Resolved", value: "131", delta: "+6.8%", icon: CheckCircle2, tone: "teal" },
      { label: "Avg. response", value: "2.1d", delta: "-0.4d", icon: Clock, tone: "indigo" },
      { label: "Citizen reach", value: "3.4k", delta: "+2.5%", icon: TrendingUp, tone: "amber" },
    ],
    trend: [
      { month: "Mon", reported: 18, resolved: 15 },
      { month: "Tue", reported: 22, resolved: 20 },
      { month: "Wed", reported: 25, resolved: 23 },
      { month: "Thu", reported: 19, resolved: 18 },
      { month: "Fri", reported: 26, resolved: 24 },
      { month: "Sat", reported: 17, resolved: 16 },
      { month: "Sun", reported: 15, resolved: 15 },
    ],
    resolutionTrend: [
      { name: "Day 1", time: 1.8 },
      { name: "Day 2", time: 2.1 },
      { name: "Day 3", time: 2.0 },
      { name: "Day 4", time: 2.3 },
      { name: "Day 5", time: 1.9 },
      { name: "Day 6", time: 2.2 },
    ],
    deliverables: [
      { name: "On-time closure", value: 88 },
      { name: "Citizen satisfaction", value: 95 },
      { name: "Verified resolutions", value: 92 },
      { name: "Duplicate containment", value: 78 },
    ],
  },
  "30D": {
    kpis: [
      { label: "Total reports", value: "498", delta: "+12.4%", icon: Folder, tone: "emerald" },
      { label: "Resolved", value: "472", delta: "+9.1%", icon: CheckCircle2, tone: "teal" },
      { label: "Avg. response", value: "3.2d", delta: "-0.6d", icon: Clock, tone: "indigo" },
      { label: "Citizen reach", value: "18.2k", delta: "+6.8%", icon: TrendingUp, tone: "amber" },
    ],
    trend: [
      { month: "Wk 1", reported: 98, resolved: 92 },
      { month: "Wk 2", reported: 115, resolved: 108 },
      { month: "Wk 3", reported: 135, resolved: 129 },
      { month: "Wk 4", reported: 150, resolved: 143 },
    ],
    resolutionTrend: COMPANY_ANALYTICS.resolutionTrend,
    deliverables: [
      { name: "On-time closure", value: 74 },
      { name: "Citizen satisfaction", value: 91 },
      { name: "Verified resolutions", value: 86 },
      { name: "Duplicate containment", value: 63 },
    ],
  },
  "90D": {
    kpis: [
      { label: "Total reports", value: "1,438", delta: "+15.2%", icon: Folder, tone: "emerald" },
      { label: "Resolved", value: "1,342", delta: "+14.0%", icon: CheckCircle2, tone: "teal" },
      { label: "Avg. response", value: "3.8d", delta: "-0.8d", icon: Clock, tone: "indigo" },
      { label: "Citizen reach", value: "45.1k", delta: "+11.4%", icon: TrendingUp, tone: "amber" },
    ],
    trend: [
      { month: "Jul", reported: 428, resolved: 411 },
      { month: "Aug", reported: 512, resolved: 459 },
      { month: "Sep", reported: 498, resolved: 472 },
    ],
    resolutionTrend: [
      { name: "Jul W1", time: 5.2 },
      { name: "Jul W3", time: 4.8 },
      { name: "Aug W1", time: 4.2 },
      { name: "Aug W3", time: 3.9 },
      { name: "Sep W1", time: 3.5 },
      { name: "Sep W3", time: 3.1 },
    ],
    deliverables: [
      { name: "On-time closure", value: 79 },
      { name: "Citizen satisfaction", value: 89 },
      { name: "Verified resolutions", value: 88 },
      { name: "Duplicate containment", value: 69 },
    ],
  },
  "12M": {
    kpis: [
      { label: "Total reports", value: "5,420", delta: "+22.5%", icon: Folder, tone: "emerald" },
      { label: "Resolved", value: "4,890", delta: "+19.8%", icon: CheckCircle2, tone: "teal" },
      { label: "Avg. response", value: "4.5d", delta: "-1.4d", icon: Clock, tone: "indigo" },
      { label: "Citizen reach", value: "130k", delta: "+24.2%", icon: TrendingUp, tone: "amber" },
    ],
    trend: COMPANY_ANALYTICS.monthlyTrend.map((m) => ({
      month: m.month,
      reported: m.reported,
      resolved: m.resolved,
    })),
    resolutionTrend: [
      { name: "Q1", time: 5.8 },
      { name: "Q2", time: 4.9 },
      { name: "Q3", time: 4.1 },
      { name: "Q4", time: 3.2 },
    ],
    deliverables: [
      { name: "On-time closure", value: 82 },
      { name: "Citizen satisfaction", value: 93 },
      { name: "Verified resolutions", value: 90 },
      { name: "Duplicate containment", value: 72 },
    ],
  },
};

export function CompanyAnalyticsPage() {
  const [range, setRange] = useState<AnalyticsRange>("30D");
  const activeDataset = ANALYTICS_BY_RANGE[range];

  return (
    <div className="mx-auto w-full max-w-5xl min-w-0 space-y-5 pb-6">
      <PortalPageHeader
        icon={<BarChart3 size={20} />}
        iconBg="bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-md shadow-emerald-500/20"
        title="Analytics"
        subtitle="City operations &amp; impact metrics"
        action={
          <div className="flex items-center gap-1.5 rounded-xl bg-white/80 p-1 shadow-sm ring-1 ring-slate-900/5 backdrop-blur">
            {RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={cn(
                  "rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-bold transition",
                  range === r ? "bg-slate-900 text-white shadow-xs" : "text-slate-700 hover:text-slate-900",
                )}
              >
                {r}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid w-full min-w-0 grid-cols-2 gap-3 lg:grid-cols-4">
        {activeDataset.kpis.map((k) => (
          <div key={k.label} className="glass min-w-0 rounded-2xl p-4 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
            <div className="flex items-center justify-between gap-1">
              <k.icon size={18} className="text-slate-700 shrink-0" />
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 shrink-0">
                {k.delta}
              </span>
            </div>
            <div className="mt-1 truncate text-xl font-extrabold text-slate-900">{k.value}</div>
            <div className="truncate text-[11px] font-medium text-slate-700">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="grid w-full min-w-0 grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="glass w-full min-w-0 rounded-3xl p-4 sm:p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
          <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
            <TrendingUp size={15} className="text-primary-600 shrink-0" /> Reported vs resolved ({range})
          </p>
          <div className="mt-4 h-52 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeDataset.trend} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="gRep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gRes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0d9488" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#0d9488" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
                <Area type="monotone" dataKey="reported" name="Reported" stroke="#10b981" strokeWidth={2.5} fill="url(#gRep)" />
                <Area type="monotone" dataKey="resolved" name="Resolved" stroke="#0d9488" strokeWidth={2.5} fill="url(#gRes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass w-full min-w-0 rounded-3xl p-4 sm:p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
          <p className="text-sm font-bold text-slate-900">Category mix</p>
          <div className="mt-2 grid grid-cols-1 items-center gap-2 sm:grid-cols-2">
            <div className="h-40 w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={COMPANY_ANALYTICS.categoryBreakdown}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={42}
                    outerRadius={62}
                    paddingAngle={3}
                  >
                    {COMPANY_ANALYTICS.categoryBreakdown.map((_, i) => (
                      <Cell key={i} fill={COMPANY_PIE_COLORS[i % COMPANY_PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 min-w-0">
              {COMPANY_ANALYTICS.categoryBreakdown.map((c, i) => (
                <div key={c.name} className="flex min-w-0 items-center gap-1.5 text-xs font-semibold text-slate-700">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: COMPANY_PIE_COLORS[i % COMPANY_PIE_COLORS.length] }} />
                  <span className="truncate">{c.name}</span>
                  <span className="ml-auto text-slate-700 shrink-0">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="glass w-full min-w-0 rounded-3xl p-4 sm:p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
        <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
          <Clock size={15} className="text-indigo-500 shrink-0" /> Resolution speed ({range})
        </p>
        <div className="mt-4 h-44 w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activeDataset.resolutionTrend} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Bar dataKey="time" name="Avg days" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid w-full min-w-0 grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="glass w-full min-w-0 rounded-3xl p-4 sm:p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
          <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
            <CheckCircle2 size={15} className="text-emerald-500 shrink-0" /> Deliverables hit-rate ({range})
          </p>
          <div className="mt-4 space-y-3 min-w-0">
            {activeDataset.deliverables.map((m) => (
              <div key={m.name} className="min-w-0">
                <div className="flex min-w-0 justify-between text-xs font-semibold text-slate-700">
                  <span className="truncate">{m.name}</span>
                  <span className="shrink-0">{m.value}%</span>
                </div>
                <ProgressBar value={m.value} className="mt-1 bg-slate-100" />
              </div>
            ))}
          </div>
        </div>

        <div className="glass flex flex-col rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
              <Eye size={15} className="text-sky-500" /> Recent issues in focus
            </p>
            <LinkButton href="/funder/issues" label="View all" />
          </div>
          <div className="mt-3 grid gap-2">
            {COMPANY_ISSUES.filter((i) => !["resolved", "duplicate"].includes(i.status)).slice(0, 4).map((i) => (
              <LinkRow key={i.id} id={i.id} title={i.title} area={i.area} status={i.status} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkButton({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-0.5 text-xs font-bold text-primary-600 hover:underline">
      {label} <ArrowUpRight size={13} />
    </Link>
  );
}

function LinkRow({ id, title, area, status }: { id: string; title: string; area: string; status: string }) {
  return (
    <Link
      href={`/funder/issues/${id}`}
      className="group flex items-center gap-2.5 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-900/5 transition hover:bg-white hover:shadow-md"
    >
      <span
        className={cn(
          "h-2 w-2 shrink-0 rounded-full",
          status === "in_progress" ? "bg-indigo-500" : status === "pending" ? "bg-amber-400" : "bg-rose-400",
        )}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-800">{title}</p>
        <p className="text-xs text-slate-700">{id} · {area}</p>
      </div>
      <ArrowUpRight size={14} className="text-slate-700 transition group-hover:text-primary-500" />
    </Link>
  );
}
