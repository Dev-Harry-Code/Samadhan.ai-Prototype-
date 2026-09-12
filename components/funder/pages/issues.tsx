"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Filter, ImagePlus, MapPin, Search, SlidersHorizontal } from "lucide-react";

import { CompanyStatusBadge, CompanySeverityBadge } from "@/components/portal/badges";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { COMPANY_ISSUES } from "@/lib/data/company-mock";

const tabs = ["All", "Open", "In Progress", "Resolved", "Duplicates", "Critical"];

export function CompanyIssuesPage() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [localIssues, setLocalIssues] = useState<typeof COMPANY_ISSUES>([]);
  const [showIntake, setShowIntake] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newArea, setNewArea] = useState("Malad West");

  const allIssues = [...localIssues, ...COMPANY_ISSUES];

  const filtered = allIssues
    .filter((i) => {
      if (active === "Open") return i.status === "open" || i.status === "pending";
      if (active === "In Progress") return i.status === "in_progress";
      if (active === "Resolved") return i.status === "resolved";
      if (active === "Duplicates") return i.duplicate;
      if (active === "Critical") return i.severity === "Critical" || i.priority === "Critical";
      return true;
    })
    .filter((i) => {
      if (!query) return true;
      return (i.title + i.id + i.area + i.category).toLowerCase().includes(query.toLowerCase());
    });

  const criticalCount = allIssues.filter(
    (i) => (i.severity ?? i.priority) === "Critical" && i.status !== "resolved",
  ).length;

  const addIssue = () => {
    if (!newTitle.trim()) return;
    setLocalIssues((prev) => [
      {
        id: `AI-C${String(prev.length + COMPANY_ISSUES.length + 1).padStart(3, "0")}`,
        title: newTitle.trim(),
        description: "Manually added through intake form.",
        area: newArea.trim(),
        category: "New Intake",
        status: "open",
        priority: "Medium",
        severity: "Medium",
        assignee: "Unassigned",
        beforeImage: ImagePlus,
        afterImage: null,
        reportedAt: "Just now",
        reportedBy: "Ops Team",
        department: "Municipal Corp",
        upvotes: 0,
        verified: null,
        duplicate: false,
        confidence: 0,
        coordinates: { x: 50, y: 50 },
        sentiment: "Neutral",
        resolutionETA: "Awaiting assignment",
        revenueEstimate: 0,
      },
      ...prev,
    ]);
    setNewTitle("");
    setShowIntake(false);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-4 pb-6">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">Issues</h1>
          <p className="text-sm text-slate-500">{allIssues.length} total · {criticalCount} critical open</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => {
              setActive("All");
              setQuery("");
            }}
            className="flex items-center gap-1.5 rounded-xl bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm ring-1 ring-slate-900/5 backdrop-blur transition hover:ring-primary-300"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
          <Button onClick={() => setShowIntake((v) => !v)}>
            {showIntake ? "Cancel" : "+ New issue"}
          </Button>
        </div>
      </div>

      {showIntake && (
        <div className="glass flex flex-col gap-2 rounded-2xl p-4 shadow-lg shadow-slate-900/5 ring-1 ring-white/60 sm:flex-row">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addIssue()}
            placeholder="Issue title…"
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
          <input
            value={newArea}
            onChange={(e) => setNewArea(e.target.value)}
            placeholder="Area"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 sm:w-48"
          />
          <Button onClick={addIssue} disabled={!newTitle.trim()} variant="dark">
            Add issue
          </Button>
        </div>
      )}

      <div className="flex items-center gap-2 rounded-xl bg-white/80 px-4 py-2.5 shadow-sm ring-1 ring-slate-900/5 backdrop-blur focus-within:ring-2 focus-within:ring-primary-500">
        <Search size={16} className="text-slate-600" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by ID, title, area, category…"
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
        />
        <Filter size={16} className="text-slate-500" />
      </div>

      <div className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {tabs.map((tab) => {
          const activeTab = active === tab;
          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={cn(
                "shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition",
                activeTab
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50",
              )}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-500">
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-500" /> Critical</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-orange-400" /> High</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400" /> Medium</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-slate-300" /> Low</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((issue) => (
          <Link key={issue.id} href={`/funder/issues/${issue.id}`}>
            <div className="glass group h-full rounded-2xl p-4 shadow-lg shadow-slate-900/5 ring-1 ring-white/60 transition hover:-translate-y-0.5 hover:shadow-xl">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  {issue.beforeImage ? <issue.beforeImage size={22} /> : <MapPin size={22} />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-slate-900">{issue.title}</p>
                    <CompanySeverityBadge severity={issue.priority ?? issue.severity} />
                  </div>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                    <MapPin size={12} className="shrink-0" /> {issue.area}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <CompanyStatusBadge status={issue.status} />
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                      {issue.category}
                    </span>
                    {issue.verified && (
                      <span className="flex items-center gap-1 rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-medium text-primary-600">
                        <Check size={11} strokeWidth={3} /> AI verified
                      </span>
                    )}
                    {issue.duplicate && (
                      <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-600">
                        Duplicate
                      </span>
                    )}
                  </div>
                </div>
                <ArrowUpRight size={18} className="mt-1 shrink-0 text-slate-500 transition group-hover:text-primary-500" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}