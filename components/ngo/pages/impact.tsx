"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Award,
  CheckCircle2,
  Eye,
  Heart,
  MapPin,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import { NGO_IMPACT_PROOFS, type NgoImpactProof } from "@/lib/data/ngo-mock";

export function NgoImpactPage() {
  const [proofs] = useState<NgoImpactProof[]>(NGO_IMPACT_PROOFS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProof, setSelectedProof] = useState<NgoImpactProof | null>(null);

  const categories = ["All", "Drainage & Safety", "Zero-Waste & Green Space"];

  const filteredProofs = proofs.filter((p) =>
    selectedCategory === "All" ? true : p.category === selectedCategory
  );

  const totalBeneficiaries = proofs.reduce((acc, p) => acc + p.beneficiaries, 0);

  return (
    <div className="relative z-10 mx-auto max-w-6xl space-y-6 bg-transparent p-3.5 pb-24 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
              Civic Impact & Proof of Resolution
            </h1>
          </div>
          <p className="mt-1 text-xs text-slate-600 sm:text-sm">
            Audited Before & After photographic evidence with GPS timestamps and multi-stakeholder verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>100% Geo-Tagged & Verified</span>
          </span>
        </div>
      </div>

      {/* Impact Stat Counters */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Lives Benefited</span>
            <Users className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {totalBeneficiaries.toLocaleString("en-IN")}+
          </div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">Across Jodhpur wards</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Waste Diverted</span>
            <Trash2 className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">18.4 Tons</div>
          <p className="text-[11px] text-blue-700 font-medium mt-1">Sent to formal recycling</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Volunteer Hours</span>
            <Heart className="h-4 w-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">1,240 Hrs</div>
          <p className="text-[11px] text-rose-700 font-medium mt-1">Direct community labor</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Verification Rate</span>
            <Award className="h-4 w-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">99.2%</div>
          <p className="text-[11px] text-amber-700 font-medium mt-1">Citizen audit confirmation</p>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
              selectedCategory === cat
                ? "bg-emerald-700 text-white shadow-xs"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Before & After Proofs Gallery */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProofs.map((proof) => (
          <div
            key={proof.id}
            className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs transition hover:border-emerald-300 hover:shadow-md"
          >
            {/* Visual Comparison Split */}
            <div className="relative grid grid-cols-2 gap-1 bg-slate-900 p-1">
              <div className="relative h-44 overflow-hidden rounded-2xl bg-slate-800">
                <Image
                  src={proof.beforeImage}
                  alt={`Before: ${proof.issueTitle}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-2 left-2 rounded-lg bg-rose-600/90 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
                  BEFORE
                </div>
              </div>

              <div className="relative h-44 overflow-hidden rounded-2xl bg-slate-800">
                <Image
                  src={proof.afterImage}
                  alt={`After: ${proof.issueTitle}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-2 right-2 rounded-lg bg-emerald-600/90 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
                  AFTER RESOLUTION
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                    {proof.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {proof.resolvedDate}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {proof.issueTitle}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                  <span>
                    {proof.location} ({proof.ward})
                  </span>
                </div>
              </div>

              {/* Stakeholders & Verification */}
              <div className="space-y-2.5 rounded-2xl border border-slate-100 bg-slate-50 p-3 text-xs">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="text-slate-500">Direct Beneficiaries:</span>
                  <span className="font-bold text-emerald-700">
                    {proof.beneficiaries.toLocaleString("en-IN")} citizens
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-700 border-t border-slate-200/60 pt-1.5">
                  <span className="text-slate-500">Audited By:</span>
                  <span className="font-bold text-slate-900">{proof.verifiedBy}</span>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => setSelectedProof(proof)}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50"
              >
                <Eye className="h-3.5 w-3.5 text-slate-500" />
                <span>View Full Resolution Dossier</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Citizen Feedback Carousel / Quotes */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-600">
          Ward Resident Testimonials & Verification Sign-Offs
        </h4>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-2">
            <div className="flex items-center gap-1 text-amber-500">
              {"★".repeat(5)}
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed">
              &quot;The drainage overflow behind Basni drain was stalled for months. Aditi and her volunteers mobilized with sludge pumps and cleared it within 48 hours.&quot;
            </p>
            <div className="text-[11px] font-bold text-slate-900 pt-1">
              — Suresh Chandra, Basni Traders Welfare Assoc.
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-2">
            <div className="flex items-center gap-1 text-amber-500">
              {"★".repeat(5)}
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed">
              &quot;The Sector 14 dumping corner was completely transformed into a green community space. The odor is gone and children can walk safely.&quot;
            </p>
            <div className="text-[11px] font-bold text-slate-900 pt-1">
              — Meenakshi Rathore, Resident, Ward 14
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-2">
            <div className="flex items-center gap-1 text-amber-500">
              {"★".repeat(5)}
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed">
              &quot;Remarkable civic coordination. Every task is photographed and uploaded before any funds are released. Truly transparent.&quot;
            </p>
            <div className="text-[11px] font-bold text-slate-900 pt-1">
              — Dr. K. K. Sharma, Ward Council Representative
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Full Resolution Dossier */}
      {selectedProof && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  {selectedProof.category}
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1">
                  {selectedProof.issueTitle}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProof(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-rose-600 uppercase">
                    Incident Report State
                  </span>
                  <div className="relative h-48 rounded-xl overflow-hidden bg-slate-100">
                    <Image
                      src={selectedProof.beforeImage}
                      alt="Before"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-emerald-600 uppercase">
                    Verified Clean State
                  </span>
                  <div className="relative h-48 rounded-xl overflow-hidden bg-slate-100">
                    <Image
                      src={selectedProof.afterImage}
                      alt="After"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-slate-500 font-semibold">Location:</p>
                  <p className="font-bold text-slate-800">
                    {selectedProof.location} ({selectedProof.ward})
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 font-semibold">Date of Resolution:</p>
                  <p className="font-bold text-slate-800">{selectedProof.resolvedDate}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-semibold">Citizen Beneficiaries:</p>
                  <p className="font-bold text-emerald-700">
                    {selectedProof.beneficiaries} citizens
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 font-semibold">Statutory Verification:</p>
                  <p className="font-bold text-slate-800">{selectedProof.verifiedBy}</p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedProof(null)}
                  className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-black"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
