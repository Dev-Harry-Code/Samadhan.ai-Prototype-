"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Award,
  CheckCircle2,
  Droplets,
  FileText,
  LogOut,
  Plus,
  Settings,
  ThumbsUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

import type { ScreenId } from "@/lib/akshat-types";
import { useAkshat } from "@/components/akshat/akshat-context";

interface UserProfileScreenProps {
  setScreen: (screen: ScreenId) => void;
}

const PROFILE_AVATAR =
  "https://images.pexels.com/photos/36292200/pexels-photo-36292200.jpeg?auto=compress&cs=tinysrgb&w=200";

export const UserProfileScreen = ({ setScreen }: UserProfileScreenProps) => {
  const router = useRouter();
  const { t } = useAkshat();

  const signOut = () => {
    try {
      window.sessionStorage.removeItem("samadhan.citizen");
    } catch {
      /* storage unavailable */
    }
    setScreen("auth");
    router.replace("/login");
  };

  return (
    <div className="relative z-10 mx-auto max-w-3xl space-y-6 bg-transparent p-3.5 pb-40 sm:p-6">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="relative h-28 bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 sm:h-36">
          <div className="absolute inset-0 bg-black/5"></div>
        </div>

        <div className="relative px-5 pb-6 pt-0">
          <div className="mb-4 flex items-end justify-between -mt-12 sm:-mt-14">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-slate-100 shadow-md sm:h-24 sm:w-24">
              <Image
                src={PROFILE_AVATAR}
                alt={t("profileAlt", "Profile")}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <button
              onClick={() => setScreen("report")}
              className="mb-1 flex flex-shrink-0 items-center gap-1.5 rounded-xl bg-orange-500 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:scale-105 hover:bg-orange-600 active:scale-95 sm:px-5 sm:py-2.5"
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
              <span>{t("newReport", "New Report")}</span>
            </button>
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                {t("userName", "Aarav Mehta")}
              </h2>
              <span className="flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
                <Trophy className="h-3.5 w-3.5 text-amber-600" />
                <span>{t("civicChampion", "Civic Champion")}</span>
              </span>
            </div>

            <p className="text-xs font-medium text-slate-700 sm:text-sm">
              {t("verifiedSolver", "Verified Community Solver • Ranchi Municipal District")}
            </p>
          </div>

          <div className="mt-5 border-t border-slate-100 pt-4">
            <div className="mb-2 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-800">{t("levelContributor", "Level 7 Contributor")}</span>
              <span className="font-mono text-teal-700">4,850 / 5,000 XP</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full border border-slate-200 bg-slate-100 p-0.5">
              <div
                className="h-full rounded-full bg-teal-600 transition-all duration-500"
                style={{ width: "92%" }}
              ></div>
            </div>
            <div className="mt-1.5 flex justify-between text-[11px] text-slate-700">
              <span>{t("rankInWard", "Rank #1 in Ranchi Ward 14")}</span>
              <span>{t("xpToLevel", "150 XP to Level 8")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 px-1">
        <span className="h-2 w-2 rounded-full bg-teal-600"></span>
        <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
          {t("personalImpact", "Personal Civic Impact")}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-teal-100 bg-teal-50 text-teal-700">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <div className="mb-1 text-2xl font-black leading-none text-slate-900 sm:text-3xl">38</div>
            <div className="text-xs font-semibold text-slate-700">{t("statReportedIssues", "Reported Issues")}</div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-teal-100 bg-teal-50 text-teal-700">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <div className="mb-1 text-2xl font-black leading-none text-slate-900 sm:text-3xl">32</div>
            <div className="text-xs font-semibold text-slate-700">{t("statFixedVerified", "Fixed & Verified")}</div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-orange-100 bg-orange-50 text-orange-600">
            <ThumbsUp className="h-4 w-4" />
          </div>
          <div>
            <div className="mb-1 text-2xl font-black leading-none text-slate-900 sm:text-3xl">1,240</div>
            <div className="text-xs font-semibold text-slate-700">{t("statKarmaUpvotes", "Karma Upvotes")}</div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-amber-100 bg-amber-50 text-amber-700">
            <Award className="h-4 w-4" />
          </div>
          <div>
            <div className="mb-1 text-2xl font-black leading-none text-slate-900 sm:text-3xl">6</div>
            <div className="text-xs font-semibold text-slate-700">{t("statCivicBadges", "Civic Badges")}</div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h4 className="mb-3.5 text-xs font-bold uppercase tracking-wider text-slate-700">
          {t("earnedAchievements", "Earned Achievements")}
        </h4>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-600">
              <Droplets className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-bold text-slate-900">{t("badgeWaterGuardian", "Water Guardian")}</div>
              <div className="mt-0.5 text-[11px] text-slate-700">{t("badgeWaterGuardianDesc", "10+ water supply issues resolved")}</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-600">
              <Zap className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-bold text-slate-900">{t("badgeFirstResponder", "First Responder")}</div>
              <div className="mt-0.5 text-[11px] text-slate-700">{t("badgeFirstResponderDesc", "Average resolution response in 48h")}</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-teal-200 bg-teal-50 text-teal-600">
              <Users className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-bold text-slate-900">{t("badgeCommunityPillar", "Community Pillar")}</div>
              <div className="mt-0.5 text-[11px] text-slate-700">{t("badgeCommunityPillarDesc", "1,000+ peer upvotes received")}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-xs font-bold text-slate-700 shadow-xs transition-colors hover:bg-slate-50">
          <Settings className="h-4 w-4 text-slate-700" />
          <span>{t("accountNotifications", "Account & Notifications")}</span>
        </button>
        <button
          onClick={signOut}
          className="flex flex-shrink-0 items-center justify-center gap-1.5 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-3.5 text-xs font-bold text-rose-700 transition-colors hover:bg-rose-100"
        >
          <LogOut className="h-4 w-4 text-rose-600" />
          <span>{t("signOut", "Sign Out")}</span>
        </button>
      </div>
    </div>
  );
};
