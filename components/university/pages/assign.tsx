
"use client";

import { useState } from "react";
import { BadgeCheck, Brain, Check, Users, MapPin, TrendingUp, AlertTriangle } from "lucide-react";

import { PortalPageHeader } from "@/components/portal/kpi-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api/client";
import { useUniApiIssues } from "@/lib/api-hooks";
import { UNIVERSITY_TEAMS, UNIVERSITY_REPORTS, type UniversityTeam } from "@/lib/data/university-mock";

interface AssignedTeam extends UniversityTeam {
  assignedOn?: string;
}

export function UniversityAssignPage() {
  const { reports: apiReports, loading } = useUniApiIssues();
  const apiPending = !loading ? apiReports.find((r) => r.status === "Pending") : undefined;

  // Mock finding an unassigned issue (e.g. rep-003 is pending)
  const pendingIssue = apiPending || UNIVERSITY_REPORTS.find(r => r.status === "Pending") || UNIVERSITY_REPORTS[2];
  
  const [assigned, setAssigned] = useState<AssignedTeam[]>([]);
  const [matches, setMatches] = useState<AssignedTeam[]>([]);

  const isAssigned = (id: string) => assigned.some((a) => a.id === id);

  const assign = (t: UniversityTeam) => {
    setAssigned((prev) => [{ ...t, assignedOn: "Assigned just now" }, ...prev]);
    setMatches((prev) => [...prev, t]);
    void api
      .post("/api/teams", {
        issueId: pendingIssue.id,
        message: "Team assigned from university portal",
      })
      .catch(() => {});
  };

  // For the UI, let"s mock match scores for teams based on the issue
  const getMatchScore = (teamId: string) => {
    if (teamId === "env-team") return 98;
    if (teamId === "infra-team") return 75;
    if (teamId === "civil-team") return 88;
    return 60;
  };

  const sortedTeams = [...UNIVERSITY_TEAMS].sort((a, b) => getMatchScore(b.id) - getMatchScore(a.id));
  const topMatch = sortedTeams[0];

  return (
    <div className="mx-auto max-w-5xl space-y-5 pb-6">
      <PortalPageHeader
        icon={<Users size={20} />}
        iconBg="bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-md shadow-emerald-500/20"
        title="Assign Student Teams"
        subtitle="Match internal university teams to incoming civic projects"
        action={
          <span className="flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-600 ring-1 ring-primary-600/20">
            <Brain size={14} /> AI Skills Matcher Active
          </span>
        }
      />

      {/* The Issue to Assign */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <span className="flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">
            <AlertTriangle className="h-3.5 w-3.5" /> Pending Assignment
          </span>
          <span className="text-xs font-semibold text-slate-500">{pendingIssue.updatedAgo}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900">{pendingIssue.title}</h3>
        <p className="flex items-center gap-1 text-sm text-slate-700 mt-1">
          <MapPin size={14} className="text-slate-400" /> {pendingIssue.location}
        </p>
        <p className="mt-2 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">{pendingIssue.description}</p>
        
        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="text-sm font-bold text-slate-900">AI Recommendation</p>
          <p className="mt-1 text-sm text-slate-700">
            Based on the issue category ({pendingIssue.category}), the <strong className="font-bold text-emerald-700">{topMatch.name}</strong> is the strongest fit with a {getMatchScore(topMatch.id)}% skill match.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" className="bg-primary-600 text-white hover:bg-primary-700" onClick={() => assign(topMatch)} disabled={isAssigned(topMatch.id)}>
              <Check size={14} /> Auto-assign {topMatch.name}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              onClick={() => setMatches([{ ...topMatch, assignedOn: "" }])}
            >
              View skills comparison ?
            </Button>
          </div>
        </div>
      </div>

      {matches.length > 0 && (
        <div className="glass rounded-2xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
          <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
            <TrendingUp size={15} className="text-primary-600" /> Skill-match comparison
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {sortedTeams.map((t) => (
              <div key={t.id} className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-900/5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>{t.name}</span>
                  <span className="text-primary-600">{getMatchScore(t.id)}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white ring-1 ring-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary-500 to-teal-500"
                    style={{ width: `${getMatchScore(t.id)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedTeams.map((t) => {
          const done = isAssigned(t.id);
          const isTopMatch = t.id === topMatch.id;
          
          return (
            <div
              key={t.id}
              className={cn(
                "glass relative flex flex-col rounded-2xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60 transition",
                isTopMatch && !done && "ring-2 ring-primary-300 hover:ring-primary-500",
              )}
            >
              {isTopMatch && (
                <span className="absolute -top-2.5 left-4 rounded-full bg-primary-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                  TOP MATCH
                </span>
              )}
              {done && (
                <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
                  <Check size={15} strokeWidth={3} />
                </span>
              )}

              <div className="min-w-0 mb-3">
                <h3 className="text-base font-extrabold tracking-tight text-slate-900">{t.name}</h3>
                <p className="text-[11px] font-semibold text-primary-600">{t.studentCount} Students</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-700">
                  <Users size={12} className="shrink-0" /> Advised by {t.facultyAdvisor.split(" (")[0]}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-600/20">
                  {getMatchScore(t.id)}% Match
                </span>
                <div className="ml-auto flex items-center gap-0.5">
                  <BadgeCheck size={13} className="text-primary-500" />
                  <span className="text-[10px] font-semibold text-slate-700">Available</span>
                </div>
              </div>

              <div className="mt-auto pt-4 flex gap-2">
                {done ? (
                  <div className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2.5 text-sm font-bold text-emerald-600 ring-1 ring-emerald-600/20">
                    <Check size={15} strokeWidth={3} /> {assigned.find((a) => a.id === t.id)?.assignedOn}
                  </div>
                ) : (
                  <>
                    <Button className="flex-1" onClick={() => assign(t)}>
                      Assign Team
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

