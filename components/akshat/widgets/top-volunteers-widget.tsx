"use client";

import Image from "next/image";
import { Award, Trophy } from "lucide-react";

import { cn } from "@/lib/utils";
import { TOP_VOLUNTEERS } from "@/lib/data/akshat-mock";
import { useAkshat } from "@/components/akshat/akshat-context";
import { volunteerField } from "@/components/akshat/localize-helpers";

export const TopVolunteersWidget = () => {
  const { t } = useAkshat();
  return (
    <div className="relative box-border flex h-full min-h-[390px] flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="flex items-center gap-1.5 text-base font-black tracking-tight text-slate-900">
              <Trophy className="h-4 w-4 text-orange-500" />
              <span>{t("topVolunteers", "Top Volunteers")}</span>
            </h3>
            <span className="flex items-center gap-1 whitespace-nowrap rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-orange-700">
              <Award className="h-3 w-3 text-orange-500" />
              {t("liveKarma", "Live Karma")}
            </span>
          </div>
          <p className="mt-0.5 truncate text-xs text-slate-700">
            {t("topVolunteersSub", "Citizens leading ground implementation")}
          </p>
        </div>

        <button className="flex-shrink-0 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-100">
          {t("viewAll", "View All")}
        </button>
      </div>

      <div className="my-auto space-y-2.5">
        {TOP_VOLUNTEERS.map((vol) => (
          <div
            key={vol.id}
            className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition-all duration-200 hover:bg-slate-100"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2.5">
              <div
                className={cn(
                  "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg text-[11px] font-black",
                  vol.rank === 1
                    ? "border border-amber-300 bg-amber-100 text-amber-800"
                    : vol.rank === 2
                      ? "border border-slate-300 bg-slate-200 text-slate-700"
                      : vol.rank === 3
                        ? "border border-orange-300 bg-orange-100 text-orange-800"
                        : "bg-slate-100 text-slate-700 border border-slate-200",
                )}
              >
                #{vol.rank}
              </div>

              <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full border border-slate-300 shadow-xs">
                <Image src={vol.avatar} alt={vol.name} fill sizes="36px" className="object-cover" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-xs font-bold text-slate-900 sm:text-sm">
                    {volunteerField(t, vol.id, "name", vol.name)}
                  </span>
                  <span className="flex-shrink-0 whitespace-nowrap rounded border border-teal-200 bg-teal-50 px-1.5 py-0.5 text-[9px] font-bold text-teal-800">
                    {volunteerField(t, vol.id, "badge", vol.badge)}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 truncate text-[11px] text-slate-700">
                  <span className="truncate">{volunteerField(t, vol.id, "role", vol.role)}</span>
                  <span>•</span>
                  <span className="flex-shrink-0 font-bold text-teal-700">{vol.solvedCount} {t("solvedCount", "solved")}</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 text-right">
              <div className="text-xs font-black text-slate-900 sm:text-sm">
                {vol.xp.toLocaleString()}{" "}
                <span className="text-[10px] font-bold text-teal-600">XP</span>
              </div>
              <div className="ml-auto mt-1 h-1.5 w-16 overflow-hidden rounded-full bg-slate-200 sm:w-20">
                <div
                  className="h-full rounded-full bg-teal-600"
                  style={{ width: `${Math.min(100, (vol.xp / 5000) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
