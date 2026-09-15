"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Award,
  Calendar,
  CheckCircle2,
  Coins,
  FileCheck,
  Heart,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Plus,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import {
  NGO_USER,
  NGO_VOLUNTEERS,
  NGO_DRIVES,
  NGO_ACHIEVEMENTS,
} from "@/lib/data/ngo-mock";

export function NgoProfilePage() {
  const router = useRouter();

  const handleSignOut = () => {
    try {
      window.sessionStorage.removeItem("samadhan.ngo");
    } catch {
      /* ignore */
    }
    router.replace("/login");
  };

  return (
    <div className="relative z-10 mx-auto max-w-4xl space-y-6 bg-transparent p-3.5 pb-24 sm:p-6">
      {/* Cover and Profile Header */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Banner */}
        <div className="relative h-32 bg-gradient-to-r from-amber-600 via-orange-600 to-emerald-800 sm:h-40">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
          <div className="absolute right-4 top-4 hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md sm:flex">
            <Heart className="h-3.5 w-3.5 text-amber-200 fill-amber-200" />
            <span>NITI Aayog NGO Darpan Verified</span>
          </div>
        </div>

        {/* Profile Card Body */}
        <div className="relative px-5 pb-6 pt-0 sm:px-8">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3 -mt-12 sm:-mt-16">
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-slate-100 shadow-md sm:h-28 sm:w-28">
              <Image
                src={NGO_USER.avatarImage}
                alt={NGO_USER.name}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/ngo/drives"
                className="flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-amber-700 active:scale-95 sm:px-5 sm:py-2.5"
              >
                <Plus className="h-4 w-4 stroke-[2.5]" />
                <span>Launch Field Drive</span>
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                {NGO_USER.name}
              </h2>
              <span className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Darpan ID: {NGO_USER.darpanId}</span>
              </span>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
                80G / 12A Verified
              </span>
            </div>

            <p className="text-xs font-semibold text-slate-700 sm:text-sm">
              {NGO_USER.title} • {NGO_USER.organization}
            </p>

            <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
              {NGO_USER.bio}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                {NGO_USER.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                Established {NGO_USER.establishedYear} (7+ Years Serving Jodhpur)
              </span>
            </div>
          </div>

          {/* Grassroots Credibility / Volunteer Engagement Index */}
          <div className="mt-5 border-t border-slate-100 pt-4">
            <div className="mb-2 flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-slate-800">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <span>Civic Field Execution & Rapid Response Quotient</span>
              </span>
              <span className="font-mono font-bold text-amber-700">98 / 100 Gold Standard</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full border border-slate-200 bg-slate-100 p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 transition-all duration-500"
                style={{ width: "98%" }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[11px] text-slate-500">
              <span>Top #1 Community NGO in Western Rajasthan</span>
              <span>42 Active Deployed Volunteers</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="flex items-center gap-2 px-1">
        <span className="h-2 w-2 rounded-full bg-amber-600" />
        <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
          Field Impact & Civic Track Record
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-amber-100 bg-amber-50 text-amber-700">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <div className="mb-1 text-2xl font-black leading-none text-slate-900 sm:text-3xl">
              {NGO_VOLUNTEERS.length * 7}
            </div>
            <div className="text-xs font-semibold text-slate-600">Registered Volunteers</div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <div className="mb-1 text-2xl font-black leading-none text-slate-900 sm:text-3xl">
              38
            </div>
            <div className="text-xs font-semibold text-slate-600">Civic Drives Executed</div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700">
            <Coins className="h-4 w-4" />
          </div>
          <div>
            <div className="mb-1 text-2xl font-black leading-none text-slate-900 sm:text-3xl">
              ₹16,500
            </div>
            <div className="text-xs font-semibold text-slate-600">Direct Civic Relief</div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-rose-100 bg-rose-50 text-rose-700">
            <Heart className="h-4 w-4" />
          </div>
          <div>
            <div className="mb-1 text-2xl font-black leading-none text-slate-900 sm:text-3xl">
              24,000+
            </div>
            <div className="text-xs font-semibold text-slate-600">Citizens Reached</div>
          </div>
        </div>
      </div>

      {/* Earned Badges & Civic Honors */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h4 className="mb-3.5 text-xs font-bold uppercase tracking-wider text-slate-600">
          Grassroots Accreditations & Civic Badges
        </h4>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {NGO_ACHIEVEMENTS.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50 p-3.5"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-700">
                <Award className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-xs font-bold text-slate-900">{item.title}</div>
                <div className="mt-0.5 text-[11px] text-slate-600 leading-snug">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statutory & Field Operations Details */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-600">
          Field Operations Center & Statutory Details
        </h4>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2.5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <span className="text-xs font-bold text-slate-500">Official Field HQ Contact</span>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-600" />
                <span>{NGO_USER.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-600" />
                <span>{NGO_USER.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-600" />
                <span>Plot 42, Chopasni Housing Board, Near Kaylana Gate, Jodhpur</span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <span className="text-xs font-bold text-slate-500">Statutory & Verification IDs</span>
            <div className="space-y-1 text-xs text-slate-700">
              <p>• <strong>NITI Aayog Darpan:</strong> {NGO_USER.darpanId}</p>
              <p>• <strong>Tax Exemption:</strong> {NGO_USER.regNumber}</p>
              <p>• <strong>CSR-1 Reg:</strong> CSR00032910 (Approved for Corporate CSR)</p>
              <p>• <strong>JMC Empanelled:</strong> Ward 1 to Ward 30 Rapid Relief</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings & Sign Out */}
      <div className="flex items-center gap-3 pt-2">
        <Link
          href="/ngo/volunteers"
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-xs font-bold text-slate-700 shadow-xs transition-colors hover:bg-slate-50"
        >
          <Settings className="h-4 w-4 text-slate-600" />
          <span>Manage Volunteer Teams</span>
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
