"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { PortalPageHeader } from "@/components/portal/kpi-card";
import { NGO_VOLUNTEERS, type NgoVolunteer } from "@/lib/data/ngo-mock";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api/client";

export function NgoVolunteersPage() {
  const [volunteers, setVolunteers] = useState<NgoVolunteer[]>(NGO_VOLUNTEERS);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let cancelled = false;
    api
      .get<{ volunteers: NgoVolunteer[] }>("/api/ngo/volunteers")
      .then((res) => {
        if (!cancelled && res.volunteers?.length) setVolunteers(res.volunteers);
      })
      .catch(() => {
        if (!cancelled) setLoadError("Can't reach the live roster — showing cached snapshot.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-6">
      <PortalPageHeader
        icon={<Users size={20} />}
        iconBg="bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20"
        title="Volunteer Roster"
        subtitle={`${volunteers.length} on-ground volunteers${loading ? " · syncing" : ""}`}
      />

      {loadError && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-bold text-amber-800">
          {loadError}
        </div>
      )}

      {loading ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="glass animate-pulse rounded-2xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60"
            >
              <div className="h-4 w-2/3 rounded-full bg-slate-200" />
              <div className="mt-3 h-3 w-1/3 rounded-full bg-slate-200" />
              <div className="mt-4 flex flex-wrap gap-1.5">
                <div className="h-5 w-16 rounded-md bg-slate-200" />
                <div className="h-5 w-20 rounded-md bg-slate-200" />
                <div className="h-5 w-14 rounded-md bg-slate-200" />
              </div>
              <div className="mt-4 h-8 w-full rounded-xl bg-slate-200" />
            </div>
          ))}
        </div>
      ) : volunteers.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-10 text-center">
          <Users className="h-6 w-6 text-slate-400" />
          <p className="text-sm font-bold text-slate-700">No volunteers yet</p>
          <p className="text-xs text-slate-500">Volunteers will appear here once they join a field drive.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {volunteers.map((v) => (
          <div key={v.id} className="glass flex flex-col rounded-2xl p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/60">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">{v.name}</h3>
                <p className="text-xs font-medium text-slate-700">{v.hours} hrs contributed</p>
              </div>
              <span className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-bold",
                v.status === "Available" ? "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300" : "bg-blue-100 text-blue-800 ring-1 ring-blue-300"
              )}>
                {v.status}
              </span>
            </div>

            <div className="mt-4">
              <p className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Skills</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {v.skills.map(s => (
                  <span key={s} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-800 border border-slate-200">{s}</span>
                ))}
              </div>
            </div>

            {v.assignedDrive && (
              <p className="mt-3 rounded-lg bg-blue-50 px-2.5 py-1.5 text-[11px] font-medium text-blue-800 border border-blue-100">
                Assigned: {v.assignedDrive}
              </p>
            )}

            <button className="mt-4 w-full rounded-xl border border-slate-200 bg-white py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
              View Profile
            </button>
          </div>
        ))}
        </div>
      )}
    </div>
  );
}