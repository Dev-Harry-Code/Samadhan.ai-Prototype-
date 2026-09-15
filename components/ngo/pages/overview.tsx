"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  IndianRupee,
  Layers,
  Leaf,
  Loader2,
  MapPin,
  Plus,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import { CivicBackground } from "@/components/akshat/common/civic-background";
import { PortalOverviewHeader } from "@/components/portal/overview-header";
import { HubNav } from "@/components/portal/hub-nav";
import { MetricCard } from "@/components/portal/metric-card";
import { NGO_USER, NGO_DRIVES, NGO_VOLUNTEERS, NGO_GRANTS } from "@/lib/data/ngo-mock";

interface CivicOpportunity {
  id: string;
  title: string;
  category: string;
  location: string;
  ward: string;
  urgency: "Critical" | "High" | "Medium";
  volunteersNeeded: number;
  volunteersEnrolled: number;
  budgetSupported: string;
  partnerCompany: string;
  timeframe: string;
}

const CIVIC_OPPORTUNITIES: CivicOpportunity[] = [
  {
    id: "opp-1",
    title: "Kaylana Lake Shoreline Plastic Clearance & Floating Boom Deployment",
    category: "Water Body Revival",
    location: "Kaylana Lake West Shore",
    ward: "Ward 4",
    urgency: "Critical",
    volunteersNeeded: 25,
    volunteersEnrolled: 18,
    budgetSupported: "₹20,000",
    partnerCompany: "Tata Steel CSR",
    timeframe: "Active Today · 08:00 AM",
  },
  {
    id: "opp-2",
    title: "Sector 8 Stormwater Canal Sludge Clearance & Silt Removal",
    category: "Sanitation & Drainage",
    location: "Sector 8 Main Road Junction",
    ward: "Ward 8",
    urgency: "High",
    volunteersNeeded: 15,
    volunteersEnrolled: 12,
    budgetSupported: "₹12,500",
    partnerCompany: "GreenCity Environmental",
    timeframe: "Tomorrow · 07:30 AM",
  },
  {
    id: "opp-3",
    title: "Mehrangarh Foot-Trail Native Khejri Reforestation & Drip Pipeline",
    category: "Green Cover",
    location: "Rao Jodha Desert Rock Park Border",
    ward: "Ward 1",
    urgency: "Medium",
    volunteersNeeded: 35,
    volunteersEnrolled: 31,
    budgetSupported: "₹35,000",
    partnerCompany: "City Power Grid CSR",
    timeframe: "Sat 20 Sep 2026",
  },
];

export function NgoOverviewPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [opportunities, setOpportunities] = useState(CIVIC_OPPORTUNITIES);
  const [toastMessage, setToastMessage] = useState("");

  const filteredOpportunities = opportunities.filter((o) =>
    selectedCategory === "All" ? true : o.category === selectedCategory
  );

  const handleMobilize = (id: string, title: string) => {
    setOpportunities((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, volunteersEnrolled: Math.min(o.volunteersNeeded, o.volunteersEnrolled + 2) }
          : o
      )
    );
    setToastMessage(`Mobilized 2 volunteers to "${title}"!`);
    setTimeout(() => setToastMessage(""), 3500);
  };

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden font-sans">
      <CivicBackground />

      <div className="relative z-10 w-full max-w-full overflow-x-hidden">
        {/* Top Navbar matching User's Image */}
        <PortalOverviewHeader
          role="NGO / Grassroots Org"
          location="Jodhpur"
          storageKey="samadhan.ngo"
          user={{ name: NGO_USER.name, avatar: NGO_USER.avatar }}
          profileHref="/ngo/profile"
          links={[
            { href: "/ngo", label: "Overview" },
            { href: "/ngo/drives", label: "Opportunities" },
            { href: "/ngo/volunteers", label: "Volunteers" },
            { href: "/ngo/funding", label: "Grants" },
            { href: "/ngo/impact", label: "Impact" },
            { href: "/ngo/profile", label: "Profile" },
          ]}
        />

        <div className="relative w-full max-w-full overflow-hidden">
          {/* Subtle Ambient Blur Backgrounds */}
          <div className="pointer-events-none absolute left-1/2 top-6 h-[250px] w-96 max-w-[90vw] -translate-x-1/2 rounded-full bg-teal-500/10 blur-[100px] sm:w-[500px]" />
          <div className="pointer-events-none absolute right-0 top-96 h-[350px] w-80 max-w-[90vw] rounded-full bg-orange-500/10 blur-[110px] sm:w-[350px]" />

          <main className="relative z-10 mx-auto w-full max-w-7xl min-w-0 space-y-6 px-3.5 pb-20 pt-6 sm:px-6">
            {/* Toast Feedback */}
            {toastMessage && (
              <div className="mx-auto flex max-w-md items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-bold text-emerald-800 shadow-sm animate-in fade-in slide-in-from-top-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>{toastMessage}</span>
              </div>
            )}

            {/* HERO (Exact match to User's Uploaded Screenshot) */}
            <div className="mx-auto max-w-3xl pb-2 pt-4 text-center">
              <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-800 shadow-xs">
                <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-orange-500" />
                <span className="truncate font-medium">AI-Powered Social Impact</span>
              </div>

              <h1 className="break-words text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Turn Corporate Action Into{" "}
                <span className="text-teal-600">Measurable Community Impact</span>
              </h1>

              <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-slate-700 sm:text-sm">
                Discover high-impact civic opportunities, support verified projects and track the
                difference your organization creates.
              </p>

              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/ngo/drives"
                  className="btn-breathing flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-600 px-5 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-teal-700 hover:shadow-lg sm:w-auto"
                >
                  <span>Explore Impact Opportunities</span>
                  <ArrowRight className="h-4 w-4 shrink-0 stroke-[2.5]" />
                </Link>
                <Link
                  href="/ngo/drives"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 sm:w-auto"
                >
                  <span>View Active Projects</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </div>
            </div>

            {/* HUB NAV (Exact match to User's Screenshot) */}
            <HubNav
              activeHref="/ngo"
              items={[
                { href: "/ngo", label: "Overview" },
                { href: "/ngo/drives", label: "Opportunities" },
                { href: "/ngo/drives", label: "Projects" },
                { href: "/ngo/volunteers", label: "Analytics" },
                { href: "/ngo/impact", label: "Impact" },
                { href: "/ngo/profile", label: "Profile" },
              ]}
            />

            {/* 6 METRIC CARDS (Exact match to User's Screenshot) */}
            <div className="grid w-full min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
              <MetricCard
                icon={<FileText className="h-4 w-4 text-amber-600" />}
                title="Impact Opportunities"
                value="10"
                growth="+18"
                subtext="today"
                tone="amber"
                delay={0}
              />
              <MetricCard
                icon={<Loader2 className="h-4 w-4 animate-spin text-sky-600" />}
                title="Active Projects"
                value="3"
                growth="+4"
                subtext="ongoing work"
                tone="sky"
                delay={0.06}
              />
              <MetricCard
                icon={<Users className="h-4 w-4 text-purple-600" />}
                title="Communities Supported"
                value="12"
                growth="+1"
                subtext="new ward"
                tone="purple"
                delay={0.12}
              />
              <MetricCard
                icon={<IndianRupee className="h-4 w-4 text-rose-600" />}
                title="Funds Deployed"
                value="₹2.4L"
                growth="-18%"
                subtext="this quarter"
                tone="rose"
                delay={0.18}
              />
              <MetricCard
                icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                title="Projects Completed"
                value="2"
                growth="-20%"
                subtext="this week"
                tone="emerald"
                delay={0.24}
              />
              <MetricCard
                icon={<Award className="h-4 w-4 text-teal-600" />}
                title="Impact Generated"
                value="₹48,500"
                growth="-18%"
                subtext="social value"
                tone="teal"
                delay={0.3}
              />
            </div>

            {/* IMPACT OPPORTUNITIES SECTION (Exact match to User's Screenshot) */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
                <div>
                  <h2 className="text-lg font-black tracking-tight text-slate-900 sm:text-xl">
                    Impact Opportunities
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-600">
                    Discover civic challenges where your organization can create measurable impact
                  </p>
                </div>

                <Link
                  href="/ngo/drives"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-teal-200 bg-teal-50/80 px-3.5 py-1.5 text-xs font-bold text-teal-800 transition hover:bg-teal-100 self-start sm:self-auto"
                >
                  <span>View All</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 mb-5">
                {["All", "Water Body Revival", "Sanitation & Drainage", "Green Cover"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-xl px-3 py-1 text-xs font-bold transition ${
                      selectedCategory === cat
                        ? "bg-teal-600 text-white shadow-xs"
                        : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Opportunities Grid */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {filteredOpportunities.map((opp) => {
                  const percent = Math.round((opp.volunteersEnrolled / opp.volunteersNeeded) * 100);

                  return (
                    <div
                      key={opp.id}
                      className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-teal-300 hover:bg-white hover:shadow-md"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              opp.urgency === "Critical"
                                ? "bg-rose-100 text-rose-800"
                                : opp.urgency === "High"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {opp.urgency} Urgency
                          </span>
                          <span className="text-[11px] font-bold text-slate-500">
                            {opp.ward}
                          </span>
                        </div>

                        <div>
                          <span className="text-[11px] font-semibold text-teal-700">
                            {opp.category}
                          </span>
                          <h3 className="text-sm font-bold text-slate-900 leading-snug mt-0.5">
                            {opp.title}
                          </h3>
                        </div>

                        <div className="space-y-1.5 text-xs text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                            <span className="truncate">{opp.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <span>{opp.timeframe}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                            <span>Corpus: {opp.budgetSupported} ({opp.partnerCompany})</span>
                          </div>
                        </div>

                        {/* Volunteers progress */}
                        <div className="rounded-xl border border-slate-200/80 bg-white p-2.5">
                          <div className="flex items-center justify-between text-xs font-bold mb-1">
                            <span className="text-slate-700">
                              Squad: {opp.volunteersEnrolled} / {opp.volunteersNeeded} Volunteers
                            </span>
                            <span className="font-mono text-teal-700">{percent}%</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-teal-600 transition-all duration-500"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/70">
                        <button
                          onClick={() => handleMobilize(opp.id, opp.title)}
                          className="w-full rounded-xl bg-teal-600 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-teal-700 active:scale-95"
                        >
                          Mobilize Squad (+2 Volunteers)
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI ALLOCATION & PREDICTOR WIDGETS */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-teal-200 bg-gradient-to-br from-teal-50/70 to-white p-5 shadow-xs sm:p-6">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-600 text-white">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      AI Rapid Squad Dispatcher
                    </h2>
                    <p className="text-[11px] text-teal-800">
                      Smart algorithmic match for open civic incidents
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed mb-4">
                  Based on citizen reports logged in Ward 8, the AI recommends dispatching{" "}
                  <strong className="font-bold text-teal-800">3 specialized volunteers</strong> with sludge pumps to de-clog the stormwater canal before rainfall.
                </p>
                <Link
                  href="/ngo/drives"
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-teal-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-teal-700"
                >
                  <span>Auto-Dispatch Available Squad</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50/70 to-white p-5 shadow-xs sm:p-6">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-600 text-white">
                    <IndianRupee className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      CSR Micro-Grant Escrow Pool
                    </h2>
                    <p className="text-[11px] text-amber-800">
                      Section 135 Pre-approved CSR allocation
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed mb-3">
                  Tata Steel CSR & Western India Energy have committed{" "}
                  <strong className="font-bold text-amber-800">₹7.5 Lakhs</strong> for Jodhpur lake revival and zero-waste operations.
                </p>
                <div className="h-2 w-full overflow-hidden rounded-full bg-amber-100">
                  <div className="h-full rounded-full bg-amber-600" style={{ width: "68%" }} />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] font-bold text-amber-900">
                  <span>68% Released (Escrow Protected)</span>
                  <Link href="/ngo/funding" className="text-amber-800 underline hover:text-amber-950">
                    View Grant Pipeline →
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
