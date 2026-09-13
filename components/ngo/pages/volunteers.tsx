
"use client";

import { Users } from "lucide-react";
import { PortalPageHeader } from "@/components/portal/kpi-card";
import { NGO_VOLUNTEERS } from "@/lib/data/ngo-mock";
import { cn } from "@/lib/utils";

export function NgoVolunteersPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-6">
      <PortalPageHeader
        icon={<Users size={20} />}
        iconBg="bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20"
        title="Volunteer Roster"
        subtitle="Manage and deploy your on-ground workforce"
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {NGO_VOLUNTEERS.map((v) => (
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

            <button className="mt-4 w-full rounded-xl border border-slate-200 bg-white py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

