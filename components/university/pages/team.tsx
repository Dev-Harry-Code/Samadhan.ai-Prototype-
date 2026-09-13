"use client";

import { useState } from "react";
import { Award, Brain, Check, MessageSquare, Rocket, Users, UserRound } from "lucide-react";

import { PortalPageHeader } from "@/components/portal/kpi-card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UNIVERSITY_TEAMS, type TeamMember, type UniversityTeam } from "@/lib/data/university-mock";

export function UniversityTeamPage() {
  const [teams, setTeams] = useState<UniversityTeam[]>(UNIVERSITY_TEAMS.map((t) => ({ ...t })));
  const [toast, setToast] = useState<string | null>(null);

  const toggleMember = (teamId: string, memberId: string) => {
    setTeams((prev) =>
      prev.map((t) =>
        t.id === teamId
          ? {
              ...t,
              selected: !t.selected,
              members: t.members.map((m) =>
                m.id === memberId ? { ...m, selected: !m.selected } : m,
              ),
            }
          : t,
      ),
    );
    setToast(null);
  };

  const deploy = (t: UniversityTeam) => {
    const selectedCount = t.members.filter((m) => m.selected).length;
    setToast(
      `${t.name} deployed${selectedCount > 0 ? " with " + selectedCount + " members" : ""} — teams notified.`,
    );
  };

  return (
    <div className="mx-auto max-w-5xl space-y-5 pb-6">
      <PortalPageHeader
        icon={<Users size={20} />}
        iconBg="bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/20"
        title="University Teams"
        subtitle={`${teams.length} teams · ${teams.reduce((a, t) => a + t.studentCount, 0)} students on standby`}
        action={
          <span className="flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-600 ring-1 ring-primary-600/20">
            <Check size={13} strokeWidth={3} /> All teams verified
          </span>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { label: "Available", value: teams.filter((t) => t.status === "Available").length, tone: "bg-emerald-500" },
          { label: "Students total", value: teams.reduce((a, t) => a + t.studentCount, 0), tone: "bg-teal-500" },
          { label: "Faculty advisors", value: teams.length, tone: "bg-violet-500" },
        ].map((s) => (
          <div key={s.label} className="glass rounded-2xl p-4 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
            <div className={cn("mb-1.5 h-1.5 w-8 rounded-full", s.tone)} />
            <div className="text-xl font-extrabold text-slate-900">{s.value}</div>
            <div className="text-[11px] font-semibold text-slate-700">{s.label}</div>
          </div>
        ))}
      </div>

      {toast && (
        <div className="flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg">
          <Rocket size={16} className="shrink-0 text-emerald-400" />
          {toast}
        </div>
      )}

      <div className="grid gap-4">
        {teams.map((t) => {
          const selectedCount = t.members.filter((m) => m.selected).length;
          return (
            <div key={t.id} className="glass rounded-2xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                    <Award size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold tracking-tight text-slate-900">{t.name}</h3>
                    <p className="text-xs text-slate-700">{t.studentCount} students · {t.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-[11px] font-bold ring-1",
                      t.status === "Available"
                        ? "bg-emerald-50 text-emerald-600 ring-emerald-600/20"
                        : "bg-slate-100 text-slate-700 ring-slate-200",
                    )}
                  >
                    {t.status}
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-slate-700 ring-1 ring-slate-200">
                    {selectedCount}/{t.members.length} selected
                  </span>
                  <Button size="sm" onClick={() => deploy(t)}>
                    {t.status === "Available" ? "Deploy team" : "Manage"}
                  </Button>
                </div>
              </div>

              <div className="mt-4 grid gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-900/5 sm:grid-cols-2">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 ring-1 ring-slate-900/5">
                    <Brain size={16} />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-700">Faculty Advisor</p>
                    <p className="text-sm font-bold text-slate-800">{t.facultyAdvisor}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-sky-600 ring-1 ring-slate-900/5">
                    <MessageSquare size={16} />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-700">Roster</p>
                    <ul className="space-y-0.5 text-xs font-semibold text-slate-700">
                      {t.students.slice(0, 3).map((s) => (
                        <li key={s}>• {s}</li>
                      ))}
                      {t.students.length > 3 && (
                        <li className="text-slate-700">+ {t.students.length - 3} more…</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-xs font-bold uppercase tracking-wide text-slate-700">
                Select members for the mission
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {t.members.map((m) => (
                  <MemberCard
                    key={m.id}
                    member={m}
                    onToggle={() => toggleMember(t.id, m.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MemberCard({ member, onToggle }: { member: TeamMember; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex items-center gap-2.5 rounded-2xl p-2.5 text-left ring-1 transition",
        member.selected
          ? "bg-white shadow-md ring-primary-300"
          : "bg-slate-50 ring-slate-900/5 hover:bg-white hover:shadow-sm",
      )}
    >
      <div className="relative shrink-0">
        <Avatar name={member.name} size="sm" />
        {member.selected && (
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-primary-500" />
        )}
      </div>
      <div className="min-w-0">
        <p className="flex items-center gap-1 truncate text-xs font-bold text-slate-800">
          <UserRound size={10} className="shrink-0 text-slate-700" />
          {member.name}
        </p>
        <p className="truncate text-[10px] font-medium text-slate-700">{member.role}</p>
      </div>
    </button>
  );
}
