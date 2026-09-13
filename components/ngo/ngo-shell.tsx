
"use client";

import { LayoutDashboard, Users, IndianRupee, MapPin } from "lucide-react";
import { PortalAppShell } from "@/components/portal/app-shell";

const NAV_ITEMS = [
  { href: "/ngo", label: "Overview", icon: LayoutDashboard },
  { href: "/ngo/volunteers", label: "Volunteers", icon: Users },
];

const MOBILE_NAV = [
  { href: "/ngo", label: "Home", icon: LayoutDashboard },
  { href: "/ngo/volunteers", label: "Volunteers", icon: Users },
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
        user: { name: "Aditi Sharma", location: "Green Earth NGO" },
        headerRight: (
          <div className="hidden rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 sm:flex sm:items-center sm:gap-1">
            Hi, Aditi <IndianRupee size={12} className="text-amber-600" />
          </div>
        ),
      }}
    >
      {children}
    </PortalAppShell>
  );
}

