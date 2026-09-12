"use client";

import Image from "next/image";
import { useState } from "react";
import { BadgeCheck, Brain, Check, GraduationCap, MapPin, TrendingUp } from "lucide-react";

import { PortalPageHeader } from "@/components/portal/kpi-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UNIVERSITIES, type University } from "@/lib/data/university-mock";

interface AssignedUni extends University {
  assignedOn?: string;
}

export function UniversityAssignPage() {
  const [assigned, setAssigned] = useState<AssignedUni[]>([
    { ...UNIVERSITIES[0], assignedOn: "Assigned yesterday" },
  ]);
  const [matches, setMatches] = useState<AssignedUni[]>([]);

  const isAssigned = (id: string) => assigned.some((a) => a.id === id);

  const assign = (u: University) => {
    setAssigned((prev) => [{ ...u, assignedOn: "Assigned just now" }, ...prev]);
    setMatches((prev) => [...prev, u]);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-5 pb-6">
      <PortalPageHeader
        icon={<GraduationCap size={20} />}
        iconBg="bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-md shadow-emerald-500/20"
        title="Assign University"
        subtitle="AI-matched institutions for civic issues in Jodhpur"
        action={
          <span className="flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-600 ring-1 ring-primary-600/20">
            <Brain size={14} /> Smart match on
          </span>
        }
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <p className="text-sm font-bold text-slate-900">Recommended action</p>
        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-600">
          Based on the live issue mix (<strong className="text-slate-900">Roads &amp; Infrastructure 40%</strong>, Water
          25%), <strong className="font-bold text-emerald-700">IIT Jodhpur ({UNIVERSITIES[0].matchScore})</strong> is the strongest
          fit. Assigning them to the <em className="text-slate-800">Main Market road damage</em> report is likely to cut resolution time by 3 days.
        </p>
        <div className="mt-3.5 flex flex-wrap gap-2">
          <Button size="sm" className="bg-primary-600 text-white hover:bg-primary-700" onClick={() => assign(UNIVERSITIES[0])}>
            <Check size={14} /> Auto-assign top match
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
            onClick={() => setMatches([{ ...UNIVERSITIES[0], assignedOn: "" }])}
          >
            View comparison →
          </Button>
        </div>
      </div>

      {matches.length > 0 && (
        <div className="glass rounded-2xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
          <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
            <TrendingUp size={15} className="text-primary-600" /> Skill-match comparison
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {UniMatchBars(UNIVERSITIES.slice(0, 4))}
          </div>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {UNIVERSITIES.map((u) => {
          const done = isAssigned(u.id);
          return (
            <div
              key={u.id}
              className={cn(
                "glass relative flex flex-col rounded-2xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60 transition",
                u.isRecommended && !done && "ring-2 ring-primary-300 hover:ring-primary-500",
              )}
            >
              {u.isRecommended && (
                <span className="absolute -top-2.5 left-4 rounded-full bg-primary-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                  RECOMMENDED
                </span>
              )}
              {done && (
                <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
                  <Check size={15} strokeWidth={3} />
                </span>
              )}

              <div className="flex items-start gap-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 ring-1 ring-slate-900/5">
                  <Image src={u.logo} alt={u.name} width={64} height={64} className="h-full w-full object-contain" loading="lazy" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-extrabold tracking-tight text-slate-900">{u.name}</h3>
                  <p className="text-[11px] font-semibold text-primary-600">{u.type}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                    <MapPin size={12} className="shrink-0" /> {u.location}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-600/20">
                  {u.matchScore}
                </span>
                <div className="ml-auto flex items-center gap-0.5">
                  <BadgeCheck size={13} className="text-primary-500" />
                  <span className="text-[10px] font-semibold text-slate-600">AI verified profile</span>
                </div>
              </div>

              <p className="mt-2 text-[11px] font-medium text-slate-500">
                <span className="font-bold text-slate-700">Expertise:</span> {u.expertise}
              </p>

              <div className="mt-4 flex gap-2">
                {done ? (
                  <div className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2.5 text-sm font-bold text-emerald-600 ring-1 ring-emerald-600/20">
                    <Check size={15} strokeWidth={3} /> {assigned.find((a) => a.id === u.id)?.assignedOn}
                  </div>
                ) : (
                  <>
                    <Button className="flex-1" onClick={() => assign(u)}>
                      Assign
                    </Button>
                    <Button variant="secondary" className="flex-1">
                      View profile
                    </Button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function UniMatchBars(unis: University[]) {
  const values = [98, 89, 84, 78];
  return unis.map((u, i) => (
    <div key={u.id} className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-900/5">
      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
        <span>{u.name}</span>
        <span className="text-primary-600">{u.matchScore}</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-white ring-1 ring-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-teal-500"
          style={{ width: `${values[i]}%` }}
        />
      </div>
    </div>
  ));
}