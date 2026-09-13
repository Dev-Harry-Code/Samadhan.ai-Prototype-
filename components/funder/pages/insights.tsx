"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Brain,
  CheckCircle2,
  Clock,
  CloudRain,
  Construction,
  Droplets,
  Lightbulb,
  RefreshCw,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import {
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { COMPANY_ANALYTICS, COMPANY_ISSUES, COMPANY_SENTIMENT_COLORS } from "@/lib/data/company-mock";

const INSIGHTS: Array<{ icon: LucideIcon; title: string; body: string; tone: string }> = [
  {
    icon: Construction,
    title: "MG Road is a repeat hotspot",
    body: "13 pothole reports in 8 weeks. 72% probability of resurgence within 21 days during monsoon.",
    tone: "emerald",
  },
  {
    icon: Droplets,
    title: "Pipeline leak cluster detected",
    body: "3 water-pipeline reports near Thane bus stand within 48 hours. Consider coordinated repair window.",
    tone: "teal",
  },
  {
    icon: BarChart3,
    title: "Resolution speed improving",
    body: "Avg. resolution fell from 6.2 → 3.2 days over 6 weeks. Keep current assignment strategy.",
    tone: "violet",
  },
  {
    icon: Bell,
    title: "Duplicate reports on rise",
    body: "Duplicate rate at 6.4%. Add merge-queue to cut backlog churn by an estimated 28%.",
    tone: "amber",
  },
];

export function CompanyInsightsPage() {
  const critical = COMPANY_ISSUES.filter((i) => (i.priority ?? i.severity) === "Critical").slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl space-y-5 pb-6">
      <PortalPageHeader
        icon={<Brain size={20} />}
        iconBg="bg-gradient-to-br from-violet-500 to-primary-600 text-white shadow-md shadow-violet-500/20"
        title="AI Insights"
        subtitle={`Predictive patterns from ${COMPANY_ISSUES.length} recent issues`}
        action={
          <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-600 ring-1 ring-violet-600/20">
            4 new insights
          </span>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Duplicate rate", value: `${COMPANY_ANALYTICS.duplicateRate}%`, delta: "-1.2% vs last month", icon: RefreshCw },
          { label: "Avg resolution", value: `${COMPANY_ANALYTICS.avgResolutionDays}d`, delta: "-0.6d faster", icon: Clock },
          { label: "Verification rate", value: "94%", delta: "+3%", icon: CheckCircle2 },
          { label: "Predicted load (wk)", value: "±12%", delta: "rain surge expected", icon: CloudRain },
        ].map((k) => (
          <div key={k.label} className="glass rounded-2xl p-4 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
            <k.icon size={20} className="text-slate-700" />
            <div className="mt-1 text-lg font-extrabold text-slate-900">{k.value}</div>
            <div className="text-[11px] font-medium text-slate-700">{k.label}</div>
            <div className="mt-0.5 text-[10px] font-bold text-emerald-600">{k.delta}</div>
          </div>
        ))}
      </div>

      <div className="glass rounded-3xl p-6 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
        <p className="text-sm font-bold text-slate-900">AI Recommendation of the day</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-700 font-medium">
          Pre-schedule <strong className="text-slate-900">preventive patching on West Lane</strong> before tomorrow&apos;s
          rain band. Historical data suggests this corridor produces 12–15 fresh pothole reports after each monsoon
          spell — proactive repair could cut that by <strong className="text-emerald-600">~40%</strong>.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/funder/assignments">
            <Button size="sm" className="bg-primary-600 text-white hover:bg-primary-700">
              Create preventive assignment
            </Button>
          </Link>
          <Link href="/funder/reports">
            <Button
              size="sm"
              variant="outline"
              className="bg-white text-slate-700"
            >
              View full forecast
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
          <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
            <TrendingUp size={15} className="text-primary-600" /> Resolution trend
          </p>
          <div className="mt-4 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COMPANY_ANALYTICS.resolutionTrend} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
                <Bar dataKey="time" name="Days" radius={[6, 6, 0, 0]} fill="#0d9488" barSize={26} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
          <p className="text-sm font-bold text-slate-900">Citizen sentiment mix</p>
          <div className="mt-2 flex h-40 items-center gap-4">
            <div className="h-full flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={COMPANY_ANALYTICS.sentimentPie}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={3}
                  >
                    {COMPANY_ANALYTICS.sentimentPie.map((_, i) => (
                      <Cell key={i} fill={COMPANY_SENTIMENT_COLORS[i % COMPANY_SENTIMENT_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {COMPANY_ANALYTICS.sentimentPie.map((s, i) => (
                <div key={s.name} className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: COMPANY_SENTIMENT_COLORS[i % COMPANY_SENTIMENT_COLORS.length] }}
                  />
                  {s.name} · {s.value}%
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
        <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
          <Lightbulb size={15} className="text-amber-500" /> Signals &amp; recommendations
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {INSIGHTS.map((item) => (
            <div key={item.title} className="group rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-900/5 transition hover:bg-white hover:shadow-md">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-700 ring-1 ring-slate-900/5">
                  <item.icon size={18} />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900">{item.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-700">{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-slate-900">Priority queue — critical now</p>
          <Link href="/funder/issues" className="text-xs font-bold text-primary-600 hover:underline">
            All issues →
          </Link>
        </div>
        <div className="mt-3 grid gap-2">
          {critical.map((i) => (
            <Link key={i.id} href={`/funder/issues/${i.id}`} className="group flex flex-wrap items-center gap-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-900/5 transition hover:bg-white hover:shadow-md">
              <span className={cn("h-2 w-2 shrink-0 rounded-full", "bg-red-500")} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">{i.title}</p>
                <p className="text-xs text-slate-700">{i.id} · {i.area}</p>
              </div>
              <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-[11px] font-bold text-red-600">
                {i.status === "open" ? "Unassigned" : i.assignee}
              </span>
              <ArrowRight size={15} className="text-slate-700 transition group-hover:text-red-500" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
