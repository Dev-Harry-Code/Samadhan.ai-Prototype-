"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Bell, BrainCircuit, CheckCheck, Megaphone, PartyPopper } from "lucide-react";
import { PortalPageHeader } from "@/components/portal/kpi-card";
import { cn } from "@/lib/utils";
import { useApiGet } from "@/lib/api/client";
import { markAllNotificationsRead, markNotificationRead } from "@/lib/api-hooks";
import { COMPANY_NOTIFICATIONS, type CompanyNotification } from "@/lib/data/company-mock";

type ApiNotification = {
  id: string;
  type: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
};

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

const mapNotification = (n: ApiNotification): CompanyNotification => ({
  id: n.id,
  type: (["alert", "ai", "sponsor", "done", "system"].includes(n.type) ? n.type : "system") as CompanyNotification["type"],
  title: n.title,
  detail: n.body,
  time: timeAgoLabel(n.createdAt),
  read: n.read,
  urgent: n.type === "alert",
});

function timeAgoLabel(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.max(1, Math.floor(diff / 60000));
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? "" : "s"} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export function CompanyNotificationsPage() {
  const { data, loading } = useApiGet<{ notifications: ApiNotification[] }>("/api/notifications");
  const [readOverrides, setReadOverrides] = useState<Record<string, boolean>>({});
  const [hidden, setHidden] = useState<string[]>([]);

  const items = useMemo(() => {
    const mapped = data?.notifications?.length
      ? data.notifications.map(mapNotification)
      : COMPANY_NOTIFICATIONS;
    return mapped.filter((n) => !hidden.includes(n.id));
  }, [data, hidden]);

  const isRead = (id: string, baseRead: boolean) =>
    readOverrides[id] ?? baseRead;

  const unread = items.filter((n) => !isRead(n.id, n.read)).length;

  const markAll = () => {
    const next: Record<string, boolean> = { ...readOverrides };
    for (const n of items) next[n.id] = true;
    setReadOverrides(next);
    void markAllNotificationsRead();
  };

  const clear = () => setHidden(items.filter((n) => isRead(n.id, n.read)).map((n) => n.id));

  const toggle = (n: { id: string; read: boolean }) => {
    const next = { ...readOverrides, [n.id]: !isRead(n.id, n.read) };
    setReadOverrides(next);
    if (!isRead(n.id, n.read)) void markNotificationRead(n.id);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4 pb-6">
      <PortalPageHeader
        icon={<Bell size={20} />}
        iconBg="bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20"
        title="Notifications"
        subtitle={`${unread} unread${loading ? " · syncing" : ""}`}
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
          const isReadFlag = isRead(n.id, n.read);
          return (
            <div
              key={n.id}
              className={cn(
                "glass flex items-start gap-3 rounded-2xl p-4 shadow-lg shadow-slate-900/5 ring-1 ring-white/60 transition",
                !isReadFlag && "bg-white/90 ring-2 ring-primary-200",
              )}
            >
              <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1", meta.tone)}>
                {meta.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className={cn("text-sm font-bold text-slate-900", isReadFlag && "text-slate-700")}>
                    {n.title}
                    {!isReadFlag && n.urgent && (
                      <span className="ml-2 rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-bold text-red-600 ring-1 ring-red-200">
                        URGENT
                      </span>
                    )}
                  </p>
                  <span className="shrink-0 text-[10px] font-semibold text-slate-700">{n.time}</span>
                </div>
                <p className={cn("mt-0.5 text-xs leading-relaxed text-slate-700", isReadFlag && "text-slate-700")}>
                  {n.detail}
                </p>
                <span className={cn("mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ring-1", meta.tone)}>
                  {meta.label}
                </span>
              </div>
              <button
                onClick={() => toggle(n)}
                className={cn(
                  "h-4 w-4 shrink-0 rounded-full border-2 transition",
                  !isReadFlag ? "border-primary-500 bg-primary-500" : "border-slate-300",
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}