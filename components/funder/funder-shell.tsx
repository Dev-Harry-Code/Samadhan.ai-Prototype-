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
  Users,
} from "lucide-react";

import { PortalAppShell } from "@/components/portal/app-shell";
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
  { href: "/funder/settings", label: "Settings", icon: Settings },
];

const MOBILE_NAV = [
  { href: "/funder", label: "Home", icon: LayoutDashboard },
  { href: "/funder/issues", label: "Issues", icon: ClipboardList },
  { href: "/funder/insights", label: "AI", icon: BrainCircuit },
  { href: "/funder/assignments", label: "Tasks", icon: ListChecks },
  { href: "/funder/settings", label: "More", icon: Settings },
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
          <Link
            href="/funder/notifications"
            aria-label="Notifications"
            className="relative grid h-9 w-9 place-items-center rounded-xl text-slate-500 ring-1 ring-slate-900/5 transition hover:bg-slate-100"
          >
            <Bell size={19} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
          </Link>
        ),
      }}
    >
      {children}
    </PortalAppShell>
  );
}