"use client";

import Link from "next/link";
import {
  Award,
  Calendar,
  IndianRupee,
  LayoutDashboard,
  Sparkles,
  UserCheck,
  Users,
} from "lucide-react";
import { PortalAppShell } from "@/components/portal/app-shell";

const NAV_ITEMS = [
  { href: "/ngo", label: "Overview", icon: LayoutDashboard },
  { href: "/ngo/drives", label: "Field Drives", icon: Calendar },
  { href: "/ngo/volunteers", label: "Volunteers", icon: Users },
  { href: "/ngo/funding", label: "CSR Grants", icon: IndianRupee },
  { href: "/ngo/impact", label: "Impact Gallery", icon: Award },
  { href: "/ngo/profile", label: "NGO Profile", icon: UserCheck },
];

const MOBILE_NAV = [
  { href: "/ngo", label: "Home", icon: LayoutDashboard },
  { href: "/ngo/drives", label: "Drives", icon: Calendar },
  { href: "/ngo/volunteers", label: "Volunteers", icon: Users },
  { href: "/ngo/funding", label: "Grants", icon: IndianRupee },
  { href: "/ngo/profile", label: "Profile", icon: UserCheck },
];

export function NgoShell({ children }: { children: React.ReactNode }) {
  return (
    <PortalAppShell
      config={{
        indexHref: "/ngo",
        storageKey: "samadhan.ngo",
        roleLabel: "NGO Partner",
        sidebarWidth: "w-64",
        navItems: NAV_ITEMS,
        mobileNav: MOBILE_NAV,
        mark: {
          tileClass: "from-amber-500 to-orange-600",
          icon: <Users size={16} />,
          title: "NGO Workspace",
          subtitle: "Resource & Volunteer Management",
        },
        user: { name: "Aditi Sharma", location: "Jodhpur Seva Foundation" },
        headerRight: (
          <Link
            href="/ngo/profile"
            className="flex items-center gap-1.5 rounded-xl bg-amber-50 border border-amber-200/80 px-3 py-1.5 text-xs font-bold text-amber-900 transition hover:bg-amber-100"
          >
            <span>Hi, Aditi</span>
            <UserCheck size={14} className="text-amber-700" />
          </Link>
        ),
      }}
    >
      {children}
    </PortalAppShell>
  );
}
