"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  GraduationCap,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Plus,
  School,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { UNIVERSITY_USER, UNIVERSITY_TEAMS, UNIVERSITY_CASE_STUDIES } from "@/lib/data/university-mock";
import { signOut } from "@/lib/api/client";

const PROFILE_AVATAR =
  "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400";

export function UniversityProfilePage() {
  const router = useRouter();

  const handleSignOut = () => {
    try {
      window.sessionStorage.removeItem("samadhan.university");
    } catch {
      /* ignore */
    }
    void signOut();
    router.replace("/login");
  };

  return (
    <div className="relative z-10 mx-auto max-w-4xl space-y-6 bg-transparent p-3.5 pb-24 sm:p-6">
      {/* Cover and Profile Header */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Banner */}
        <div className="relative h-32 bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 sm:h-40">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
          <div className="absolute right-4 top-4 hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md sm:flex">
            <School className="h-3.5 w-3.5 text-emerald-300" />
            <span>Institute of National Importance</span>
          </div>
        </div>

        {/* Profile Card Body */}
        <div className="relative px-5 pb-6 pt-0 sm:px-8">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3 -mt-12 sm:-mt-16">
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-slate-100 shadow-md sm:h-28 sm:w-28">
              <Image
                src={PROFILE_AVATAR}
                alt="Profile Avatar"
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/university/assign"
                className="flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-emerald-800 active:scale-95 sm:px-5 sm:py-2.5"
              >
                <Plus className="h-4 w-4 stroke-[2.5]" />
                <span>Deploy Research Team</span>
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                {UNIVERSITY_USER.name}
              </h2>
              <span className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Verified Academic Lead</span>
              </span>
              <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-800">
                NAAC A++ • NIRF #12
              </span>
            </div>

            <p className="text-xs font-medium text-slate-700 sm:text-sm">
              {UNIVERSITY_USER.title}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5 text-slate-400" />
                Department of Civil & Environmental Engineering
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                {UNIVERSITY_USER.location}
              </span>
            </div>
          </div>

          {/* Academic Credibility / Capstone Progress */}
          <div className="mt-5 border-t border-slate-100 pt-4">
            <div className="mb-2 flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-slate-800">
                <GraduationCap className="h-4 w-4 text-emerald-600" />
                <span>Civic Research Accreditation Quotient</span>
              </span>
              <span className="font-mono font-bold text-emerald-700">94 / 100 Impact Pts</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full border border-slate-200 bg-slate-100 p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500"
                style={{ width: "94%" }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[11px] text-slate-500">
              <span>MoHUA Capstone Tier-1 Partner</span>
              <span>6 Active Labs • 140 Student Credits Awarded</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="flex items-center gap-2 px-1">
        <span className="h-2 w-2 rounded-full bg-emerald-600" />
        <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
          Institutional Civic Metrics
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <div className="mb-1 text-2xl font-black leading-none text-slate-900 sm:text-3xl">
              {UNIVERSITY_TEAMS.length}
            </div>
            <div className="text-xs font-semibold text-slate-600">Active Student Teams</div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-teal-100 bg-teal-50 text-teal-700">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <div className="mb-1 text-2xl font-black leading-none text-slate-900 sm:text-3xl">
              {UNIVERSITY_CASE_STUDIES.length}
            </div>
            <div className="text-xs font-semibold text-slate-600">Published Case Studies</div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <div className="mb-1 text-2xl font-black leading-none text-slate-900 sm:text-3xl">
              28
            </div>
            <div className="text-xs font-semibold text-slate-600">Municipal Issues Solved</div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-amber-100 bg-amber-50 text-amber-700">
            <Award className="h-4 w-4" />
          </div>
          <div>
            <div className="mb-1 text-2xl font-black leading-none text-slate-900 sm:text-3xl">
              140
            </div>
            <div className="text-xs font-semibold text-slate-600">Academic Credits Deployed</div>
          </div>
        </div>
      </div>

      {/* Institutional Honors & Research Accreditations */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h4 className="mb-3.5 text-xs font-bold uppercase tracking-wider text-slate-600">
          Earned Institutional Accreditations
        </h4>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-bold text-slate-900">
                MoHUA Smart Research Hub
              </div>
              <div className="mt-0.5 text-[11px] text-slate-600">
                Authorized GIS & urban hydrological testing center
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600">
              <Award className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-bold text-slate-900">
                JMC Excellence Award 2025
              </div>
              <div className="mt-0.5 text-[11px] text-slate-600">
                Rapid drainage remediation in Mandore Mandi
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-600">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-bold text-slate-900">
                AICTE Clean Campus Pioneer
              </div>
              <div className="mt-0.5 text-[11px] text-slate-600">
                Zero-plastic & decentralized greywater recycling
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Department & Faculty Details */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-600">
          Faculty Department & Contact Info
        </h4>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2.5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <span className="text-xs font-bold text-slate-500">Official Contact</span>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-600" />
                <span>aarav.mehta@iitj.ac.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-600" />
                <span>+91 291 280 1204 (Ext. 410)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <span>Room 304, Academic Block 2, Karwar, Jodhpur</span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <span className="text-xs font-bold text-slate-500">Civic Capstone Program</span>
            <div className="space-y-1 text-xs text-slate-700">
              <p>• <strong>Course Code:</strong> CE-491 (B.Tech Capstone Project)</p>
              <p>• <strong>Semester Credits:</strong> 4 Credits / 120 Hours Field Work</p>
              <p>• <strong>Active Faculty Mentors:</strong> 8 Associate Professors</p>
              <p>• <strong>Partner Body:</strong> Jodhpur Municipal Corporation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings & Sign Out */}
      <div className="flex items-center gap-3 pt-2">
        <Link
          href="/university/assign"
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-xs font-bold text-slate-700 shadow-xs transition-colors hover:bg-slate-50"
        >
          <Settings className="h-4 w-4 text-slate-600" />
          <span>Manage Department Preferences</span>
        </Link>
        <button
          onClick={handleSignOut}
          className="flex flex-shrink-0 items-center justify-center gap-1.5 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-3.5 text-xs font-bold text-rose-700 transition-colors hover:bg-rose-100"
        >
          <LogOut className="h-4 w-4 text-rose-600" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
