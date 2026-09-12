"use client";

import {
  Bot,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Leaf,
  Share2,
  Users,
} from "lucide-react";

import { PortalAppShell } from "@/components/portal/app-shell";
import { UNIVERSITY_USER } from "@/lib/data/university-mock";

const NAV_ITEMS = [
  { href: "/university", label: "Overview", icon: LayoutDashboard },
  { href: "/university/assign", label: "Assign University", icon: GraduationCap },
  { href: "/university/team", label: "Team", icon: Users },
  { href: "/university/reports", label: "Reports", icon: ClipboardList },
  { href: "/university/community", label: "Community", icon: Share2 },
];

const MOBILE_NAV = [
  { href: "/university", label: "Home", icon: LayoutDashboard },
  { href: "/university/assign", label: "Assign", icon: GraduationCap },
  { href: "/university/reports", label: "Reports", icon: ClipboardList },
  { href: "/university/team", label: "Team", icon: Users },
  { href: "/university/community", label: "More", icon: Share2 },
];

export function UniversityShell({ children }: { children: React.ReactNode }) {
  return (
    <PortalAppShell
      config={{
        indexHref: "/university",
        storageKey: "samadhan.university",
        roleLabel: "PMMMC · Jodhpur",
        sidebarWidth: "w-64",
        navItems: NAV_ITEMS,
        mobileNav: MOBILE_NAV,
        sidebarPromo: () => (
          <div className="mb-4 rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-800 px-3 py-3 text-white">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-100/80">
              AI Assistant
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-emerald-50">
              <Bot size={13} /> Suggesting best university matches
            </p>
          </div>
        ),
        mark: {
          tileClass: "from-emerald-600 to-teal-800",
          icon: <GraduationCap size={16} />,
          title: "Municipal University Collaboration",
          subtitle: "Jodhpur · India",
        },
        user: { name: UNIVERSITY_USER.name, location: UNIVERSITY_USER.location },
        headerRight: (
          <div className="hidden rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 sm:flex sm:items-center sm:gap-1">
            {UNIVERSITY_USER.greeting.split(",")[0]}{" "}
            <Leaf size={12} className="text-emerald-600" />
          </div>
        ),
      }}
    >
      {children}
    </PortalAppShell>
  );
}