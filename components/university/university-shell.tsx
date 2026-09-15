"use client";

import Link from "next/link";
import {
  Bot,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Leaf,
  Share2,
  UserCheck,
  Users,
} from "lucide-react";

import { PortalAppShell } from "@/components/portal/app-shell";
import { UNIVERSITY_USER } from "@/lib/data/university-mock";

const NAV_ITEMS = [
  { href: "/university", label: "Overview", icon: LayoutDashboard },
  { href: "/university/analytics", label: "AI Analytics", icon: Bot },
  { href: "/university/assign", label: "Assign Teams", icon: GraduationCap },
  { href: "/university/team", label: "My Teams", icon: Users },
  { href: "/university/reports", label: "Civic Projects", icon: ClipboardList },
  { href: "/university/community", label: "Case Studies", icon: Share2 },
  { href: "/university/profile", label: "Profile", icon: UserCheck },
];

const MOBILE_NAV = [
  { href: "/university", label: "Home", icon: LayoutDashboard },
  { href: "/university/analytics", label: "AI", icon: Bot },
  { href: "/university/assign", label: "Assign", icon: GraduationCap },
  { href: "/university/reports", label: "Projects", icon: ClipboardList },
  { href: "/university/profile", label: "Profile", icon: UserCheck },
];

export function UniversityShell({ children }: { children: React.ReactNode }) {
  return (
    <PortalAppShell
      config={{
        indexHref: "/university",
        storageKey: "samadhan.university",
        roleLabel: "IIT Jodhpur",
        sidebarWidth: "w-64",
        navItems: NAV_ITEMS,
        mobileNav: MOBILE_NAV,
        sidebarPromo: () => (
          <div className="mb-4 rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-800 px-3 py-3 text-white">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-100/80">
              AI Matchmaker
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-emerald-50">
              <Bot size={13} /> Suggesting student teams for issues
            </p>
          </div>
        ),
        mark: {
          tileClass: "from-emerald-600 to-teal-800",
          icon: <GraduationCap size={16} />,
          title: "University Portal",
          subtitle: "Civic Engagement Workspace",
        },
        user: { name: UNIVERSITY_USER.name, location: UNIVERSITY_USER.location },
        headerRight: (
          <Link
            href="/university/profile"
            className="flex items-center gap-1.5 rounded-xl bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 text-xs font-bold text-emerald-900 transition hover:bg-emerald-100"
          >
            <span>Prof. Mehta</span>
            <Leaf size={12} className="text-emerald-700" />
          </Link>
        ),
      }}
    >
      {children}
    </PortalAppShell>
  );
}
