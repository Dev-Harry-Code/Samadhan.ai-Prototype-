"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Award,
  Building2,
  CheckCircle2,
  FileCheck2,
  HeartHandshake,
  IndianRupee,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Plus,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { COMPANY_USER } from "@/lib/data/company-mock";

const PROFILE_AVATAR =
  "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400";

export function FunderProfilePage() {
  const router = useRouter();

  const handleSignOut = () => {
    try {
      window.sessionStorage.removeItem("samadhan.company");
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
        <div className="relative h-32 bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-900 sm:h-40">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
          <div className="absolute right-4 top-4 hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md sm:flex">
            <HeartHandshake className="h-3.5 w-3.5 text-emerald-400" />
            <span>Section 135 CSR Compliant</span>
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
                href="/funder/issues"
                className="flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-emerald-800 active:scale-95 sm:px-5 sm:py-2.5"
              >
                <Plus className="h-4 w-4 stroke-[2.5]" />
                <span>Sponsor New Project</span>
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                {COMPANY_USER.name}
              </h2>
              <span className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Verified CSR Partner</span>
              </span>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
                MCA Reg: CSR-0049281
              </span>
            </div>

            <p className="text-xs font-medium text-slate-700 sm:text-sm">
              {COMPANY_USER.title} • {COMPANY_USER.company} CSR Foundation
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5 text-slate-400" />
                Urban Infrastructure & Social Impact Wing
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                Jodhpur Smart City & Western Corridor
              </span>
            </div>
          </div>

          {/* CSR Credibility / ESG Quotient */}
          <div className="mt-5 border-t border-slate-100 pt-4">
            <div className="mb-2 flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-slate-800">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                <span>Corporate ESG & Impact Deployment Rating</span>
              </span>
              <span className="font-mono font-bold text-emerald-700">96 / 100 AAA Tier</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full border border-slate-200 bg-slate-100 p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 transition-all duration-500"
                style={{ width: "96%" }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[11px] text-slate-500">
              <span>Audited by Big-4 Statutory Auditors</span>
              <span>100% Tax Deductible (Sec 80G Certified)</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="flex items-center gap-2 px-1">
        <span className="h-2 w-2 rounded-full bg-emerald-600" />
        <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
          CSR Allocation & Impact Footprint
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700">
            <IndianRupee className="h-4 w-4" />
          </div>
          <div>
            <div className="mb-1 text-2xl font-black leading-none text-slate-900 sm:text-3xl">
              ₹1.42 Cr
            </div>
            <div className="text-xs font-semibold text-slate-600">CSR Capital Deployed</div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-teal-100 bg-teal-50 text-teal-700">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <div className="mb-1 text-2xl font-black leading-none text-slate-900 sm:text-3xl">
              48
            </div>
            <div className="text-xs font-semibold text-slate-600">Funded Projects Completed</div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <div className="mb-1 text-2xl font-black leading-none text-slate-900 sm:text-3xl">
              82K+
            </div>
            <div className="text-xs font-semibold text-slate-600">Citizens Impacted</div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-amber-100 bg-amber-50 text-amber-700">
            <Award className="h-4 w-4" />
          </div>
          <div>
            <div className="mb-1 text-2xl font-black leading-none text-slate-900 sm:text-3xl">
              96%
            </div>
            <div className="text-xs font-semibold text-slate-600">Milestone Audit Accuracy</div>
          </div>
        </div>
      </div>

      {/* Earned Badges & Social Responsibility Honors */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h4 className="mb-3.5 text-xs font-bold uppercase tracking-wider text-slate-600">
          Corporate Social Impact Accreditations
        </h4>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-bold text-slate-900">
                100% On-Chain Escrow Audit
              </div>
              <div className="mt-0.5 text-[11px] text-slate-600">
                Geo-tagged before/after photo verification for every rupee
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-600">
              <Award className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-bold text-slate-900">
                Clean Water Steward 2025
              </div>
              <div className="mt-0.5 text-[11px] text-slate-600">
                Sponsoring 12 RO filtration kiosks in high-fluoride zones
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-bold text-slate-900">
                Zero Red-Tape Partner
              </div>
              <div className="mt-0.5 text-[11px] text-slate-600">
                Fast-track micro-grant disbursals within 48 hours
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statutory Mandate & Contact Details */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-600">
          CSR Foundation Governance & Contact
        </h4>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2.5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <span className="text-xs font-bold text-slate-500">Official CSR Liaison</span>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-600" />
                <span>csr.director@municipalcorp.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-600" />
                <span>+91 22 6649 2000 (Board Line)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <span>Level 14, Corporate Tower, Bandra Kurla / Jodhpur Node</span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <span className="text-xs font-bold text-slate-500">Statutory Registrations</span>
            <div className="space-y-1 text-xs text-slate-700">
              <p>• <strong>Ministry of Corporate Affairs:</strong> CSR-0049281</p>
              <p>• <strong>Income Tax Exemption:</strong> 80G / 12A Verified</p>
              <p>• <strong>Auditing Agency:</strong> PriceWaterhouseCoopers Statutory</p>
              <p>• <strong>CSR Committee Head:</strong> Board Sustainability Sub-committee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings & Sign Out */}
      <div className="flex items-center gap-3 pt-2">
        <Link
          href="/funder/settings"
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-xs font-bold text-slate-700 shadow-xs transition-colors hover:bg-slate-50"
        >
          <Settings className="h-4 w-4 text-slate-600" />
          <span>Funder Portal Settings</span>
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
