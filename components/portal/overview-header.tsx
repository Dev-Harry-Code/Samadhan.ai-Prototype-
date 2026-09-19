"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, MapPin } from "lucide-react";

import { SamadhanLogoIcon } from "@/components/akshat/common/samadhan-logo";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/api/client";

export interface OverviewHeaderLink {
  href: string;
  label: string;
}

export function PortalOverviewHeader({
  role,
  location,
  storageKey,
  user,
  links,
  profileHref,
}: {
  role: string;
  location: string;
  storageKey: string;
  user: { name: string; avatar: string };
  links: OverviewHeaderLink[];
  profileHref?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const targetProfile =
    profileHref || links.find((l) => l.label.toLowerCase() === "profile")?.href;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const logout = () => {
    try {
      window.sessionStorage.removeItem(storageKey);
    } catch {
      /* storage unavailable */
    }
    void signOut();
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-40">
      {/* Mobile pill bar */}
      <div className="md:hidden">
        <div className="sticky top-2 z-40 flex flex-col items-center px-3 pt-2 gap-1.5">
          <div className="flex w-full max-w-md items-center justify-between gap-2 rounded-full bg-white/95 px-3 py-2 shadow-lg ring-1 ring-slate-900/10 backdrop-blur-xl">
            <Link href="/" className="flex min-w-0 items-center gap-2">
              <SamadhanLogoIcon size={28} />
              <span className="text-sm font-black tracking-tight text-slate-900">
                Samadhan<span className="text-teal-600">.ai</span>
              </span>
            </Link>
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="max-w-24 truncate rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-700 ring-1 ring-teal-200">
                {role}
              </span>
              {targetProfile ? (
                <Link href={targetProfile} title="View Profile" className="transition hover:opacity-80">
                  <Avatar name={user.avatar} size="sm" />
                </Link>
              ) : (
                <Avatar name={user.avatar} size="sm" />
              )}
              <button
                onClick={logout}
                aria-label="Log out"
                className="grid h-8 w-8 place-items-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 transition hover:bg-rose-50 hover:text-rose-600"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
          {/* Mobile navigation strip */}
          <div className="flex w-full max-w-md items-center gap-1 overflow-x-auto rounded-full bg-white/90 p-1 shadow-sm ring-1 ring-slate-900/5 backdrop-blur-md scrollbar-none">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold transition",
                    active
                      ? "bg-teal-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop top bar */}
      <div className="hidden border-b border-slate-200/80 bg-white/90 shadow-xs backdrop-blur-xl md:block">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex shrink-0 items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <SamadhanLogoIcon size={36} />
              <div className="flex flex-col">
                <span className="text-lg font-black leading-none tracking-tight text-slate-900">
                  Samadhan<span className="text-teal-600">.ai</span>
                </span>
                <span className="mt-0.5 text-[9px] font-semibold leading-none tracking-tight text-teal-700">
                  {role}
                </span>
              </div>
            </Link>
            <div className="hidden items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 lg:flex">
              <MapPin className="h-3.5 w-3.5 text-teal-600" />
              <span>{location}</span>
            </div>
          </div>

          <nav className="flex min-w-0 flex-1 items-center justify-center gap-1.5 overflow-x-auto scrollbar-none px-3">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex-shrink-0 whitespace-nowrap rounded-xl px-3 py-1.5 text-[11px] font-bold transition-all lg:px-3.5 lg:text-xs",
                    active
                      ? "border border-teal-200 bg-teal-50 text-teal-700 shadow-xs"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/login"
              title="Switch Workspace / All Portals"
              className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 px-2.5 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-200 hover:text-slate-900"
            >
              <span>Switch Portal</span>
            </Link>
            {targetProfile ? (
              <Link
                href={targetProfile}
                title="View Profile"
                className="flex items-center gap-2 rounded-xl p-1 transition hover:bg-slate-100"
              >
                <span className="hidden text-xs font-semibold text-slate-700 xl:inline">{user.name}</span>
                <Avatar name={user.avatar} size="sm" />
              </Link>
            ) : (
              <>
                <span className="hidden text-xs font-semibold text-slate-700 xl:inline">{user.name}</span>
                <Avatar name={user.avatar} size="sm" />
              </>
            )}
            <button
              onClick={logout}
              aria-label="Log out"
              className="grid h-8 w-8 place-items-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 transition hover:bg-rose-50 hover:text-rose-600"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
