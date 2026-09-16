"use client";

import Link from "next/link";
import {
  BarChart3,
  Bell,
  BrainCircuit,
  ClipboardList,
  FileBarChart,
  HeartPulse,
  LayoutDashboard,
  ListChecks,
  Settings,
  UserCheck,
  Users,
} from "lucide-react";

import { PortalAppShell } from "@/components/portal/app-shell";
import { NotificationBell } from "@/components/portal/notification-bell";
import { COMPANY_USER } from "@/lib/data/company-mock";

const NAV_ITEMS = [
  { href: "/funder", label: "Dashboard", icon: LayoutDashboard },
  { href: "/funder/issues", label: "Issues", icon: ClipboardList },
  { href: "/funder/insights", label: "AI Insights", icon: BrainCircuit },
  { href: "/funder/employees", label: "Employees", icon: Users },
  { href: "/funder/assignments", label: "Assignments", icon: ListChecks },
  { href: "/funder/notifications", label: "Notifications", icon: Bell },
  { href: "/funder/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/funder/reports", label: "Reports", icon: FileBarChart },
  { href: "/funder/profile", label: "Profile", icon: UserCheck },
  { href: "/funder/settings", label: "Settings", icon: Settings },
];

const MOBILE_NAV = [
  { href: "/funder", label: "Home", icon: LayoutDashboard },
  { href: "/funder/issues", label: "Issues", icon: ClipboardList },
  { href: "/funder/insights", label: "AI", icon: BrainCircuit },
  { href: "/funder/assignments", label: "Tasks", icon: ListChecks },
  { href: "/funder/profile", label: "Profile", icon: UserCheck },
];

export function FunderShell({ children }: { children: React.ReactNode }) {
  return (
    <PortalAppShell
      config={{
        indexHref: "/funder",
        storageKey: "samadhan.company",
        roleLabel: "Municipal Corp",
        sidebarWidth: "w-60",
        navItems: NAV_ITEMS,
        mobileNav: MOBILE_NAV,
        mark: {
          tileClass: "from-slate-900 to-emerald-800",
          icon: <HeartPulse size={18} />,
          title: COMPANY_USER.company,
          subtitle: "Enterprise · Growth Plan",
        },
        user: { name: COMPANY_USER.name, title: COMPANY_USER.title },
        headerRight: (
          <div className="flex items-center gap-2">
            <NotificationBell href="/funder/notifications" />
            <Link
              href="/funder/profile"
              className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-800 transition hover:bg-slate-200"
            >
              <span>{COMPANY_USER.name}</span>
              <UserCheck size={14} className="text-emerald-700" />
            </Link>
          </div>
        ),
      }}
    >
      {children}
    </PortalAppShell>
  );
}
