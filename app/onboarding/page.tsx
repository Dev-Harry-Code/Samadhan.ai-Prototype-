"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, MapPin, Check, Building2, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocumentUploader } from "@/components/ui/document-uploader";
import { cn } from "@/lib/utils";

function OnboardingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "citizen";
  const [busy, setBusy] = useState(false);

  // Common fields
  const [fullName, setFullName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");

  // Citizen fields
  const [area, setArea] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  
  // NGO fields
  const [orgName, setOrgName] = useState("");
  const [affilNo, setAffilNo] = useState("");
  const [opRegion, setOpRegion] = useState("");

  // Company fields
  const [companyName, setCompanyName] = useState("");
  const [gstin, setGstin] = useState("");
  const [csrFocus, setCsrFocus] = useState("");

  const toggleInterest = (val: string) => {
    setInterests(prev => prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val]);
  };

  const handleUseLocation = () => {
    setCity("Mumbai");
    setState("Maharashtra");
    setPinCode("400001");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);

    // Set storage based on role to authenticate
    try {
      if (role === "company") {
        window.sessionStorage.setItem("samadhan.company", "true");
      } else if (role === "ngo") {
        window.sessionStorage.setItem("samadhan.university", "true");
      } else {
        window.sessionStorage.setItem("samadhan.citizen", "true");
      }
    } catch {
      // ignore
    }
    
    setTimeout(() => {
      const destination = role === "company" ? "/funder" : role === "ngo" ? "/university" : "/";
      router.push(destination);
    }, 600);
  };

  const civicOptions = ["Roads", "Sanitation", "Water", "Electricity", "Healthcare", "Education"];

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[12%] -top-[12%] h-[28rem] w-[28rem] rounded-full bg-teal-300/30 blur-[130px]" />
        <div className="absolute -bottom-[14%] -right-[12%] h-[28rem] w-[28rem] rounded-full bg-orange-300/30 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-lg shadow-emerald-600/20">
            {role === "company" ? <Building2 size={32} /> : role === "ngo" ? <Shield size={32} /> : <User size={32} />}
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Complete Your Profile
          </h1>
          <p className="mt-2 text-sm text-slate-700">
            Let's get to know you better to personalize your experience.
          </p>
        </div>

        <div className="rounded-3xl bg-white/85 p-6 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5 backdrop-blur-xl sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Common Fields */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-teal-800">Basic Details</h3>
              
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Full Name</label>
                <input required value={fullName} onChange={e => setFullName(e.target.value)} type="text" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none" placeholder="John Doe" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">State</label>
                  <input required value={state} onChange={e => setState(e.target.value)} type="text" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none" placeholder="State" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">City</label>
                  <input required value={city} onChange={e => setCity(e.target.value)} type="text" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none" placeholder="City" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Pin Code</label>
                <div className="flex gap-2">
                  <input required value={pinCode} onChange={e => setPinCode(e.target.value)} type="text" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none" placeholder="123456" />
                  <button type="button" onClick={handleUseLocation} className="flex shrink-0 items-center gap-1.5 rounded-xl bg-slate-100 px-4 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-200">
                    <MapPin size={16} />
                    <span>Locate</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="my-6 border-t border-slate-200"></div>

            {/* Role Specific Fields */}
            {role === "citizen" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-teal-800">Citizen Profile</h3>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Area / Ward Name</label>
                  <input required value={area} onChange={e => setArea(e.target.value)} type="text" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none" placeholder="e.g. Andheri West" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Civic Interests</label>
                  <div className="flex flex-wrap gap-2">
                    {civicOptions.map(opt => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => toggleInterest(opt)}
                        className={cn(
                          "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all",
                          interests.includes(opt) ? "bg-teal-600 text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        )}
                      >
                        {interests.includes(opt) && <Check size={12} />}
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {role === "ngo" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-teal-800">NGO / University Profile</h3>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Organization / College Name</label>
                  <input required value={orgName} onChange={e => setOrgName(e.target.value)} type="text" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none" placeholder="e.g. XYZ University" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Affiliation / Registration Number</label>
                  <input required value={affilNo} onChange={e => setAffilNo(e.target.value)} type="text" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none" placeholder="Reg No." />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Operating Region</label>
                  <input required value={opRegion} onChange={e => setOpRegion(e.target.value)} type="text" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none" placeholder="State/City Level" />
                </div>
                
                <div className="pt-2">
                  <DocumentUploader
                    label="Upload NGO Registration Certificate"
                    hint="Supports PDF, PNG, JPG. Max 10MB."
                  />
                </div>
              </div>
            )}

            {role === "company" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-teal-800">Company / CSR Profile</h3>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Company Name</label>
                  <input required value={companyName} onChange={e => setCompanyName(e.target.value)} type="text" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none" placeholder="e.g. Acme Corp" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Corporate ID / GSTIN</label>
                  <input required value={gstin} onChange={e => setGstin(e.target.value)} type="text" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none" placeholder="GSTIN" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">CSR Focus Areas</label>
                  <input required value={csrFocus} onChange={e => setCsrFocus(e.target.value)} type="text" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 focus:outline-none" placeholder="e.g. Education, Environment" />
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
                {busy ? "Saving Profile..." : "Save and Go to Dashboard"}
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
