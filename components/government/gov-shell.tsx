"use client";

import Link from "next/link";
import { Landmark, UserCheck } from "lucide-react";

import { PortalAppShell } from "@/components/portal/app-shell";
import { NotificationBell } from "@/components/portal/notification-bell";

const NAV_ITEMS = [
  { href: "/government", label: "District Dashboard", icon: Landmark },
];

const MOBILE_NAV = [
  { href: "/government", label: "Dashboard", icon: Landmark },
];

export function GovernmentShell({ children }: { children: React.ReactNode }) {
  return (
    <PortalAppShell
      config={{
        indexHref: "/government",
        storageKey: "samadhan.government",
        roleLabel: "District Collector",
        sidebarWidth: "w-60",
        navItems: NAV_ITEMS,
        mobileNav: MOBILE_NAV,
        mark: {
          tileClass: "from-sky-700 to-indigo-800",
          icon: <Landmark size={16} />,
          title: "Government Command Center",
          subtitle: "District Civic Operations",
        },
        user: { name: "District Admin", title: "District Collector Office" },
        headerRight: (
          <div className="flex items-center gap-2">
            <NotificationBell href="/government" />
            <Link
              href="/government"
              className="flex items-center gap-1.5 rounded-xl bg-sky-50 border border-sky-200/80 px-3 py-1.5 text-xs font-bold text-sky-900 transition hover:bg-sky-100"
            >
              <span>Admin</span>
              <UserCheck size={14} className="text-sky-700" />
            </Link>
          </div>
        ),
      }}
    >
      {children}
    </PortalAppShell>
  );
}