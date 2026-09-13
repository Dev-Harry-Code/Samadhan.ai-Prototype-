
"use client";

import { Brain, Sparkles, TrendingUp, AlertOctagon, GraduationCap, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import Link from "next/link";

import { PortalPageHeader } from "@/components/portal/kpi-card";
import { Button } from "@/components/ui/button";

const CATEGORY_DATA = [
  { name: "Roads & Infra", count: 12, color: "#059669" },
  { name: "Water & Sanitization", count: 8, color: "#0284c7" },
  { name: "Environment", count: 5, color: "#10b981" },
  { name: "Public Health", count: 3, color: "#e11d48" },
  { name: "Education", count: 2, color: "#4f46e5" },
];

const SEVERITY_DATA = [
  { name: "Critical", value: 3, color: "#ef4444" },
  { name: "High", value: 7, color: "#f97316" },
  { name: "Medium", value: 14, color: "#eab308" },
  { name: "Low", value: 6, color: "#22c55e" },
];

export function UniversityAnalyticsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-6">
      <PortalPageHeader
        icon={<Brain size={20} />}
        iconBg="bg-gradient-to-br from-indigo-500 to-violet-700 text-white shadow-md shadow-indigo-500/20"
        title="AI Analytics & Triage"
        subtitle="AI-driven categorization, severity assessment, and curriculum matching"
        action={
          <span className="flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 ring-1 ring-indigo-600/20">
            <Sparkles size={14} className="text-indigo-500" /> Model updated today
          </span>
        }
      />

      {/* Curriculum Matcher */}
      <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-5 shadow-xs">
        <div className="mb-4 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-indigo-600" />
          <h2 className="text-sm font-bold text-slate-900">AI Curriculum Matcher</h2>
        </div>
        <p className="text-sm text-slate-700 mb-4">
          The AI has detected <strong className="font-bold text-indigo-700">3 new civic issues</strong> that perfectly align with your ongoing Civil Engineering final-year assessments.
        </p>
        
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="glass rounded-xl p-4 ring-1 ring-indigo-100">
            <span className="mb-2 inline-block rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700">98% SYLLABUS MATCH</span>
            <h3 className="text-sm font-bold text-slate-900">Structural Integrity of Old City Bridges</h3>
            <p className="mt-1 text-xs text-slate-600">Matches CE-401 (Advanced Structural Analysis)</p>
            <Button size="sm" className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
              <Link href="/university/assign">Assign to Civil Team</Link>
            </Button>
          </div>
          <div className="glass rounded-xl p-4 ring-1 ring-teal-100">
            <span className="mb-2 inline-block rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-700">92% SYLLABUS MATCH</span>
            <h3 className="text-sm font-bold text-slate-900">Groundwater Depletion Survey in Sector 4</h3>
            <p className="mt-1 text-xs text-slate-600">Matches EV-305 (Hydrology & Water Resources)</p>
            <Button size="sm" className="mt-3 w-full bg-teal-600 hover:bg-teal-700 text-white" asChild>
              <Link href="/university/assign">Assign to Env Team</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Category Graph */}
        <div className="glass rounded-2xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900">Issue Categories</h2>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: "#f1f5f9" }} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity Triage */}
        <div className="glass flex flex-col rounded-2xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
          <div className="mb-4 flex items-center gap-2">
            <AlertOctagon className="h-5 w-5 text-rose-600" />
            <h2 className="text-sm font-bold text-slate-900">AI Severity Triage</h2>
          </div>
          
          <div className="flex h-[180px] w-full items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SEVERITY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {SEVERITY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-auto">
            <div className="rounded-xl border border-rose-100 bg-rose-50 p-3">
              <p className="text-xs font-bold text-rose-700">Immediate Action Required</p>
              <p className="mt-1 text-xs text-rose-600">
                AI has identified 3 critical issues (e.g. Open high-voltage wiring in Sector 2) that require immediate engineering intervention.
              </p>
              <Link href="/university/assign" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-rose-700 hover:underline">
                View Critical Queue <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

