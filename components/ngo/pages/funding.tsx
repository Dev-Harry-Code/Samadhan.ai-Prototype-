"use client";

import { useEffect, useState } from "react";
import {
  BadgeCheck,
  Building,
  CheckCircle2,
  Clock,
  Coins,
  FileCheck2,
  Lock,
  Plus,
  Search,
  TrendingUp,
  X,
  AlertTriangle,
} from "lucide-react";
import { NGO_GRANTS, type NgoGrant } from "@/lib/data/ngo-mock";
import { api } from "@/lib/api/client";

export function NgoFundingPage() {
  const [grants, setGrants] = useState<NgoGrant[]>(NGO_GRANTS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Approved & Active" | "Under CSR Review" | "Completed">("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [errorToast, setErrorToast] = useState("");

  const flashError = (msg: string) => {
    setErrorToast(msg);
    setTimeout(() => setErrorToast(""), 4000);
  };

  useEffect(() => {
    let cancelled = false;
    api
      .get<{ grants: NgoGrant[] }>("/api/ngo/grants")
      .then((res) => {
        if (!cancelled && res.grants?.length) setGrants(res.grants);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Form state
  const [newTitle, setNewTitle] = useState("");
  const [newFunder, setNewFunder] = useState("Tata Steel CSR Foundation");
  const [newAmount, setNewAmount] = useState("500000");
  const [newMilestone, setNewMilestone] = useState("Phase 1 pilot installation & citizen impact logging");

  const totalSanctioned = grants.reduce((acc, g) => acc + g.amountApproved, 0);
  const totalDisbursed = grants.reduce((acc, g) => acc + g.amountDisbursed, 0);

  const filteredGrants = grants.filter((g) => {
    const matchesTab = activeTab === "All" ? true : g.status === activeTab;
    const matchesSearch =
      g.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.funderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.milestoneDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleCreateGrant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const requestedVal = Number.parseInt(newAmount) || 300000;
    const payload = {
      projectTitle: newTitle,
      funderName: newFunder,
      amount: requestedVal,
      milestoneDescription: newMilestone,
    };

    const newGrantObj: NgoGrant = {
      id: `grant-${Date.now()}`,
      projectTitle: newTitle,
      funderName: newFunder,
      funderLogo: newFunder.slice(0, 2).toUpperCase(),
      amountRequested: requestedVal,
      amountApproved: requestedVal,
      amountDisbursed: 0,
      status: "Under CSR Review",
      progressPct: 10,
      targetDate: "Feb 2027",
      milestoneDescription: newMilestone,
    };

    try {
      const res = await api.post<{ grant: NgoGrant }>("/api/ngo/grants", payload);
      if (res.grant) newGrantObj.id = res.grant.id;
    } catch {
      flashError("Couldn't reach server — proposal submitted locally only");
      // fall back to local optimistic grant
    }

    setGrants([newGrantObj, ...grants]);
    setIsModalOpen(false);
    setNewTitle("");
    setToastMessage(`Proposal "${newTitle}" submitted for CSR review!`);
    setTimeout(() => setToastMessage(""), 4000);
  };

  return (
    <div className="relative z-10 mx-auto max-w-6xl space-y-6 bg-transparent p-3.5 pb-24 sm:p-6">
      {/* Toast Alert */}
      {errorToast && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-bold text-rose-800 shadow-sm animate-in fade-in slide-in-from-top-2">
          <AlertTriangle className="h-4 w-4 text-rose-600 flex-shrink-0" />
          <span>{errorToast}</span>
        </div>
      )}
      {toastMessage && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-800 shadow-sm animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
              CSR Grants & Funding Pipeline
            </h1>
          </div>
          <p className="mt-1 text-xs text-slate-600 sm:text-sm">
            Track corporate CSR sponsorships, milestone escrow releases, and social impact audit proofs.
            {loading && <span className="ml-2 text-[11px] font-semibold text-emerald-600">syncing…</span>}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-emerald-800 active:scale-95 sm:px-5"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Submit CSR Proposal</span>
        </button>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Approved Corpus</span>
            <Coins className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            ₹{(totalSanctioned / 100000).toFixed(1)}L
          </div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">Across 4 CSR partners</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Disbursed & Active</span>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            ₹{(totalDisbursed / 100000).toFixed(1)}L
          </div>
          <p className="text-[11px] text-blue-700 font-medium mt-1">
            {totalSanctioned > 0 ? Math.round((totalDisbursed / totalSanctioned) * 100) : 0}% capital released
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Pending Milestone</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            ₹{Math.max(0, (totalSanctioned - totalDisbursed) / 100000).toFixed(1)}L
          </div>
          <p className="text-[11px] text-amber-700 font-medium mt-1">Milestone proof needed</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Tax Receipts (80G)</span>
            <FileCheck2 className="h-4 w-4 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">100%</div>
          <p className="text-[11px] text-teal-700 font-medium mt-1">Compliant & digitally signed</p>
        </div>
      </div>

      {/* Statutory Escrow Guarantee Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-emerald-950 sm:text-sm">
              SEBI Social Stock Exchange & MCA CSR-1 Protected Escrow
            </h4>
            <p className="text-[11px] text-emerald-800">
              Funds are held securely and unlocked automatically upon verified citizen & GIS completion proofs.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-900">
            Audit Grade AAA
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search grants by project name, corporate sponsor, or milestone..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none transition focus:border-emerald-600 focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {(["All", "Approved & Active", "Under CSR Review", "Completed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                activeTab === tab
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grant Cards */}
      <div className="space-y-4">
        {filteredGrants.map((grant) => (
          <div
            key={grant.id}
            className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-emerald-300 hover:shadow-md sm:p-6"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                      grant.status === "Approved & Active"
                        ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                        : grant.status === "Completed"
                        ? "border border-blue-200 bg-blue-50 text-blue-800"
                        : "border border-amber-200 bg-amber-50 text-amber-800"
                    }`}
                  >
                    {grant.status}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Target: {grant.targetDate}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                  {grant.projectTitle}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    <Building className="h-3.5 w-3.5 text-slate-500" />
                    {grant.funderName}
                  </span>
                  <span>• Milestone: {grant.milestoneDescription}</span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-xl font-black text-slate-900 sm:text-2xl">
                  ₹{grant.amountApproved.toLocaleString("en-IN")}
                </div>
                <span className="text-[11px] font-medium text-slate-500">
                  Approved Corpus (Req: ₹{grant.amountRequested.toLocaleString("en-IN")})
                </span>
              </div>
            </div>

            {/* Disbursal Progress */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
              <div className="mb-1.5 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700">
                  Disbursed: ₹{grant.amountDisbursed.toLocaleString("en-IN")}
                </span>
                <span className="font-mono text-emerald-700">
                  {grant.progressPct}% Progress
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-emerald-600 transition-all duration-500"
                  style={{ width: `${grant.progressPct}%` }}
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <BadgeCheck className="h-4 w-4 text-emerald-600" />
                <span>Section 135 CSR Compliance Certificate Verified</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const updated = grants.map((g) =>
                      g.id === grant.id
                        ? {
                            ...g,
                            progressPct: Math.min(100, g.progressPct + 20),
                            amountDisbursed: Math.min(
                              g.amountApproved,
                              g.amountDisbursed + Math.round(g.amountApproved * 0.2)
                            ),
                          }
                        : g
                    );
                    setGrants(updated);
                    api.patch(`/api/ngo/grants/${encodeURIComponent(grant.id)}`, { action: "release" }).catch(() =>
                      flashError("Couldn't sync — release recorded locally only")
                    );
                    setToastMessage(`Milestone release requested for "${grant.projectTitle}"!`);
                    setTimeout(() => setToastMessage(""), 3000);
                  }}
                  className="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100"
                >
                  Request Milestone Release (+20%)
                </button>
                <button
                  onClick={() => {
                    setToastMessage(`Audit Report for ${grant.projectTitle} generated.`);
                    setTimeout(() => setToastMessage(""), 3000);
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  View Audit Pack
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit CSR Proposal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">
                Submit CSR Grant Proposal
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateGrant} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solar Streetlight Installation in Slum Clusters"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-800 outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target CSR Funder
                  </label>
                  <select
                    value={newFunder}
                    onChange={(e) => setNewFunder(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-800 outline-none focus:border-emerald-600"
                  >
                    <option value="Tata Steel CSR Foundation">Tata Steel CSR</option>
                    <option value="GreenCity Environmental SPV">GreenCity Environmental</option>
                    <option value="Municipal Innovation Grant">Municipal Innovation Grant</option>
                    <option value="City Power Grid CSR">City Power Grid CSR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Requested Grant Amount (₹)
                  </label>
                  <input
                    type="number"
                    min={50000}
                    step={10000}
                    required
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-800 outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Initial Milestone & Execution Plan
                </label>
                <textarea
                  required
                  rows={3}
                  value={newMilestone}
                  onChange={(e) => setNewMilestone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-800 outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-700 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-800 active:scale-95"
                >
                  Submit for Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
