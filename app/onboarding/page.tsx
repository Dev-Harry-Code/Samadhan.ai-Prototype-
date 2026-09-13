"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  MapPin,
  Check,
  Building2,
  User,
  Shield,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Zap,
  ShieldCheck,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocumentUploader } from "@/components/ui/document-uploader";
import { cn } from "@/lib/utils";

type PortalRole = "citizen" | "university" | "ngo" | "company";

const ROLE_CONFIGS: Record<
  PortalRole,
  { label: string; icon: any; accent: string; title: string; subtitle: string; destination: string }
> = {
  citizen: {
    label: "Citizen",
    icon: User,
    accent: "from-teal-500 to-emerald-600",
    title: "Citizen Profile",
    subtitle: "Report local issues, track municipal fixes & volunteer in your ward.",
    destination: "/",
  },
  university: {
    label: "University",
    icon: GraduationCap,
    accent: "from-emerald-600 to-teal-700",
    title: "University Academic Profile",
    subtitle: "Deploy student teams, manage research labs & connect civic coursework.",
    destination: "/university",
  },
  ngo: {
    label: "NGO",
    icon: Shield,
    accent: "from-amber-500 to-orange-600",
    title: "NGO Partner Profile",
    subtitle: "Mobilize ground volunteers, allocate resources & apply for CSR grants.",
    destination: "/ngo",
  },
  company: {
    label: "Company / CSR",
    icon: Building2,
    accent: "from-indigo-500 to-violet-700",
    title: "Company & CSR Profile",
    subtitle: "Sponsor high-impact civic projects, track ESG metrics & ensure 80G compliance.",
    destination: "/funder",
  },
};

function OnboardingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get("role") as PortalRole) || "citizen";

  const [activeRole, setActiveRole] = useState<PortalRole>(
    ["citizen", "university", "ngo", "company"].includes(initialRole) ? initialRole : "citizen",
  );
  const [busy, setBusy] = useState(false);
  const [aiFilled, setAiFilled] = useState(false);

  // Common fields
  const [fullName, setFullName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");

  // Citizen fields
  const [area, setArea] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

  // University & NGO fields
  const [orgName, setOrgName] = useState("");
  const [affilNo, setAffilNo] = useState("");
  const [opRegion, setOpRegion] = useState("");

  // Company fields
  const [companyName, setCompanyName] = useState("");
  const [gstin, setGstin] = useState("");
  const [csrFocus, setCsrFocus] = useState("");

  const toggleInterest = (val: string) => {
    setInterests((prev) => (prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]));
  };

  const handleUseLocation = () => {
    setCity("Jodhpur");
    setState("Rajasthan");
    setPinCode("342001");
  };

  // AI Autofill specifically crafted for Aarav Mehta Identity across each role
  const handleAiAutofill = () => {
    setAiFilled(true);
    setState("Rajasthan");
    setCity("Jodhpur");

    if (activeRole === "citizen") {
      setFullName("Aarav Mehta");
      setPinCode("342001");
      setArea("Ratanada, Ward 14 (Near Circuit House)");
      setInterests(["Roads", "Sanitation", "Water", "Electricity"]);
    } else if (activeRole === "university") {
      setFullName("Prof. Aarav Mehta");
      setPinCode("342037");
      setOrgName("IIT Jodhpur (Indian Institute of Technology)");
      setAffilNo("AISHE: U-0391 · IN-IITJ-CIVIC-2026");
      setOpRegion("Civil & Environmental Infrastructure Dept");
    } else if (activeRole === "ngo") {
      setFullName("Aarav Mehta (Executive Director)");
      setPinCode("342003");
      setOrgName("Samadhan Rural & Urban Welfare Trust");
      setAffilNo("DARPAN: RJ/2022/0194821 (12A & 80G Certified)");
      setOpRegion("Community Sanitation, Road Safety & Youth Volunteering · Jodhpur Division");
    } else if (activeRole === "company") {
      setFullName("Aarav Mehta (Head of CSR & ESG)");
      setPinCode("342005");
      setCompanyName("Mehta Infrastructure & Green Energy Ltd.");
      setGstin("08AAACM4912K1Z9 (CIN: L45200RJ2018PLC061294)");
      setCsrFocus("Clean Drinking Water Access, Sustainable Pavements & Solar Lighting");
    }
  };

  const handleResetForm = () => {
    setAiFilled(false);
    setFullName("");
    setState("");
    setCity("");
    setPinCode("");
    setArea("");
    setInterests([]);
    setOrgName("");
    setAffilNo("");
    setOpRegion("");
    setCompanyName("");
    setGstin("");
    setCsrFocus("");
  };

  const handleSwitchRole = (newRole: PortalRole) => {
    setActiveRole(newRole);
    setAiFilled(false);
    handleResetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);

    try {
      if (activeRole === "company") {
        window.sessionStorage.setItem("samadhan.company", "true");
      } else if (activeRole === "university") {
        window.sessionStorage.setItem("samadhan.university", "true");
      } else if (activeRole === "ngo") {
        window.sessionStorage.setItem("samadhan.ngo", "true");
      } else {
        window.sessionStorage.setItem("samadhan.citizen", "true");
      }
    } catch {
      // ignore
    }

    setTimeout(() => {
      router.push(ROLE_CONFIGS[activeRole].destination);
    }, 600);
  };

  const civicOptions = ["Roads", "Sanitation", "Water", "Electricity", "Healthcare", "Education"];
  const currentConfig = ROLE_CONFIGS[activeRole];
  const IconComponent = currentConfig.icon;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[12%] -top-[12%] h-[28rem] w-[28rem] rounded-full bg-teal-300/30 blur-[130px]" />
        <div className="absolute -bottom-[14%] -right-[12%] h-[28rem] w-[28rem] rounded-full bg-orange-300/30 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-xl">
        <div className="mb-6 text-center">
          <div
            className={cn(
              "mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-all",
              currentConfig.accent,
            )}
          >
            <IconComponent size={32} />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Complete Your Profile
          </h1>
          <p className="mt-1 text-xs text-slate-700 sm:text-sm">
            Configure your identity details or use AI Auto-Fill to populate instant verified credentials.
          </p>
        </div>

        {/* ROLE TABS */}
        <div className="mb-5 grid grid-cols-4 gap-1.5 rounded-2xl bg-white/90 p-1.5 shadow-sm ring-1 ring-slate-200 backdrop-blur-md">
          {(["citizen", "university", "ngo", "company"] as PortalRole[]).map((r) => {
            const isCurrent = activeRole === r;
            const TabIcon = ROLE_CONFIGS[r].icon;
            return (
              <button
                key={r}
                type="button"
                onClick={() => handleSwitchRole(r)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-center transition-all",
                  isCurrent
                    ? "bg-slate-900 text-white shadow-sm font-bold"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-semibold",
                )}
              >
                <TabIcon size={16} className={isCurrent ? "text-white" : "text-slate-700"} />
                <span className="text-[11px] leading-tight truncate w-full">{ROLE_CONFIGS[r].label}</span>
              </button>
            );
          })}
        </div>

        {/* AI AUTO-FILL BANNER */}
        <div className="mb-5 flex flex-col gap-2 rounded-2xl border border-teal-200 bg-gradient-to-r from-teal-50 via-emerald-50 to-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">
                AI Auto-Fill · Aarav Mehta Identity
              </p>
              <p className="text-[11px] font-medium text-slate-700">
                Instantly populate verified Jodhpur civic credentials for this role.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAiAutofill}
              className="flex items-center gap-1.5 rounded-xl bg-teal-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-teal-700 hover:shadow"
            >
              <Zap size={14} className="text-amber-300" />
              <span>Auto-Fill as Aarav</span>
            </button>
            {aiFilled && (
              <button
                type="button"
                onClick={handleResetForm}
                title="Reset fields"
                className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw size={14} />
              </button>
            )}
          </div>
        </div>

        {/* AI VERIFICATION BOX IF AUTO-FILLED */}
        {aiFilled && (
          <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50/90 p-3.5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <ShieldCheck size={16} className="text-emerald-600" />
                AI Verification: 99.8% Match Confirmed
              </span>
              <span className="rounded-full bg-emerald-200/80 px-2 py-0.5 text-[10px] font-extrabold text-emerald-900">
                DIGILOCKER LINKED
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-700">
              {activeRole === "citizen" &&
                "Aarav Mehta verified as active resident in Ratanada Ward 14. Priority civic escalation enabled."}
              {activeRole === "university" &&
                "Prof. Aarav Mehta verified at IIT Jodhpur (UGC/AISHE: U-0391). Pre-linked to 8 student engineering teams."}
              {activeRole === "ngo" &&
                "Samadhan Welfare Trust registration validated via NGO Darpan & Section 80G tax registry."}
              {activeRole === "company" &&
                "Corporate MCA ID & Schedule VII CSR eligibility certified for civic infrastructure sponsorship."}
            </p>
          </div>
        )}

        <div className="rounded-3xl bg-white/90 p-6 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5 backdrop-blur-xl sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Common Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  Basic Personal Details
                </h3>
                <span className="text-[11px] font-semibold text-slate-700">Step 1 of 2</span>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Full Name / Authorized Representative
                </label>
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
                  placeholder="e.g. Aarav Mehta"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    State
                  </label>
                  <input
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    type="text"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
                    placeholder="Rajasthan"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    City
                  </label>
                  <input
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
                    placeholder="Jodhpur"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Postal Pin Code
                </label>
                <div className="flex gap-2">
                  <input
                    required
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    type="text"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
                    placeholder="342001"
                  />
                  <button
                    type="button"
                    onClick={handleUseLocation}
                    className="flex shrink-0 items-center gap-1.5 rounded-xl bg-slate-100 px-3.5 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-200"
                  >
                    <MapPin size={15} className="text-teal-600" />
                    <span>Jodhpur</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="my-5 border-t border-slate-200" />

            {/* Role Specific Fields */}
            {activeRole === "citizen" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-teal-800">
                    Citizen Residential Profile
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-700">Step 2 of 2</span>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Residential Area / Municipal Ward
                  </label>
                  <input
                    required
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    type="text"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
                    placeholder="e.g. Ratanada, Ward 14"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Civic Interests &amp; Volunteer Preferences
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {civicOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => toggleInterest(opt)}
                        className={cn(
                          "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all",
                          interests.includes(opt)
                            ? "bg-teal-600 text-white shadow-sm"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200",
                        )}
                      >
                        {interests.includes(opt) && <Check size={12} />}
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <DocumentUploader
                    label="Upload Resident ID / Address Proof (Optional)"
                    hint="Supports Aadhaar / Voter ID (PDF, PNG, JPG). Max 10MB."
                  />
                </div>
              </div>
            )}

            {activeRole === "university" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    University Academic Profile
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-700">Step 2 of 2</span>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    University / Institution Name
                  </label>
                  <input
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    type="text"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
                    placeholder="e.g. IIT Jodhpur"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    AISHE Code / UGC Affiliation ID
                  </label>
                  <input
                    required
                    value={affilNo}
                    onChange={(e) => setAffilNo(e.target.value)}
                    type="text"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
                    placeholder="e.g. U-0391"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Department / Focus Division
                  </label>
                  <input
                    required
                    value={opRegion}
                    onChange={(e) => setOpRegion(e.target.value)}
                    type="text"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
                    placeholder="e.g. Civil & Environmental Engineering Dept"
                  />
                </div>

                <div className="pt-2">
                  <DocumentUploader
                    label="Upload University Accreditation / MoU Document"
                    hint="Supports PDF, PNG, JPG. Max 10MB."
                  />
                </div>
              </div>
            )}

            {activeRole === "ngo" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    NGO Partner Profile
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-700">Step 2 of 2</span>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    NGO / Trust Name
                  </label>
                  <input
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    type="text"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
                    placeholder="e.g. Green Earth Foundation"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    NGO Darpan ID / 12A-80G Registration Number
                  </label>
                  <input
                    required
                    value={affilNo}
                    onChange={(e) => setAffilNo(e.target.value)}
                    type="text"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
                    placeholder="e.g. RJ/2022/0194821"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Operating Sector &amp; Region
                  </label>
                  <input
                    required
                    value={opRegion}
                    onChange={(e) => setOpRegion(e.target.value)}
                    type="text"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
                    placeholder="e.g. Sanitation & Water · Jodhpur District"
                  />
                </div>

                <div className="pt-2">
                  <DocumentUploader
                    label="Upload NGO Registration Certificate / 80G Approval"
                    hint="Supports PDF, PNG, JPG. Max 10MB."
                  />
                </div>
              </div>
            )}

            {activeRole === "company" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-800">
                    Company / CSR Sponsor Profile
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-700">Step 2 of 2</span>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Company Name
                  </label>
                  <input
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    type="text"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
                    placeholder="e.g. Mehta Infrastructure Ltd."
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Corporate ID (CIN) / GSTIN
                  </label>
                  <input
                    required
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    type="text"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
                    placeholder="e.g. 08AAACM4912K1Z9"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    CSR Focus Areas (Schedule VII)
                  </label>
                  <input
                    required
                    value={csrFocus}
                    onChange={(e) => setCsrFocus(e.target.value)}
                    type="text"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none"
                    placeholder="e.g. Clean Water, Road Infrastructure, Education"
                  />
                </div>

                <div className="pt-2">
                  <DocumentUploader
                    label="Upload CSR Exemption Form / Tax Certificate"
                    hint="Supports PDF, PNG, JPG. Max 10MB."
                  />
                </div>
              </div>
            )}

            <div className="pt-4">
              <Button
                type="submit"
                disabled={busy}
                className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 px-4 py-6 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:from-teal-600 hover:to-emerald-700"
              >
                {busy ? "Saving Profile…" : `Save & Enter ${currentConfig.label} Workspace`}
                {!busy && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-emerald-50" />}>
      <OnboardingForm />
    </Suspense>
  );
}

