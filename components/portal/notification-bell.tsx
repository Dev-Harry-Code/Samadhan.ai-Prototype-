"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";

import { useNotificationPoll } from "@/lib/use-notification-poll";

export function NotificationBell({
  href,
  pollMs = 5000,
}: {
  href: string;
  pollMs?: number;
}) {
  const { unread, refresh } = useNotificationPoll(pollMs);
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={href}
      aria-label="Notifications"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={refresh}
      className="relative grid h-9 w-9 place-items-center rounded-xl text-slate-700 ring-1 ring-slate-900/5 transition hover:bg-slate-100"
    >
      <Bell size={19} />
      {unread > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-black text-white shadow-sm">
          {unread > 9 ? "9+" : unread}
        </span>
      )}
      {hover && unread === 0 && (
        <span className="absolute -top-8 right-0 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-[10px] font-semibold text-white shadow-md">
          You&apos;re all caught up
        </span>
      )}
    </Link>
  );
}