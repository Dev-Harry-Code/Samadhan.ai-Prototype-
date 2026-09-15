"use client";

import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Layers,
  MapPin,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  Users,
  X,
  Zap,
} from "lucide-react";
import { NGO_DRIVES, type NgoDrive } from "@/lib/data/ngo-mock";

export function NgoDrivesPage() {
  const [drives, setDrives] = useState<NgoDrive[]>(NGO_DRIVES);
  const [activeFilter, setActiveFilter] = useState<"All" | "Active Now" | "Scheduled" | "Completed">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Drive Form State
  const [newTitle, setNewTitle] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newWard, setNewWard] = useState("Ward 18 (Mandore)");
  const [newCategory, setNewCategory] = useState<NgoDrive["category"]>("Sanitation & Waste");
  const [newVolunteers, setNewVolunteers] = useState("20");
  const [newEquipment, setNewEquipment] = useState("Safety Gloves, Trash Bags, Wheelbarrows");
  const [successToast, setSuccessToast] = useState("");

  const filteredDrives = drives.filter((drive) => {
    const matchesFilter =
      activeFilter === "All" ? true : drive.status === activeFilter;
    const matchesSearch =
      drive.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drive.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drive.ward.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCreateDrive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newDriveObj: NgoDrive = {
      id: `drive-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      location: newLocation || "Jodhpur Municipal Area",
      ward: newWard,
      scheduledDate: "Tomorrow · 07:30 AM",
      status: "Scheduled",
      volunteersRequired: Number.parseInt(newVolunteers) || 15,
      volunteersRegistered: 1,
      budgetAllocated: 15000,
      budgetSpent: 0,
      equipment: newEquipment.split(",").map((s) => s.trim()).filter(Boolean),
      csrSponsor: "Tata Steel CSR Foundation",
      description: "Community-driven rapid cleanup and civic restoration drive in Jodhpur.",
    };

    setDrives([newDriveObj, ...drives]);
    setIsModalOpen(false);
    setNewTitle("");
    setNewLocation("");
    setSuccessToast(`Field Drive "${newTitle}" scheduled successfully!`);
    setTimeout(() => setSuccessToast(""), 4000);
  };

  return (
    <div className="relative z-10 mx-auto max-w-6xl space-y-6 bg-transparent p-3.5 pb-24 sm:p-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-800 shadow-sm animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" />
            <h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
              Civic Field Drives & Operations
            </h1>
          </div>
          <p className="mt-1 text-xs text-slate-600 sm:text-sm">
            Mobilize volunteer teams, monitor equipment logistics, and log grassroots resolution on the ground.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-amber-700 active:scale-95 sm:px-5"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Schedule New Drive</span>
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Active Now</span>
            <Zap className="h-4 w-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {drives.filter((d) => d.status === "Active Now").length}
          </div>
          <p className="text-[11px] text-amber-700 font-medium mt-1">Ground crews deployed</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Scheduled Drives</span>
            <Calendar className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {drives.filter((d) => d.status === "Scheduled").length}
          </div>
          <p className="text-[11px] text-blue-700 font-medium mt-1">Upcoming this week</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Volunteers Ready</span>
            <Users className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">74</div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">In Jodhpur volunteer roster</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Kit Readiness</span>
            <PackageCheck className="h-4 w-4 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">100%</div>
          <p className="text-[11px] text-teal-700 font-medium mt-1">Tools & safety gear stocked</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search drives by title, ward, or location..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none transition focus:border-amber-500 focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {(["All", "Active Now", "Scheduled", "Completed"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                activeFilter === filter
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Drives Cards Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filteredDrives.map((drive) => {
          const percentJoined = Math.min(
            100,
            Math.round((drive.volunteersRegistered / drive.volunteersRequired) * 100)
          );

          return (
            <div
              key={drive.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-amber-300 hover:shadow-md sm:p-6"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        drive.status === "Active Now"
                          ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                          : drive.status === "Scheduled"
                          ? "border border-blue-200 bg-blue-50 text-blue-800"
                          : "border border-slate-200 bg-slate-100 text-slate-600"
                      }`}
                    >
                      {drive.status === "Active Now" && (
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                      )}
                      {drive.status}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {drive.title}
                    </h3>
                  </div>

                  {drive.csrSponsor && (
                    <span className="rounded-xl border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-800 flex-shrink-0">
                      Sponsored by {drive.csrSponsor}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {drive.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
                    <span className="truncate">{drive.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
                    <span className="truncate">{drive.ward}</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    <Clock className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                    <span>{drive.scheduledDate}</span>
                  </div>
                </div>

                {/* Volunteer Recruitment Bar */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-700">
                      Volunteers: {drive.volunteersRegistered} / {drive.volunteersRequired} Registered
                    </span>
                    <span className="font-mono text-amber-700">{percentJoined}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        percentJoined >= 100
                          ? "bg-emerald-600"
                          : "bg-amber-600"
                      }`}
                      style={{ width: `${percentJoined}%` }}
                    />
                  </div>
                </div>

                {/* Supplies Needed Tags */}
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                    Required Equipment:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {drive.equipment.map((item, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
                <button
                  onClick={() => {
                    const updated = drives.map((d) =>
                      d.id === drive.id
                        ? {
                            ...d,
                            volunteersRegistered: Math.min(
                              d.volunteersRequired,
                              d.volunteersRegistered + 1
                            ),
                          }
                        : d
                    );
                    setDrives(updated);
                    setSuccessToast(`1 Volunteer deployed to "${drive.title}"!`);
                    setTimeout(() => setSuccessToast(""), 3000);
                  }}
                  className="flex-1 rounded-xl bg-amber-600 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-amber-700 active:scale-95"
                >
                  Deploy Volunteer (+1)
                </button>
                <button
                  onClick={() => {
                    const updated = drives.map((d) =>
                      d.id === drive.id
                        ? {
                            ...d,
                            status: (d.status === "Completed"
                              ? "Active Now"
                              : "Completed") as NgoDrive["status"],
                          }
                        : d
                    );
                    setDrives(updated);
                  }}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
                >
                  {drive.status === "Completed" ? "Re-open" : "Mark Done"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Schedule Drive Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">
                Schedule New Civic Field Drive
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDrive} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Drive Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mandore Garden Waste Clearance"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-800 outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Specific Location
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Near West Gate"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-800 outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ward Designation
                  </label>
                  <input
                    type="text"
                    required
                    value={newWard}
                    onChange={(e) => setNewWard(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-800 outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as NgoDrive["category"])}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-800 outline-none focus:border-amber-500"
                  >
                    <option value="Sanitation & Waste">Sanitation & Waste</option>
                    <option value="Water Body Revival">Water Body Revival</option>
                    <option value="Green Cover">Green Cover</option>
                    <option value="Disaster Relief">Disaster Relief</option>
                    <option value="Public Safety">Public Safety</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Volunteers Needed
                  </label>
                  <input
                    type="number"
                    min={2}
                    max={100}
                    required
                    value={newVolunteers}
                    onChange={(e) => setNewVolunteers(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-800 outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Required Equipment (comma separated)
                </label>
                <input
                  type="text"
                  value={newEquipment}
                  onChange={(e) => setNewEquipment(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-800 outline-none focus:border-amber-500"
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
                  className="rounded-xl bg-amber-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-amber-700 active:scale-95"
                >
                  Confirm & Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
