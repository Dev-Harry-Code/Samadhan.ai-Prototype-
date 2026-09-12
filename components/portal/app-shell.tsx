"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, MapPin, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { SamadhanLogoIcon } from "@/components/akshat/common/samadhan-logo";
import { CivicBackground } from "@/components/akshat/common/civic-background";

export interface PortalNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface PortalShellConfig {
  indexHref: string;
  storageKey: string;
  roleLabel: string;
  navItems: PortalNavItem[];
  mobileNav: PortalNavItem[];
  sidebarWidth?: "w-60" | "w-64";
  sidebarPromo?: () => ReactNode;
  mark: {
    tileClass: string;
    icon: ReactNode;
    title: string;
    subtitle: string;
  };
  user: {
    name: string;
    title?: string;
    location?: string;
  };
  headerRight?: ReactNode;
}

export function PortalAppShell({
  config,
  children,
}: {
  config: PortalShellConfig;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { indexHref, storageKey } = config;

  const isActive = (href: string) =>
    href === indexHref ? pathname === indexHref : pathname.startsWith(href);

  const logOut = () => {
    try {
      window.sessionStorage.removeItem(storageKey);
    } catch {
      /* storage unavailable */
    }
    router.replace("/login");
  };

  return (
    <div className="relative min-h-screen font-sans">
      <CivicBackground />

      <div className="relative z-10 flex min-h-screen">
        <aside
          className={cn(
            "sticky top-0 hidden h-screen flex-col border-r border-slate-200/60 bg-white/70 px-3 py-5 backdrop-blur-xl md:flex",
            config.sidebarWidth ?? "w-64",
          )}
        >
          <Link href={indexHref} className="mb-6 flex items-center gap-2 px-2">
            <SamadhanLogoIcon size={34} />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-black tracking-tight text-slate-900">
                Samadhan<span className="text-primary-600">.ai</span>
              </span>
              <span className="text-[10px] font-semibold text-teal-700">{config.roleLabel}</span>
            </div>
          </Link>

          {config.sidebarPromo?.()}

          <nav className="flex flex-1 flex-col gap-1">
            {config.navItems.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all",
                    active
                      ? "bg-primary-50 text-primary-700"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900",
                  )}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r bg-primary-500" />
                  )}
                  <Icon size={19} />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-2 flex flex-col gap-2 border-t border-slate-200/60 pt-3">
            <div className="flex items-center gap-2.5 rounded-xl px-2 py-1.5">
              <Avatar name={config.user.name} size="sm" />
              <div className="min-w-0 leading-tight">
                <p className="truncate text-xs font-bold text-slate-800">{config.user.name}</p>
                {config.user.title ? (
                  <p className="truncate text-[10px] font-medium text-slate-600">
                    {config.user.title}
                  </p>
                ) : config.user.location ? (
                  <p className="flex items-center gap-0.5 truncate text-[10px] font-medium text-slate-600">
                    <MapPin size={9} /> {config.user.location}
                  </p>
                ) : null}
              </div>
            </div>
            <button
              onClick={logOut}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-500 transition hover:bg-rose-50"
            >
              <LogOut size={19} />
              Log Out
            </button>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-slate-200/60 bg-white/80 px-4 py-3 backdrop-blur-xl md:px-8">
            <div className="flex items-center gap-2.5">
              <Link href={indexHref} className="flex items-center gap-2 md:hidden">
                <SamadhanLogoIcon size={30} />
                <span className="text-sm font-black tracking-tight text-slate-900">
                  Samadhan<span className="text-primary-600">.ai</span>
                </span>
              </Link>
              <div className="hidden items-center gap-2 md:flex">
                <div
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br text-white",
                    config.mark.tileClass,
                  )}
                >
                  {config.mark.icon}
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-extrabold text-slate-900">{config.mark.title}</div>
                  <div className="text-[11px] font-medium text-primary-600">
                    {config.mark.subtitle}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {config.headerRight}
              <Avatar name={config.user.name} size="sm" />
            </div>
          </header>

          <main className="flex-1 px-4 pb-24 pt-5 sm:px-6 md:px-8 md:pb-10">{children}</main>

          <nav
            className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/60 bg-white/90 backdrop-blur-xl md:hidden"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="mx-auto flex max-w-md items-center justify-around px-2 py-1.5">
              {config.mobileNav.map(({ href, label, icon: Icon }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-[10px] font-semibold transition-all",
                      active ? "text-primary-600" : "text-slate-600",
                    )}
                  >
                    <Icon size={21} strokeWidth={active ? 2.4 : 2} />
                    {label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}