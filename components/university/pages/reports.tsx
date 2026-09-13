"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ClipboardList, Filter, MapPin, Search } from "lucide-react";

import { UniversityUrgencyBadge } from "@/components/portal/badges";
import { PortalPageHeader } from "@/components/portal/kpi-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UNIVERSITY_REPORTS, type UniversityReport } from "@/lib/data/university-mock";

const TABS = ["All", "In Progress", "Assigned", "Pending", "Resolved"];

export function UniversityReportsPage() {
  const [tab, setTab] = useState("All");
  const [query, setQuery] = useState("");
  const [localReports, setLocalReports] = useState<UniversityReport[]>([]);

  const allReports = [...localReports, ...UNIVERSITY_REPORTS];

  const filtered = allReports.filter((r) => {
    if (tab !== "All" && r.status !== tab) return false;
    if (query && !(r.title + r.location + r.assignedTo).toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const newReport = () => {
    setLocalReports((prev) => [
      ...prev,
      {
        ...UNIVERSITY_REPORTS[0],
        id: `rep-new-${prev.length}`,
        title: "Draft civic issue project",
        status: "Pending",
        statusColor: "gray",
        assignedTo: "Not assigned",
        assignedTeam: "Awaiting team match",
        updatedAgo: "Created just now",
      },
    ]);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-4 pb-6">
      <PortalPageHeader
        icon={<ClipboardList size={20} />}
        iconBg="bg-gradient-to-br from-indigo-500 to-blue-700 text-white shadow-md shadow-indigo-500/20"
        title="Civic Projects"
        subtitle="Manage civic issues assigned to your university teams"
        action={<Button onClick={newReport}>+ Start new project</Button>}
      />

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-xl bg-white/80 px-4 py-2.5 shadow-sm ring-1 ring-slate-900/5 backdrop-blur focus-within:ring-2 focus-within:ring-primary-500 sm:max-w-md">
          <Search size={16} className="text-slate-700" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, location, university…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-700"
          />
        </div>
        <button
          onClick={() => {
            setTab("All");
            setQuery("");
          }}
          className="flex items-center gap-1.5 rounded-xl bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-900/5 backdrop-blur transition hover:ring-primary-300"
        >
          <Filter size={16} /> Reset
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition sm:px-4 sm:text-xs",
              tab === t
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        {filtered.map((r) => (
          <Link key={r.id} href={`/university/reports/${r.id}`} className="block min-w-0 w-full">
            <div className="glass group flex w-full min-w-0 flex-col gap-4 rounded-2xl p-4 shadow-lg shadow-slate-900/5 ring-1 ring-white/60 transition hover:-translate-y-0.5 hover:shadow-xl sm:flex-row sm:items-center">
              <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-20 sm:w-32">
                <Image src={r.thumbnail} alt={r.title} width={256} height={160} className="h-full w-full object-cover" loading="lazy" />
                <span
                  className={cn(
                    "absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold text-white shadow-sm",
                    r.statusColor === "amber" && "bg-amber-500",
                    r.statusColor === "blue" && "bg-blue-500",
                    r.statusColor === "gray" && "bg-slate-500",
                    r.statusColor === "emerald" && "bg-emerald-500",
                  )}
                >
                  {r.status}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-1 text-base font-extrabold tracking-tight text-slate-900">{r.title}</h3>
                <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-slate-700">
                  <MapPin size={12} className="shrink-0" /> {r.location}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <UniversityUrgencyBadge urgency={r.urgency} />
                  <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
                    {r.category}
                  </span>
                  <span className="text-[11px] font-medium text-slate-700">{r.updatedAgo}</span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-700">Assigned to</p>
                  <p className="text-sm font-bold text-primary-600">{r.assignedTo}</p>
                </div>
                <ArrowRight size={16} className="text-slate-700 transition group-hover:text-primary-500" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
