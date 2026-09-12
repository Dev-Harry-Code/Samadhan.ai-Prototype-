"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  CheckCheck,
  Megaphone,
  MessageSquare,
  ThumbsUp,
  X,
  Zap,
} from "lucide-react";

import type { CitizenNotification, NotificationType } from "@/lib/akshat-types";
import { cn } from "@/lib/utils";
import { useAkshat } from "@/components/akshat/akshat-context";
import { notifField } from "@/components/akshat/localize-helpers";

const TYPE_META: Record<
  NotificationType,
  { icon: React.ReactNode; cls: string }
> = {
  update: { icon: <Bell size={15} />, cls: "bg-teal-50 text-teal-600" },
  ai: { icon: <Zap size={15} />, cls: "bg-violet-50 text-violet-600" },
  resolution: { icon: <ThumbsUp size={15} />, cls: "bg-emerald-50 text-emerald-600" },
  volunteer: { icon: <MessageSquare size={15} />, cls: "bg-sky-50 text-sky-600" },
  system: { icon: <Megaphone size={15} />, cls: "bg-amber-50 text-amber-600" },
};

interface NotificationPanelProps {
  open: boolean;
  notifications: CitizenNotification[];
  readIds: string[];
  onClose: () => void;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}

export function NotificationPanel({
  open,
  notifications,
  readIds,
  onClose,
  onMarkRead,
  onMarkAllRead,
}: NotificationPanelProps) {
  const { t } = useAkshat();
  const unread = notifications.filter((n) => !readIds.includes(n.id)).length;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-sm flex-col border-l border-slate-200 bg-white shadow-2xl"
            role="dialog"
            aria-label={t("notificationsTitle", "Notifications")}
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-5 py-4">
              <div className="flex min-w-0 items-center gap-2">
                <Bell className="h-4 w-4 shrink-0 text-teal-600" />
                <h3 className="whitespace-nowrap text-sm font-extrabold text-slate-900">{t("notificationsTitle", "Notifications")}</h3>
                {unread > 0 && (
                  <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    {unread} {t("newLabel", "new")}
                  </span>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  onClick={onMarkAllRead}
                  className="whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-bold text-teal-700 transition hover:bg-teal-50"
                >
                  {t("markAllRead", "Mark all read")}
                </button>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Close notifications"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-2">
              {notifications.length === 0 && (
                <p className="px-3 py-8 text-center text-xs text-slate-600">{t("noNotifications", "No notifications yet")}</p>
              )}
              {notifications.map((n) => {
                const meta = TYPE_META[n.type];
                const isUnread = !readIds.includes(n.id);
                return (
                  <button
                    key={n.id}
                    onClick={() => onMarkRead(n.id)}
                    className={cn(
                      "mb-1.5 flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition",
                      isUnread
                        ? "border-teal-100 bg-teal-50/50 hover:bg-teal-50"
                        : "border-slate-100 bg-white hover:bg-slate-50",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-xl",
                        meta.cls,
                      )}
                    >
                      {meta.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span
                          className={cn(
                            "truncate text-xs font-bold",
                            isUnread ? "text-slate-900" : "text-slate-600",
                          )}
                        >
                          {notifField(t, n.id, "title", n.title)}
                        </span>
                        {isUnread && <span className="h-2 w-2 shrink-0 rounded-full bg-teal-500" />}
                      </span>
                      <span className="mt-0.5 block line-clamp-2 text-[11px] leading-relaxed text-slate-500">
                        {notifField(t, n.id, "body", n.body)}
                      </span>
                      <span className="mt-1 block text-[10px] font-semibold text-slate-600">
                        {notifField(t, n.id, "timeAgo", n.timeAgo)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-slate-100 px-5 py-3">
              <span className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-600">
                <CheckCheck className="h-3.5 w-3.5" />
                {t("notificationsFooter", "Stay updated on issues you care about")}
              </span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}