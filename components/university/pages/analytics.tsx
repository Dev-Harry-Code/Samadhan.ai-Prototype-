
"use client";

import { useState } from "react";
import {
  Brain,
  Sparkles,
  TrendingUp,
  AlertOctagon,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Users,
  Lightbulb,
  ShieldAlert,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import Link from "next/link";

import { PortalPageHeader } from "@/components/portal/kpi-card";
import { Button } from "@/components/ui/button";

const CATEGORY_DATA = [
  { name: "Roads & Infra", count: 12, color: "#059669" },
  { name: "Water & Sanitation", count: 8, color: "#0284c7" },
  { name: "Environment", count: 5, color: "#10b981" },
  { name: "Garbage Mgmt", count: 7, color: "#16a34a" },
  { name: "Public Health", count: 3, color: "#e11d48" },
  { name: "Education", count: 2, color: "#4f46e5" },
];

const SEVERITY_DATA = [
  { name: "Critical", value: 3, color: "#ef4444" },
  { name: "High", value: 7, color: "#f97316" },
  { name: "Medium", value: 14, color: "#eab308" },
  { name: "Low", value: 6, color: "#22c55e" },
];

const TEAM_SOLUTIONS = [
  {
    teamId: "civil-team",
    teamName: "Civil Engineering Team",
    advisor: "Dr. Ananya Sharma",
    issuesCount: 5,
    topCase: "Bridge Deck Expansion Gap Fracture (Ratanda)",
    urgency: "High",
    curriculumLink: "CE-401: Structural Health Monitoring (Final Year Assessment)",
    aiSteps: [
      "1. Deploy ultrasonic pulse velocity sensor to measure concrete crack depth.",
      "2. Calculate load capacity reduction and simulate peak rush-hour stresses.",
      "3. Formulate polymer-modified cold mastic asphalt for rapid patching.",
      "4. Submit digital structural safety audit to Jodhpur Municipal Corporation.",
    ],
  },
  {
    teamId: "env-team",
    teamName: "Environmental Science Team",
    advisor: "Prof. Vikramaditya Patel",
    issuesCount: 4,
    topCase: "Kaylana Lake Industrial Runoff & Coliform Spike",
    urgency: "Critical",
    curriculumLink: "EV-305: Water Chemistry & Microbiological Assessment",
    aiSteps: [
      "1. Collect multi-point water samples at 50m intervals along shoreline.",
      "2. Execute 24-hr biological oxygen demand (BOD) and chemical testing.",
      "3. Design low-cost bio-retention swale using locally available gravel and vetiver grass.",
      "4. Publish open-source water quality dashboard for local residents.",
    ],
  },
  {
    teamId: "infra-team",
    teamName: "Infrastructure & Urban Planning Team",
    advisor: "Dr. K. R. Verma",
    issuesCount: 3,
    topCase: "Soorsagar Junction Bottleneck & Pedestrian Hazard",
    urgency: "Medium",
    curriculumLink: "UP-402: Traffic Flow Engineering & Pedestrian Mobility",
    aiSteps: [
      "1. Use computer vision analysis on municipal traffic feed to map delay hotspots.",
      "2. Redesign roundabout turning radii and signal cycle timing.",
      "3. Propose safe pedestrian refuge island with solar-powered bollards.",
      "4. Hand over simulation report to Traffic Police & Ward Council.",
    ],
  },
];

export function UniversityAnalyticsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-8">
      <PortalPageHeader
        icon={<Brain size={20} />}
        iconBg="bg-gradient-to-br from-indigo-500 to-violet-700 text-white shadow-md shadow-indigo-500/20"
        title="AI Analytics & Academic Triage"
        subtitle="Intelligent issue categorization, severity assessment, and team curriculum matching"
        action={
          <span className="flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 ring-1 ring-indigo-600/20">
            <Sparkles size={14} className="text-indigo-600" /> AI Model Synced (IIT Jodhpur)
          </span>
        }
      />

      {/* CURRICULUM & ONGOING STUDENT ASSESSMENT MATCHER */}
      <div className="rounded-3xl border border-indigo-200/90 bg-gradient-to-br from-indigo-50/90 via-white to-violet-50/70 p-5 shadow-xs sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-indigo-600" />
            <h2 className="text-base font-extrabold text-slate-900">
              Ongoing Student Assessment &amp; Curriculum Alignment
            </h2>
          </div>
          <span className="self-start rounded-full bg-indigo-100 px-2.5 py-0.5 text-[11px] font-bold text-indigo-800 ring-1 ring-indigo-200">
            Semester 7/8 Projects
          </span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
          AI automatically parses active city grievances and flags real-world cases that satisfy academic rubric criteria for student credits and final-year capstone grading:
        </p>

        <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
          <div className="glass rounded-2xl p-4 shadow-sm ring-1 ring-indigo-100 transition hover:shadow-md">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                98% SYLLABUS MATCH
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
                Credit: 4 Units
              </span>
            </div>
            <h3 className="mt-2 text-sm font-extrabold text-slate-900">
              Structural Integrity of Old City Bridges
            </h3>
            <p className="mt-1 text-xs text-slate-700">
              Satisfies <strong>CE-401 (Advanced Structural Analysis)</strong> field test criteria.
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-[11px] font-semibold text-indigo-600">Assigned: Civil Team</span>
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
                <Link href="/university/assign">Dispatch Team →</Link>
              </Button>
            </div>
          </div>

          <div className="glass rounded-2xl p-4 shadow-sm ring-1 ring-teal-100 transition hover:shadow-md">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-[10px] font-bold text-teal-800">
                94% SYLLABUS MATCH
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
                Credit: 3 Units
              </span>
            </div>
            <h3 className="mt-2 text-sm font-extrabold text-slate-900">
              Groundwater Salinity &amp; Nitrate Mapping
            </h3>
            <p className="mt-1 text-xs text-slate-700">
              Satisfies <strong>EV-305 (Hydrology &amp; Water Resources Lab)</strong> sampling hours.
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-[11px] font-semibold text-teal-700">Assigned: Env Team</span>
              <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white" asChild>
                <Link href="/university/assign">Dispatch Team →</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* GRAPHS: CATEGORIES + SEVERITY */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Category Graph */}
        <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <h2 className="text-sm font-extrabold text-slate-900">Issues by Category</h2>
            </div>
            <span className="text-[11px] font-bold text-slate-700">37 Live Reports</span>
          </div>
          <p className="mb-3 text-xs text-slate-700">
            Select a bar to view category density across Jodhpur wards.
          </p>

          <div className="h-[230px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={CATEGORY_DATA}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                onClick={(e) => {
                  if (e && e.activeLabel) setSelectedCategory(e.activeLabel as string);
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#475569" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#475569" }} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "#f1f5f9" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      opacity={selectedCategory && selectedCategory !== entry.name ? 0.45 : 1}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {selectedCategory && (
            <div className="mt-2 flex items-center justify-between rounded-xl bg-slate-100 px-3 py-1.5 text-xs text-slate-700">
              <span>Filtered: <strong>{selectedCategory}</strong></span>
              <button
                onClick={() => setSelectedCategory(null)}
                className="font-bold text-teal-700 hover:underline"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* AI Severity Triage */}
        <div className="glass flex flex-col rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertOctagon className="h-5 w-5 text-rose-600" />
              <h2 className="text-sm font-extrabold text-slate-900">AI Severity Triage</h2>
            </div>
            <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-800">
              3 Critical
            </span>
          </div>
          <p className="mb-2 text-xs text-slate-700">
            Emergency classification weighted by safety risk and public disruption.
          </p>

          <div className="flex h-[170px] w-full items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SEVERITY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {SEVERITY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-auto">
            <div className="rounded-2xl border border-rose-200 bg-rose-50/90 p-3.5 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                <ShieldAlert size={14} className="text-rose-600" />
                Critical Priority Case: Main Water Main Breach (Ward 9)
              </div>
              <p className="mt-1 text-xs text-slate-700">
                AI estimated 12,000 liters/hour water loss endangering adjacent road foundation. Requires Civil &amp; Environmental on-site assessment.
              </p>
              <Link
                href="/university/assign"
                className="mt-2.5 inline-flex items-center gap-1 text-xs font-extrabold text-rose-700 hover:text-rose-900 hover:underline"
              >
                Dispatch Emergency Student Squad <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* AI TEAM CATEGORIZATION & SOLUTION RECOMMENDATIONS */}
      <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <h2 className="text-base font-extrabold text-slate-900">
                AI Team Categorization &amp; Step-by-Step Resolution Guide
              </h2>
            </div>
            <p className="mt-0.5 text-xs text-slate-700">
              AI maps civic challenges to specific university department teams and formulates technical action workflows:
            </p>
          </div>
          <span className="self-start rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800 ring-1 ring-emerald-300">
            {TEAM_SOLUTIONS.length} Teams Configured
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {TEAM_SOLUTIONS.map((sol) => (
            <div
              key={sol.teamId}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-slate-300 hover:bg-white hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-slate-700 ring-1 ring-slate-200">
                    {sol.issuesCount} Issues
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase ${
                      sol.urgency === "Critical"
                        ? "bg-rose-100 text-rose-800"
                        : sol.urgency === "High"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {sol.urgency}
                  </span>
                </div>

                <h3 className="mt-2 text-sm font-extrabold text-slate-900">{sol.teamName}</h3>
                <p className="text-[11px] font-medium text-slate-700">Advisor: {sol.advisor}</p>

                <div className="mt-2 rounded-xl bg-white p-2.5 ring-1 ring-slate-200/70">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-teal-700">Target Problem</p>
                  <p className="mt-0.5 text-xs font-bold text-slate-900">{sol.topCase}</p>
                </div>

                <div className="mt-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
                    AI Execution Playbook:
                  </p>
                  <ul className="mt-1 space-y-1 text-[11px] text-slate-700">
                    {sol.aiSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-1 leading-snug">
                        <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-emerald-600" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 border-t border-slate-200 pt-3">
                <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700 text-white" asChild>
                  <Link href="/university/assign">Assign to {sol.teamName.split(" ")[0]}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

