"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  Banknote,
  Briefcase,
  Building2,
  CheckCircle2,
  Coins,
  Droplet,
  FileText,
  GraduationCap,
  HeartPulse,
  Leaf,
  Loader2,
  MapPin,
  PieChart,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";

import { CivicBackground } from "@/components/akshat/common/civic-background";
import { CompanySeverityBadge, CompanyStatusBadge } from "@/components/portal/badges";
import { HubNav } from "@/components/portal/hub-nav";
import { MetricCard } from "@/components/portal/metric-card";
import { PortalOverviewHeader } from "@/components/portal/overview-header";
import { ProgressBar } from "@/components/ui/stat-card";
import { cn } from "@/lib/utils";
import {
  COMPANY_ANALYTICS,
  COMPANY_ISSUES,
  COMPANY_PERFORMANCE,
  COMPANY_USER,
} from "@/lib/data/company-mock";

const IMPACT_OPPORTUNITIES = [
  {
    id: "water",
    name: "Water & Sanitation",
    count: 12,
    desc: "Water quality, toilets & drainage projects",
    icon: <Droplet className="h-5 w-5 text-sky-600" />,
    bgCard: "bg-sky-50/80 border-sky-200/90 hover:border-sky-300",
    iconBg: "bg-sky-100 text-sky-700",
    badgeColor: "text-sky-700 bg-sky-100/80 border-sky-200",
  },
  {
    id: "education",
    name: "Education",
    count: 8,
    desc: "Schools, scholarships & skill programs",
    icon: <GraduationCap className="h-5 w-5 text-indigo-600" />,
    bgCard: "bg-indigo-50/80 border-indigo-200/90 hover:border-indigo-300",
    iconBg: "bg-indigo-100 text-indigo-700",
    badgeColor: "text-indigo-700 bg-indigo-100/80 border-indigo-200",
  },
  {
    id: "health",
    name: "Healthcare",
    count: 6,
    desc: "Camps, clinics & public health drives",
    icon: <HeartPulse className="h-5 w-5 text-rose-600" />,
    bgCard: "bg-rose-50/80 border-rose-200/90 hover:border-rose-300",
    iconBg: "bg-rose-100 text-rose-700",
    badgeColor: "text-rose-700 bg-rose-100/80 border-rose-200",
  },
  {
    id: "environment",
    name: "Environment",
    count: 7,
    desc: "Greenery, clean energy & river cleanups",
    icon: <Leaf className="h-5 w-5 text-emerald-600" />,
    bgCard: "bg-emerald-50/80 border-emerald-200/90 hover:border-emerald-300",
    iconBg: "bg-emerald-100 text-emerald-700",
    badgeColor: "text-emerald-700 bg-emerald-100/80 border-emerald-200",
  },
  {
    id: "livelihood",
    name: "Livelihood",
    count: 4,
    desc: "Micro-enterprise & upskilling support",
    icon: <Briefcase className="h-5 w-5 text-amber-600" />,
    bgCard: "bg-amber-50/80 border-amber-200/90 hover:border-amber-300",
    iconBg: "bg-amber-100 text-amber-700",
    badgeColor: "text-amber-700 bg-amber-100/80 border-amber-200",
  },
  {
    id: "urban",
    name: "Urban Infrastructure",
    count: 9,
    desc: "Roads, lighting & public amenities",
    icon: <Building2 className="h-5 w-5 text-purple-600" />,
    bgCard: "bg-purple-50/80 border-purple-200/90 hover:border-purple-300",
    iconBg: "bg-purple-100 text-purple-700",
    badgeColor: "text-purple-700 bg-purple-100/80 border-purple-200",
  },
];

const GAUGE = [
  { label: "Roads", count: "512", pct: 34, color: "#0D9488" },
  { label: "Sanitation", count: "316", pct: 21, color: "#10B981" },
  { label: "Lighting", count: "241", pct: 16, color: "#F97316" },
  { label: "Water", count: "181", pct: 12, color: "#0284C7" },
];

export function CompanyOverviewPage() {
  const [activeRange, setActiveRange] = useState<"month" | "quarter" | "year">("month");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(6);

  const total = COMPANY_ISSUES.length;
  const inProgress = COMPANY_ISSUES.filter((i) => i.status === "in_progress").length;
  const resolved = COMPANY_ISSUES.filter((i) => i.status === "resolved").length;
  const trend = COMPANY_ANALYTICS.monthlyTrend;
  const maxVal = 600;
  const recent = COMPANY_ISSUES.slice(0, 4);

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden">
      <CivicBackground />
      <div className="relative z-10 w-full max-w-full overflow-x-hidden">
        <PortalOverviewHeader
          role="CSR / Organization"
          location="Jodhpur"
          storageKey="samadhan.company"
          user={{ name: COMPANY_USER.name, avatar: COMPANY_USER.avatar }}
          links={[
            { href: "/funder", label: "Overview" },
            { href: "/funder/issues", label: "Opportunities" },
            { href: "/funder/assignments", label: "Projects" },
            { href: "/funder/analytics", label: "Analytics" },
            { href: "/funder/reports", label: "Reports" },
          ]}
        />

        <div className="relative w-full max-w-full overflow-hidden">
          <div className="pointer-events-none absolute left-1/2 top-6 h-[250px] w-96 max-w-[90vw] sm:w-[500px] -translate-x-1/2 rounded-full bg-teal-500/10 blur-[100px]"></div>
          <div className="pointer-events-none absolute right-0 top-96 h-[350px] w-80 max-w-[90vw] sm:w-[350px] rounded-full bg-orange-500/10 blur-[110px]"></div>

          <main className="relative z-10 mx-auto w-full max-w-7xl min-w-0 space-y-6 px-3.5 pb-16 pt-6 sm:px-6">
            {/* HERO */}
            <div className="mx-auto max-w-3xl pb-2 pt-4 text-center">
              <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-800 shadow-xs">
                <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-orange-500"></span>
                <span className="truncate font-medium">AI-Powered Social Impact</span>
              </div>

              <h1 className="break-words text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Turn Corporate Action Into{" "}
                <span className="text-teal-600">Measurable Community Impact</span>
              </h1>

              <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-slate-700 sm:text-sm">
                Discover high-impact civic opportunities, support verified projects and track the
                difference your organization creates.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/funder/issues"
                  className="btn-breathing flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-teal-600 px-5 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-teal-700 hover:shadow-lg"
                >
                  <span>Explore Impact Opportunities</span>
                  <ArrowRight className="h-4 w-4 shrink-0 stroke-[2.5]" />
                </Link>
                <Link
                  href="/funder/assignments"
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50"
                >
                  <span>View Active Projects</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </div>
            </div>

            {/* HUB NAV */}
            <HubNav
              activeHref="/funder"
              items={[
                { href: "/funder", label: "Overview" },
                { href: "/funder/issues", label: "Opportunities" },
                { href: "/funder/assignments", label: "Projects" },
                { href: "/funder/analytics", label: "Analytics" },
                { href: "/funder/reports", label: "Impact" },
              ]}
            />

            {/* METRICS */}
            <div className="grid w-full min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
              <MetricCard
                icon={<FileText className="h-4 w-4 text-amber-600" />}
                title="Impact Opportunities"
                value={total}
                growth="+18"
                subtext="today"
                tone="amber"
                delay={0}
              />
              <MetricCard
                icon={<Loader2 className="h-4 w-4 animate-spin text-sky-600" />}
                title="Active Projects"
                value={inProgress}
                growth="+4"
                subtext="ongoing work"
                tone="sky"
                delay={0.06}
              />
              <MetricCard
                icon={<Users className="h-4 w-4 text-purple-600" />}
                title="Communities Supported"
                value="12"
                growth="+1"
                subtext="new ward"
                tone="purple"
                delay={0.12}
              />
              <MetricCard
                icon={<Coins className="h-4 w-4 text-rose-600" />}
                title="Funds Deployed"
                value="₹2.4L"
                growth="+18%"
                subtext="this quarter"
                tone="rose"
                delay={0.18}
              />
              <MetricCard
                icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                title="Projects Completed"
                value={resolved}
                growth="+20%"
                subtext="this week"
                tone="emerald"
                delay={0.24}
              />
              <MetricCard
                icon={<Banknote className="h-4 w-4 text-teal-600" />}
                title="Impact Generated"
                value="₹48,500"
                growth="+18%"
                subtext="social value"
                tone="teal"
                delay={0.3}
              />
            </div>

            {/* IMPACT OPPORTUNITIES */}
            {/* IMPACT OPPORTUNITIES */}
            <div className="w-full min-w-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-2 min-w-0">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-black text-slate-900 sm:text-lg">
                    Impact Opportunities
                  </h3>
                  <p className="truncate text-xs text-slate-700 sm:whitespace-normal">
                    Discover civic challenges where your organization can create measurable impact
                  </p>
                </div>
                <Link
                  href="/funder/issues"
                  className="flex flex-shrink-0 items-center gap-1 rounded-xl border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700 transition hover:text-teal-800"
                >
                  <span>View All</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid w-full min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {IMPACT_OPPORTUNITIES.map((cat, index) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.03, boxShadow: "0 8px 20px -4px rgba(15, 23, 42, 0.08)" }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex min-h-[130px] w-full min-w-0 cursor-pointer flex-col justify-between rounded-2xl border p-3 shadow-2xs transition-all sm:p-3.5 ${cat.bgCard}`}
                  >
                    <div className="mb-2 flex min-w-0 items-center justify-between gap-1.5">
                      <div
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl shadow-2xs sm:h-9 sm:w-9 ${cat.iconBg}`}
                      >
                        {cat.icon}
                      </div>
                      <span
                        className={`shrink-0 truncate rounded-md border px-1.5 py-0.5 font-mono text-[9px] font-bold sm:px-2 sm:text-[11px] ${cat.badgeColor}`}
                      >
                        {cat.count} Projects
                      </span>
                    </div>

                    <div className="mt-auto min-w-0">
                      <div className="truncate text-xs font-black leading-snug text-slate-900 sm:text-[13px]">
                        {cat.name}
                      </div>
                      <p className="mt-1 line-clamp-2 text-[10px] font-medium leading-snug text-slate-700">
                        {cat.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ANALYTICS + SECTOR */}
            <div className="grid w-full min-w-0 grid-cols-1 gap-5 lg:grid-cols-3">
              <div className="w-full min-w-0 lg:col-span-2">
                <div className="relative box-border flex h-full min-h-[390px] w-full min-w-0 flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <div className="relative z-10 mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 flex-shrink-0 text-teal-600" />
                        <h3 className="whitespace-normal text-base font-black tracking-tight text-slate-900 sm:text-lg">
                          Community Impact Analytics
                        </h3>
                        <span className="relative flex h-2 w-2 flex-shrink-0">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-500 opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-600"></span>
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-700">
                        Civic challenges supported vs. verified impact delivered
                      </p>
                    </div>

                    <div className="flex flex-shrink-0 items-center self-stretch sm:self-auto rounded-xl border border-slate-200 bg-slate-100 p-1 text-xs font-semibold">
                      {(["month", "quarter", "year"] as const).map((r) => (
                        <button
                          key={r}
                          onClick={() => setActiveRange(r)}
                          className={cn(
                            "flex-1 rounded-lg px-3 py-1.5 text-center transition-all",
                            activeRange === r
                              ? "bg-teal-600 font-bold text-white shadow-xs"
                              : "text-slate-700 hover:text-slate-900",
                          )}
                        >
                          {r === "month" ? "This Month" : r === "quarter" ? "Quarter" : "Year"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-teal-600"></span>
                        <span className="font-medium text-slate-700">
                          Resolved ({hoveredIndex !== null ? trend[hoveredIndex].resolved : 472})
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-300"></span>
                        <span className="font-medium text-slate-700">
                          Reported ({hoveredIndex !== null ? trend[hoveredIndex].reported : 498})
                        </span>
                      </div>
                    </div>
                    <div className="rounded-md border border-teal-200 bg-teal-50 px-2 py-0.5 font-mono text-xs font-bold text-teal-700">
                      Resolution Rate: 92.4%
                    </div>
                  </div>

                  <div className="relative z-10 flex h-44 w-full min-w-0 items-end justify-between gap-1 pt-3 sm:gap-3 sm:px-3 overflow-x-auto overflow-y-hidden pb-1 scrollbar-hide">
                    {trend.map((item, idx) => {
                      const reported = Math.min(100, Math.max(12, (item.reported / maxVal) * 100));
                      const solved = Math.min(100, Math.max(12, (item.resolved / maxVal) * 100));
                      const isHovered = hoveredIndex === idx;

                      return (
                        <div
                          key={idx}
                          onMouseEnter={() => setHoveredIndex(idx)}
                          className="group flex h-full min-w-[32px] sm:min-w-[36px] max-w-[42px] flex-1 cursor-pointer flex-col items-center justify-end"
                        >
                          <div className="flex h-6 items-center justify-center">
                            {isHovered ? (
                              <span className="rounded-md bg-slate-900 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-md sm:text-[10px]">
                                {item.resolved} fixed
                              </span>
                            ) : null}
                          </div>

                          <div className="relative flex h-28 w-full items-end justify-center gap-1.5">
                            <div
                              style={{ height: `${reported}%` }}
                              className="w-2 rounded-t-md bg-slate-200 transition-all duration-300 group-hover:bg-slate-300 sm:w-3"
                            ></div>
                            <div
                              style={{ height: `${solved}%` }}
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
                            {item.month}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="w-full min-w-0 lg:col-span-1">
                <div className="relative box-border flex h-full min-h-[380px] w-full min-w-0 flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-bold text-slate-900 sm:text-base">
                        Impact by Sector
                      </h3>
                      <p className="truncate text-xs text-slate-700">Distribution of supported challenges</p>
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
                          stroke="#10B981"
                          strokeWidth="10"
                        />
                        <path
                          d="M 75 22 A 40 40 0 0 1 90 50"
                          fill="none"
                          stroke="#0284C7"
                          strokeWidth="10"
                        />
                      </svg>

                      <div className="absolute bottom-0 flex flex-col items-center text-center">
                        <span className="text-2xl font-black leading-none tracking-tight text-slate-900 sm:text-3xl">
                          1,578
                        </span>
                        <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                          Reports
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid w-full min-w-0 grid-cols-2 gap-2 border-t border-slate-100 pt-3">
                    {GAUGE.map((c, i) => (
                      <div
                        key={i}
                        className="flex min-w-0 items-center justify-between gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-2"
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
              </div>
            </div>

            {/* ONGOING PROJECTS + IMPACT PROGRESS */}
            <div className="grid w-full min-w-0 grid-cols-1 gap-5 lg:grid-cols-3">
              <div className="w-full min-w-0 lg:col-span-2">
                <div className="w-full min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
                  <div className="mb-4 flex items-center justify-between gap-2 min-w-0">
                    <h3 className="flex items-center gap-1.5 truncate text-sm font-bold text-slate-900">
                      <MapPin size={15} className="shrink-0 text-sky-500" /> Ongoing Projects
                    </h3>
                    <Link
                      href="/funder/issues"
                      className="shrink-0 text-xs font-bold text-primary-600 hover:underline"
                    >
                      All projects →
                    </Link>
                  </div>

                  <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
                    {recent.map((i) => (
                      <Link key={i.id} href={`/funder/issues/${i.id}`} className="group block h-full w-full min-w-0">
                        <div className="flex h-full w-full min-w-0 items-start gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 p-3.5 transition hover:-translate-y-0.5 hover:shadow-md">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                            {i.beforeImage ? <i.beforeImage size={22} /> : <MapPin size={22} />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex min-w-0 items-start justify-between gap-2">
                              <p className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-900">
                                {i.title}
                              </p>
                              <div className="shrink-0">
                                <CompanySeverityBadge severity={i.priority ?? i.severity} />
                              </div>
                            </div>
                            <p className="mt-0.5 flex min-w-0 items-center gap-1 truncate text-xs text-slate-700">
                              <MapPin size={12} className="shrink-0" />
                              <span className="truncate">{i.area}</span>
                            </p>
                            <div className="mt-2 flex min-w-0 flex-wrap items-center justify-between gap-1.5">
                              <CompanyStatusBadge status={i.status} />
                              <span className="shrink-0 text-xs text-slate-700">{i.reportedAt}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex w-full min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-1">
                <div className="flex items-center gap-2">
                  <Trophy size={15} className="shrink-0 text-amber-500" />
                  <h3 className="text-sm font-bold text-slate-900">Impact Progress</h3>
                </div>
                <div className="relative mt-4 flex h-28 w-28 items-center justify-center self-center">
                  <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#eef2f7" strokeWidth="10" />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${(COMPANY_PERFORMANCE.score / 100) * 264} 264`}
                    />
                  </svg>
                  <div className="absolute">
                    <div className="text-3xl font-extrabold text-slate-900">
                      {COMPANY_PERFORMANCE.score}
                    </div>
                    <div className="text-[11px] font-bold text-primary-600">
                      {COMPANY_PERFORMANCE.label}
                    </div>
                  </div>
                </div>
                <div className="mt-4 w-full min-w-0 space-y-2.5">
                  {COMPANY_PERFORMANCE.metrics.map((m) => (
                    <div key={m.name} className="min-w-0">
                      <div className="flex min-w-0 justify-between text-[11px] font-semibold text-slate-700">
                        <span className="truncate">{m.name}</span>
                        <span className="shrink-0">{m.value}</span>
                      </div>
                      <ProgressBar value={m.value} className="mt-1 bg-slate-100" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* IMPACT STRIP */}
            <div className="grid w-full min-w-0 grid-cols-2 sm:grid-cols-4 items-center justify-around gap-4 sm:gap-6 rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
              <div className="min-w-0 text-center">
                <div className="truncate text-2xl font-black text-slate-900 sm:text-3xl">₹4.8L+</div>
                <div className="mt-0.5 truncate text-[11px] font-medium text-slate-700">CSR Funds Deployed</div>
              </div>
              <div className="min-w-0 text-center">
                <div className="truncate text-2xl font-black text-slate-900 sm:text-3xl">{resolved * 9}</div>
                <div className="mt-0.5 truncate text-[11px] font-medium text-slate-700">Projects Completed</div>
              </div>
              <div className="min-w-0 text-center">
                <div className="truncate text-2xl font-black text-slate-900 sm:text-3xl">130K+</div>
                <div className="mt-0.5 truncate text-[11px] font-medium text-slate-700">Citizens Reached</div>
              </div>
              <div className="min-w-0 text-center">
                <div className="truncate text-2xl font-black text-slate-900 sm:text-3xl">76+</div>
                <div className="mt-0.5 truncate text-[11px] font-medium text-slate-700">Partner Organizations</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
