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

const RANGES = ["7D", "30D", "90D", "12M"];

export function CompanyAnalyticsPage() {
  const [range, setRange] = useState("30D");

  return (
    <div className="mx-auto max-w-5xl space-y-5 pb-6">
      <PortalPageHeader
        icon={<BarChart3 size={20} />}
        iconBg="bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-md shadow-emerald-500/20"
        title="Analytics"
        subtitle="City operations &amp; impact metrics"
        action={
          <div className="flex items-center gap-2 rounded-xl bg-white/80 p-1 shadow-sm ring-1 ring-slate-900/5 backdrop-blur">
            {RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-bold transition",
                  range === r ? "bg-slate-900 text-white" : "text-slate-700 hover:text-slate-900",
                )}
              >
                {r}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Total reports", value: "2,341", delta: "+12.4%", icon: Folder, tone: "emerald" },
          { label: "Resolved", value: "2,112", delta: "+9.1%", icon: CheckCircle2, tone: "teal" },
          { label: "Avg. response", value: "4.2d", delta: "-0.6d", icon: Clock, tone: "indigo" },
          { label: "Citizen reach", value: "18.2k", delta: "+6.8%", icon: TrendingUp, tone: "amber" },
        ].map((k) => (
          <div key={k.label} className="glass rounded-2xl p-4 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
            <div className="flex items-center justify-between">
              <k.icon size={18} className="text-slate-700" />
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                {k.delta}
              </span>
            </div>
            <div className="mt-1 text-xl font-extrabold text-slate-900">{k.value}</div>
            <div className="text-[11px] font-medium text-slate-700">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
          <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
            <TrendingUp size={15} className="text-primary-600" /> Reported vs resolved
          </p>
          <div className="mt-4 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={COMPANY_ANALYTICS.monthlyTrend} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
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

        <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
          <p className="text-sm font-bold text-slate-900">Category mix</p>
          <div className="mt-2 grid grid-cols-1 items-center gap-2 sm:grid-cols-2">
            <div className="h-40">
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
            <div className="space-y-1.5">
              {COMPANY_ANALYTICS.categoryBreakdown.map((c, i) => (
                <div key={c.name} className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: COMPANY_PIE_COLORS[i % COMPANY_PIE_COLORS.length] }} />
                  {c.name}
                  <span className="ml-auto text-slate-700">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
        <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
          <Clock size={15} className="text-indigo-500" /> Resolution speed
        </p>
        <div className="mt-4 h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={COMPANY_ANALYTICS.resolutionTrend} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Bar dataKey="time" name="Avg days" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
          <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
            <CheckCircle2 size={15} className="text-emerald-500" /> Deliverables hit-rate
          </p>
          <div className="mt-4 space-y-3">
            {[
              { name: "On-time closure", value: 74 },
              { name: "Citizen satisfaction", value: 91 },
              { name: "Verified resolutions", value: 86 },
              { name: "Duplicate containment", value: 63 },
            ].map((m) => (
              <div key={m.name}>
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{m.name}</span>
                  <span>{m.value}%</span>
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
