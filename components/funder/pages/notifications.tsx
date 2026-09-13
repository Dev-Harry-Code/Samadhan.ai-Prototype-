"use client";

import { useState } from "react";
import { AlertTriangle, Bell, BrainCircuit, CheckCheck, Megaphone, PartyPopper } from "lucide-react";
import { PortalPageHeader } from "@/components/portal/kpi-card";
import { cn } from "@/lib/utils";
import { COMPANY_NOTIFICATIONS } from "@/lib/data/company-mock";

const TYPE_META: Record<
  string,
  { icon: React.ReactNode; tone: string; label: string }
> = {
  alert: { icon: <AlertTriangle size={15} />, tone: "bg-red-50 text-red-600 ring-red-200", label: "Urgent" },
  ai: { icon: <BrainCircuit size={15} />, tone: "bg-violet-50 text-violet-600 ring-violet-200", label: "AI" },
  sponsor: { icon: <Megaphone size={15} />, tone: "bg-amber-50 text-amber-600 ring-amber-200", label: "CSR" },
  done: { icon: <PartyPopper size={15} />, tone: "bg-emerald-50 text-emerald-600 ring-emerald-200", label: "Done" },
  system: { icon: <Bell size={15} />, tone: "bg-slate-100 text-slate-700 ring-slate-200", label: "System" },
};

export function CompanyNotificationsPage() {
  const [read, setRead] = useState<string[]>(
    COMPANY_NOTIFICATIONS.filter((n) => n.read).map((n) => n.id),
  );
  const [items, setItems] = useState(COMPANY_NOTIFICATIONS);

  const unread = items.filter((n) => !read.includes(n.id)).length;

  const markAll = () => setRead(items.map((n) => n.id));

  const clear = () => setItems(items.filter((n) => !read.includes(n.id)));

  return (
    <div className="mx-auto max-w-2xl space-y-4 pb-6">
      <PortalPageHeader
        icon={<Bell size={20} />}
        iconBg="bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20"
        title="Notifications"
        subtitle={`${unread} unread`}
        action={
          <div className="flex gap-2">
            <button
              onClick={markAll}
              className="flex items-center gap-1.5 rounded-xl bg-white/80 px-3 py-2 text-xs font-bold text-slate-700 shadow-sm ring-1 ring-slate-900/5 backdrop-blur transition hover:text-primary-600"
            >
              <CheckCheck size={14} /> Mark all read
            </button>
            <button
              onClick={clear}
              className="rounded-xl bg-white/80 px-3 py-2 text-xs font-bold text-rose-500 shadow-sm ring-1 ring-slate-900/5 backdrop-blur transition hover:bg-rose-50"
            >
              Clear read
            </button>
          </div>
        }
      />

      <div className="grid gap-2">
        {items.map((n) => {
          const meta = TYPE_META[n.type];
          const isRead = read.includes(n.id);
          return (
            <div
              key={n.id}
              className={cn(
                "glass flex items-start gap-3 rounded-2xl p-4 shadow-lg shadow-slate-900/5 ring-1 ring-white/60 transition",
                !isRead && "bg-white/90 ring-2 ring-primary-200",
              )}
            >
              <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1", meta.tone)}>
                {meta.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className={cn("text-sm font-bold text-slate-900", isRead && "text-slate-700")}>
                    {n.title}
                    {!isRead && n.urgent && (
                      <span className="ml-2 rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-bold text-red-600 ring-1 ring-red-200">
                        URGENT
                      </span>
                    )}
                  </p>
                  <span className="shrink-0 text-[10px] font-semibold text-slate-700">{n.time}</span>
                </div>
                <p className={cn("mt-0.5 text-xs leading-relaxed text-slate-700", isRead && "text-slate-700")}>
                  {n.detail}
                </p>
                <span className={cn("mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ring-1", meta.tone)}>
                  {meta.label}
                </span>
              </div>
              <button
                onClick={() =>
                  setRead((p) => (p.includes(n.id) ? p.filter((x) => x !== n.id) : [...p, n.id]))
                }
                className={cn(
                  "h-4 w-4 shrink-0 rounded-full border-2 transition",
                  !isRead ? "border-primary-500 bg-primary-500" : "border-slate-300",
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
