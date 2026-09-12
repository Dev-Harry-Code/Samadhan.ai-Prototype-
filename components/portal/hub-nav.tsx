"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

export interface HubNavItem {
  href: string;
  label: string;
}

export function HubNav({
  items,
  activeHref,
  live = true,
}: {
  items: HubNavItem[];
  activeHref: string;
  live?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm sm:gap-x-3 sm:p-2">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
        <span className="mr-1 hidden text-xs font-bold text-slate-900 md:inline">
          Samadhan Hub
        </span>

        {items.map((it) => {
          const active = it.href === activeHref;
          return (
            <Link
              key={it.href}
              href={it.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex-shrink-0 whitespace-nowrap rounded-xl px-3 py-1.5 text-[11px] font-semibold transition-all sm:px-3.5 sm:text-xs",
                active
                  ? "bg-teal-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              )}
            >
              {it.label}
            </Link>
          );
        })}
      </div>

      {live && (
        <div className="ml-auto flex flex-shrink-0 items-center">
          <span className="flex items-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50 px-2 py-1 font-mono text-[10px] font-semibold text-teal-700 sm:text-[11px]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-600"></span>
            Live Sync Active
          </span>
        </div>
      )}
    </div>
  );
}