"use client";

import { useState } from "react";
import { Mail, Plus, Search, UserRound, UserRoundPlus } from "lucide-react";

import { CompanyDepartmentTag } from "@/components/portal/badges";
import { PortalPageHeader } from "@/components/portal/kpi-card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/stat-card";
import { cn } from "@/lib/utils";
import { COMPANY_EMPLOYEES } from "@/lib/data/company-mock";

const ROLES = [
  { id: "all", label: "All" },
  { id: "field", label: "Field Officers" },
  { id: "tech", label: "Technicians" },
  { id: "analytics", label: "Analytics" },
];

const WORKLOAD_BAR: Record<string, string> = {
  shipped: "bg-emerald-500",
  polling: "bg-amber-400",
  typos: "bg-rose-400",
};

export function CompanyEmployeesPage() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [invites, setInvites] = useState<string[]>([]);

  const filtered = COMPANY_EMPLOYEES.filter((e) => {
    if (role === "field" && !/officer|lead/i.test(e.role)) return false;
    if (role === "tech" && !/technician|electrician|squad/i.test(e.role)) return false;
    if (role === "analytics" && e.dept !== "Analytics") return false;
    if (query && !(e.name + e.role + e.dept).toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const sendInvite = () => {
    if (!inviteEmail.trim()) return;
    setInvites((p) => [inviteEmail.trim(), ...p]);
    setInviteEmail("");
    setShowInvite(false);
  };

  const avgWorkload = Math.round(
    COMPANY_EMPLOYEES.reduce((a, e) => a + e.workload, 0) / COMPANY_EMPLOYEES.length,
  );

  return (
    <div className="mx-auto max-w-4xl space-y-4 pb-6">
      <PortalPageHeader
        icon={<UserRound size={20} />}
        iconBg="bg-gradient-to-br from-teal-500 to-emerald-700 text-white shadow-md shadow-teal-500/20"
        title="Team members"
        subtitle={`${COMPANY_EMPLOYEES.length} members · avg workload ${avgWorkload}`}
        action={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 shadow-sm ring-1 ring-slate-900/5 backdrop-blur focus-within:ring-2 focus-within:ring-primary-500">
              <Search size={15} className="text-slate-600" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="w-32 bg-transparent text-sm outline-none placeholder:text-slate-500 sm:w-44"
              />
            </div>
            <Button onClick={() => setShowInvite((v) => !v)}>
              <Plus size={15} /> <span className="hidden sm:inline">Invite</span>
            </Button>
          </div>
        }
      />

      {showInvite && (
        <div className="glass flex flex-col gap-2 rounded-2xl p-4 shadow-lg shadow-slate-900/5 ring-1 ring-white/60 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3">
            <Mail size={15} className="text-slate-600" />
            <input
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendInvite()}
              placeholder="colleague@municipalcorp.gov.in"
              className="w-full py-2.5 text-sm outline-none"
            />
          </div>
          <Button onClick={sendInvite} disabled={!inviteEmail.trim()} variant="dark">
            <UserRoundPlus size={15} /> Send invite
          </Button>
        </div>
      )}

      {invites.length > 0 && (
        <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-primary-200">
          <p className="text-xs font-bold uppercase tracking-wide text-primary-600 text-start">
            Pending invites ({invites.length})
          </p>
          <div className="mt-2 space-y-1.5">
            {invites.map((email) => (
              <div key={email} className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> {email}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {ROLES.map((r) => (
          <button
            key={r.id}
            onClick={() => setRole(r.id)}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition",
              role === r.id
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50",
            )}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((emp) => (
          <div key={emp.id} className="glass rounded-2xl p-4 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold",
                  emp.active ? "bg-primary-50 text-primary-600" : "bg-slate-100 text-slate-600",
                )}
              >
                {emp.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-bold text-slate-900">{emp.name}</p>
                  <span
                    className={cn(
                      "flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold",
                      emp.active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-600",
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full", emp.active ? "bg-emerald-500" : "bg-slate-300")} />
                    {emp.active ? "Active" : "Offline"}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-600">
                  {emp.role} · {emp.id}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <CompanyDepartmentTag department={emp.dept} />
                  <span className="text-[11px] font-semibold text-slate-500">
                    {emp.workload} active tasks
                  </span>
                </div>
                <div className="mt-2.5">
                  <ProgressBar
                    value={Math.min(100, emp.workload * 10)}
                    className={cn("bg-slate-100", WORKLOAD_BAR[emp.workload >= 8 ? "typos" : emp.workload >= 5 ? "polling" : "shipped"])}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}