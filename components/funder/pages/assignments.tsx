"use client";

import { useState } from "react";
import { AlertTriangle, CalendarDays, Flag, ListChecks, Plus, User, Wrench } from "lucide-react";

import { CompanySeverityBadge, CompanyStatusBadge } from "@/components/portal/badges";
import { PortalPageHeader } from "@/components/portal/kpi-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { COMPANY_ASSIGNMENTS, COMPANY_EMPLOYEES } from "@/lib/data/company-mock";

const dueColor = (due: string) => {
  if (due === "Today") return "text-rose-500";
  if (due === "Tomorrow") return "text-amber-600";
  return "text-slate-700";
};

export function CompanyAssignmentsPage() {
  const [openTitles, setOpenTitles] = useState<string[]>(COMPANY_ASSIGNMENTS.map((a) => a.id));
  const [bonus, setBonus] = useState<string[]>([]);

  const assignments = [
    ...COMPANY_ASSIGNMENTS,
    ...bonus.map((title) => ({
      id: `AS-2026-${String(1060 + bonus.indexOf(title)).padStart(4, "0")}`,
      title,
      assignee: "Unassigned",
      status: "open" as const,
      priority: "Medium" as const,
      due: "Assign now",
    })),
  ];

  const toggle = (id: string) =>
    setOpenTitles((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const toggleRight = (title: string) =>
    setBonus((p) => (p.includes(title) ? p : [...p, title]));

  const stats = [
    { label: "Active", value: COMPANY_ASSIGNMENTS.filter((a) => a.status === "in_progress").length, tone: "bg-indigo-500" },
    { label: "Due today", value: COMPANY_ASSIGNMENTS.filter((a) => a.due === "Today").length, tone: "bg-rose-500" },
    { label: "Unassigned", value: COMPANY_ASSIGNMENTS.filter((a) => a.assignee === "Unassigned").length, tone: "bg-amber-500" },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-4 pb-6">
      <PortalPageHeader
        icon={<ListChecks size={20} />}
        iconBg="bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/20"
        title="Assignments"
        subtitle="Track task distribution across teams"
        action={
          <Button>
            <Plus size={15} /> New assignment
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-2xl p-4 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
            <div className={cn("mb-1.5 h-1.5 w-8 rounded-full", s.tone)} />
            <div className="text-xl font-extrabold text-slate-900">{s.value}</div>
            <div className="text-[11px] font-semibold text-slate-700">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-2">
        {assignments.map((a) => {
          const open = openTitles.includes(a.id);
          const assignee = COMPANY_EMPLOYEES.find((e) => e.name === a.assignee);
          return (
            <div
              key={a.id}
              className={cn(
                "glass rounded-2xl shadow-lg shadow-slate-900/5 ring-1 ring-white/60 transition",
                a.priority === "Critical" && "ring-2 ring-red-200",
              )}
            >
              <button
                onClick={() => toggle(a.id)}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm",
                    a.status === "in_progress" ? "bg-indigo-50" : "bg-slate-100",
                  )}
                >
                  {a.priority === "Critical" ? (
                    <AlertTriangle size={16} className="text-rose-500" />
                  ) : (
                    <Wrench size={16} className="text-slate-700" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-900">{a.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    <CompanyStatusBadge status={a.status} />
                    <CompanySeverityBadge severity={a.priority} />
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-700">
                      <CalendarDays size={11} /> <span className={dueColor(a.due)}>{a.due}</span>
                    </span>
                  </div>
                </div>
                <span className={cn("text-slate-700 transition", open && "rotate-180")}>▾</span>
              </button>

              {open && (
                <div className="border-t border-slate-900/5 p-4">
                  {a.assignee === "Unassigned" ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-amber-600">Not assigned yet →</span>
                      {COMPANY_EMPLOYEES.slice(0, 4)
                        .map((e) => (
                          <button
                            key={e.id}
                            onClick={() => toggleRight(a.title)}
                            className="flex items-center gap-1.5 rounded-full bg-white py-1 pl-1 pr-3 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-900/5 transition hover:ring-primary-300"
                          >
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-50 text-[9px] font-bold text-primary-600">
                              {e.avatar}
                            </span>
                            {e.name}
                          </button>
                        ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-900/5">
                        <span
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-50 text-[10px] font-bold text-primary-600"
                        >
                          {assignee?.avatar ?? a.assignee.slice(0, 2).toUpperCase()}
                        </span>
                        <span className="text-xs font-semibold text-slate-700">{a.assignee}</span>
                      </div>
                      <span className="flex items-center gap-1 text-[11px] font-medium text-slate-700">
                        <Flag size={11} className="text-primary-500" /> SOW task · auto-tracked
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="glass rounded-3xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
        <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
          <User size={15} className="text-amber-500" /> Team workload balance
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {COMPANY_EMPLOYEES.slice(0, 4).map((e) => {
            const activeTasks = COMPANY_ASSIGNMENTS.filter((a) => a.assignee === e.name).length;
            return (
              <div key={e.id} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-900/5">
                <div>
                  <p className="text-sm font-bold text-slate-900">{e.name}</p>
                  <p className="text-[11px] font-medium text-slate-700">{e.role}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                  {activeTasks}/{e.workload} tasks
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
