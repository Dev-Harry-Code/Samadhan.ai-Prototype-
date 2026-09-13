"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  ClipboardList,
  Cpu,
  FileText,
  GraduationCap,
  HeartPulse,
  IndianRupee,
  Landmark,
  Leaf,
  MapPin,
  PieChart,
  TrendingUp,
  Users,
} from "lucide-react";

import { CivicBackground } from "@/components/akshat/common/civic-background";
import { UniversityStatusBadge, UniversityUrgencyBadge } from "@/components/portal/badges";
import { HubNav } from "@/components/portal/hub-nav";
import { MetricCard } from "@/components/portal/metric-card";
import { PortalOverviewHeader } from "@/components/portal/overview-header";
import { cn } from "@/lib/utils";
import {
  UNIVERSITIES,
  UNIVERSITY_REPORTS,
  UNIVERSITY_TEAMS,
  UNIVERSITY_USER,
} from "@/lib/data/university-mock";

import { JodhpurCityMap } from "@/components/university/jodhpur-city-map";

const CityscapeCanvas = dynamic(
  () => import("@/components/three/cityscape-canvas").then((m) => m.CityscapeCanvas),
  { ssr: false },
);

const OPPORTUNITIES = [
  {
    id: "civil",
    name: "Civil Engineering",
    count: 12,
    desc: "Roads, bridges & drainage design insights",
    icon: <Building2 className="h-5 w-5 text-emerald-600" />,
    bgCard: "bg-emerald-50/80 border-emerald-200/90 hover:border-emerald-300",
    iconBg: "bg-emerald-100 text-emerald-700",
    badgeColor: "text-emerald-700 bg-emerald-100/80 border-emerald-200",
  },
  {
    id: "env",
    name: "Environmental Studies",
    count: 8,
    desc: "Water quality, greenery & pollution mapping",
    icon: <Leaf className="h-5 w-5 text-teal-600" />,
    bgCard: "bg-teal-50/80 border-teal-200/90 hover:border-teal-300",
    iconBg: "bg-teal-100 text-teal-700",
    badgeColor: "text-teal-700 bg-teal-100/80 border-teal-200",
  },
  {
    id: "cs",
    name: "Computer Science",
    count: 6,
    desc: "AI triage, dashboards & civic data science",
    icon: <Cpu className="h-5 w-5 text-indigo-600" />,
    bgCard: "bg-indigo-50/80 border-indigo-200/90 hover:border-indigo-300",
    iconBg: "bg-indigo-100 text-indigo-700",
    badgeColor: "text-indigo-700 bg-indigo-100/80 border-indigo-200",
  },
  {
    id: "health",
    name: "Healthcare",
    count: 5,
    desc: "Public health & sanitation awareness drives",
    icon: <HeartPulse className="h-5 w-5 text-rose-600" />,
    bgCard: "bg-rose-50/80 border-rose-200/90 hover:border-rose-300",
    iconBg: "bg-rose-100 text-rose-700",
    badgeColor: "text-rose-700 bg-rose-100/80 border-rose-200",
  },
  {
    id: "edu",
    name: "Education",
    count: 4,
    desc: "Awareness campaigns & skill development",
    icon: <BookOpen className="h-5 w-5 text-sky-600" />,
    bgCard: "bg-sky-50/80 border-sky-200/90 hover:border-sky-300",
    iconBg: "bg-sky-100 text-sky-700",
    badgeColor: "text-sky-700 bg-sky-100/80 border-sky-200",
  },
  {
    id: "planning",
    name: "Urban Planning",
    count: 7,
    desc: "Land-use & ward-level development plans",
    icon: <Landmark className="h-5 w-5 text-amber-600" />,
    bgCard: "bg-amber-50/80 border-amber-200/90 hover:border-amber-300",
    iconBg: "bg-amber-100 text-amber-700",
    badgeColor: "text-amber-700 bg-amber-100/80 border-amber-200",
  },
];

const TREND = [
  { month: "Apr", launched: 4, solved: 2 },
  { month: "May", launched: 6, solved: 4 },
  { month: "Jun", launched: 8, solved: 6 },
  { month: "Jul", launched: 11, solved: 8 },
  { month: "Aug", launched: 15, solved: 12 },
  { month: "Sep", launched: 20, solved: 18 },
];

const GAUGE = [
  { label: "Civil", count: "21", pct: 34, color: "#0D9488" },
  { label: "Environment", count: "14", pct: 23, color: "#10B981" },
  { label: "Digital", count: "11", pct: 18, color: "#F97316" },
  { label: "Health", count: "9", pct: 15, color: "#0284C7" },
];

export function UniversityOverviewPage() {
  const [activeRange, setActiveRange] = useState<"month" | "quarter" | "year">("month");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(5);
  const [mapViewMode, setMapViewMode] = useState<"gis" | "3d">("gis");

  const recommended = UNIVERSITIES.find((u) => u.isRecommended) ?? UNIVERSITIES[0];
  const activeReports = UNIVERSITY_REPORTS.filter((r) => r.status !== "Resolved");
  const resolvedReports = UNIVERSITY_REPORTS.filter((r) => r.status === "Resolved");
  const availableTeams = UNIVERSITY_TEAMS.filter((t) => t.status === "Available");
  const maxVal = 24;

  return (
    <div className="relative min-h-screen">
      <CivicBackground />
      <div className="relative z-10">
        <PortalOverviewHeader
          role="University Partner"
          location={UNIVERSITY_USER.location}
          storageKey="samadhan.university"
          user={{ name: UNIVERSITY_USER.name, avatar: UNIVERSITY_USER.avatar }}
          links={[
            { href: "/university", label: "Overview" },
            { href: "/university/reports", label: "Recommended Issues" },
            { href: "/university/team", label: "Teams" },
            { href: "/university/community", label: "Community" },
          ]}
        />

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-1/2 top-6 h-[250px] w-[150vw] sm:w-[500px] -translate-x-1/2 rounded-full bg-teal-500/10 blur-[100px]"></div>
          <div className="pointer-events-none absolute right-[-10%] top-96 h-[350px] w-[150vw] sm:w-[350px] rounded-full bg-orange-500/10 blur-[110px]"></div>

          <main className="relative z-10 mx-auto max-w-7xl space-y-6 px-3 pb-16 pt-6 sm:px-6">
            {/* HERO & WELCOME */}
            <div className="mx-auto max-w-3xl pb-2 pt-4 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-800 shadow-xs">
                <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500"></span>
                <span className="font-medium">AI-Powered Civic Workspace</span>
              </div>

              <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Welcome back, {UNIVERSITY_USER.name.split(" ")[0] ?? "Prof."}! 👋
              </h1>

              <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-slate-700 sm:text-sm">
                Your student teams have improved <strong>14,850 lives</strong>. The AI has curated a new set of civic challenges that perfectly match your ongoing curriculum.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/university/analytics"
                  className="btn-breathing flex items-center gap-2 rounded-2xl bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-teal-700 hover:shadow-lg"
                >
                  View AI Analytics <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/university/assign"
                  className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-xs transition-all duration-200 hover:bg-slate-50 hover:shadow-md"
                >
                  Explore Opportunities <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* HUB NAV */}
            <HubNav
              activeHref="/university"
              items={[
                { href: "/university", label: "Overview" },
                { href: "/university/reports", label: "Recommended Issues" },
                { href: "/university/assign", label: "Assignments" },
                { href: "/university/team", label: "Teams" },
              ]}
            />

            {/* METRICS */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
              <MetricCard
                icon={<Users className="h-4 w-4 text-sky-600" />}
                title="Student Volunteers"
                value="230"
                growth="+12"
                subtext="new this week"
                tone="sky"
                delay={0}
              />
              <MetricCard
                icon={<ClipboardList className="h-4 w-4 text-amber-600" />}
                title="Active Projects"
                value={activeReports.length}
                growth="+3"
                subtext="currently running"
                tone="amber"
                delay={0.06}
              />
              <MetricCard
                icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                title="Resolved Projects"
                value={resolvedReports.length}
                growth="+15%"
                subtext="this month"
                tone="emerald"
                delay={0.12}
              />
              <MetricCard
                icon={<PieChart className="h-4 w-4 text-purple-600" />}
                title="Volunteer Hours"
                value="1,240"
                growth="+18%"
                subtext="vs last month"
                tone="purple"
                delay={0.18}
              />
              <MetricCard
                icon={<GraduationCap className="h-4 w-4 text-teal-600" />}
                title="Active Teams"
                value={UNIVERSITY_TEAMS.length}
                growth="+1"
                subtext="teams deployed"
                tone="teal"
                delay={0.24}
              />
              <MetricCard
                icon={<HeartPulse className="h-4 w-4 text-rose-600" />}
                title="Community Impact"
                value="14,850"
                growth="+25%"
                subtext="lives improved"
                tone="rose"
                delay={0.3}
              />
            </div>

            {/* UNIVERSITY OPPORTUNITIES */}
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 sm:text-lg">
                    University Opportunities
                  </h3>
                  <p className="text-xs text-slate-700">
                    Explore civic challenges where university expertise can create impact
                  </p>
                </div>
                <Link
                  href="/university/reports"
                  className="flex flex-shrink-0 items-center gap-1 rounded-xl border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700 transition hover:text-teal-800"
                >
                  <span>View All</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {OPPORTUNITIES.map((cat, index) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.03, boxShadow: "0 8px 20px -4px rgba(15, 23, 42, 0.08)" }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex min-h-[130px] cursor-pointer flex-col justify-between rounded-2xl border p-3.5 shadow-2xs transition-all ${cat.bgCard}`}
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <div
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl shadow-2xs sm:h-9 sm:w-9 ${cat.iconBg}`}
                      >
                        {cat.icon}
                      </div>
                      <span
                        className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold sm:text-[11px] ${cat.badgeColor}`}
                      >
                        {cat.count} Open
                      </span>
                    </div>

                    <div className="mt-auto">
                      <div className="text-xs font-black leading-snug text-slate-900 sm:text-[13px]">
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
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="relative box-border flex h-full min-h-[390px] flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <div className="relative z-10 mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 flex-shrink-0 text-teal-600" />
                        <h3 className="whitespace-normal text-base font-black tracking-tight text-slate-900 sm:text-lg">
                          University Impact Analytics
                        </h3>
                        <span className="relative flex h-2 w-2 flex-shrink-0">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-500 opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-600"></span>
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-700">
                        Civic projects launched vs. verified academic impact
                      </p>
                    </div>

                    <div className="flex flex-shrink-0 items-center self-start rounded-xl border border-slate-200 bg-slate-100 p-1 text-xs font-semibold sm:self-auto">
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
                          Solved ({hoveredIndex !== null ? TREND[hoveredIndex].solved : 18})
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-300"></span>
                        <span className="font-medium text-slate-700">
                          Launched ({hoveredIndex !== null ? TREND[hoveredIndex].launched : 20})
                        </span>
                      </div>
                    </div>
                    <div className="rounded-md border border-teal-200 bg-teal-50 px-2 py-0.5 font-mono text-xs font-bold text-teal-700">
                      Impact Rate: 85%
                    </div>
                  </div>

                  <div className="relative z-10 flex h-44 w-full items-end justify-between gap-1 pt-3 sm:gap-3 sm:px-3 overflow-x-auto overflow-y-hidden pb-1 scrollbar-hide">
                    {TREND.map((item, idx) => {
                      const launched = Math.min(100, Math.max(12, (item.launched / maxVal) * 100));
                      const solved = Math.min(100, Math.max(12, (item.solved / maxVal) * 100));
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
                                {item.solved} solved
                              </span>
                            ) : null}
                          </div>

                          <div className="relative flex h-28 w-full items-end justify-center gap-1.5">
                            <div
                              style={{ height: `${launched}%` }}
                              className="w-2 rounded-t-md bg-slate-200 transition-all duration-300 group-hover:bg-slate-300 sm:w-3"
                            ></div>
                            <div
                              style={{ height: `${solved}%` }}
                              className={cn(
                                "relative w-2 rounded-t-md transition-all duration-300 sm:w-3",
                                isHovered ? "bg-primary-600 shadow-sm" : "bg-primary-500",
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

              <div className="lg:col-span-1">
                <div className="relative box-border flex h-full min-h-[380px] flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <h3 className="truncate text-sm font-bold text-slate-900 sm:text-base">
                        Opportunity Breakdown
                      </h3>
                      <p className="text-xs text-slate-700">Distribution by discipline</p>
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
                          62
                        </span>
                        <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                          Programmes
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid w-full grid-cols-2 gap-2 border-t border-slate-100 pt-3">
                    {GAUGE.map((c, i) => (
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
              </div>
            </div>

            {/* RECOMMENDED OPPORTUNITIES + ACTIVE PROJECTS */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/60">
                      <GraduationCap size={16} />
                    </span>
                    Recommended Opportunities
                  </h3>
                  <Link
                    href="/university/assign"
                    className="flex items-center gap-1 text-xs font-bold text-primary-600 hover:underline"
                  >
                    Explore all <ArrowRight size={13} />
                  </Link>
                </div>

                {/* Top recommended university featured highlight */}
                <div className="flex items-center gap-3.5 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-3.5 transition hover:border-emerald-200">
                  <Image
                    src={recommended.logo}
                    alt={recommended.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-xl border border-slate-200/70 bg-white object-contain p-1 shadow-xs"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold text-slate-900">{recommended.name}</p>
                      <span className="inline-flex items-center rounded-full border border-emerald-300 bg-emerald-100/80 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                        {recommended.matchScore}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs font-medium text-slate-700">
                      {recommended.expertise} · {recommended.location}
                    </p>
                  </div>
                </div>

                {/* Other top matched universities */}
                <div className="mt-3.5 space-y-2">
                  {UNIVERSITIES.slice(1, 4).map((u) => (
                    <div
                      key={u.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3.5 py-2.5 transition hover:bg-slate-100/70"
                    >
                      <p className="truncate text-xs font-semibold text-slate-800">{u.name}</p>
                      <span className="shrink-0 rounded-md bg-white px-2 py-0.5 font-mono text-[11px] font-bold text-primary-700 shadow-xs ring-1 ring-slate-200">
                        {u.matchScore}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                  <p className="text-xs leading-relaxed text-slate-700">
                    <strong className="font-bold text-slate-900">{recommended.name}</strong> is the best match for current open issues given expertise in{" "}
                    <span className="font-semibold text-emerald-700">{recommended.expertise}</span>.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Active University Projects</h3>
                  <Link
                    href="/university/reports"
                    className="text-xs font-bold text-primary-600 hover:underline"
                  >
                    All projects →
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {activeReports.slice(0, 4).map((r) => (
                    <Link key={r.id} href={`/university/reports/${r.id}`} className="group h-full">
                      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 transition hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex h-24 items-center justify-center overflow-hidden bg-slate-100">
                          <Image
                            src={r.thumbnail}
                            alt=""
                            width={96}
                            height={96}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 p-3">
                          <div className="flex items-start justify-between gap-2">
                            <p className="line-clamp-1 text-xs font-semibold text-slate-900">
                              {r.title}
                            </p>
                            <UniversityStatusBadge status={r.status} />
                          </div>
                          <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-700">
                            <MapPin size={10} className="shrink-0" /> {r.location}
                          </p>
                          <div className="mt-2 flex items-center justify-between gap-2">
                            <UniversityUrgencyBadge urgency={r.urgency} />
                            <span className="text-[10px] font-medium text-slate-700">
                              {r.updatedAgo}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* JODHPUR LIVE MAP & SNAPSHOT */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
                      <MapPin size={18} className="text-primary-600" /> Jodhpur Live Map & Civic Hotspots
                    </h3>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
                      {mapViewMode === "gis" ? "Current Live Map" : "3D Digital Twin"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs font-medium text-slate-700">
                    Real-time geographic coverage of active civic issues and university research zones across Jodhpur
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-xl bg-slate-100 p-1">
                    <button
                      type="button"
                      onClick={() => setMapViewMode("gis")}
                      className={cn(
                        "rounded-lg px-3 py-1 text-xs font-bold transition",
                        mapViewMode === "gis"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-700 hover:text-slate-900",
                      )}
                    >
                      Jodhpur Map
                    </button>
                    <button
                      type="button"
                      onClick={() => setMapViewMode("3d")}
                      className={cn(
                        "rounded-lg px-3 py-1 text-xs font-bold transition",
                        mapViewMode === "3d"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-700 hover:text-slate-900",
                      )}
                    >
                      3D Model
                    </button>
                  </div>
                  <Link
                    href="/university/reports"
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800 transition hover:bg-slate-100"
                  >
                    Open Issue Map →
                  </Link>
                </div>
              </div>

              {mapViewMode === "gis" ? (
                <JodhpurCityMap />
              ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <CityscapeCanvas />
                </div>
              )}
            </div>

            {/* IMPACT STRIP */}
            <div className="flex flex-wrap items-center justify-around gap-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-black text-slate-900 sm:text-3xl">{UNIVERSITIES.length}</div>
                <div className="mt-0.5 text-[11px] font-medium text-slate-700">
                  Partner Universities
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-slate-900 sm:text-3xl">120+</div>
                <div className="mt-0.5 text-[11px] font-medium text-slate-700">Students Engaged</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-slate-900 sm:text-3xl">
                  {resolvedReports.length * 6}+
                </div>
                <div className="mt-0.5 text-[11px] font-medium text-slate-700">Verified Solutions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-slate-900 sm:text-3xl">42K+</div>
                <div className="mt-0.5 text-[11px] font-medium text-slate-700">
                  Communities Reached
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
