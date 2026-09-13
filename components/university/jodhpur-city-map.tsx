"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, MapPin, Navigation, ZoomIn, ZoomOut } from "lucide-react";

// Geo-coordinates in Jodhpur for real locations
export const JODHPUR_COORDINATES = {
  center: { lat: 26.2885, lng: 73.0243 }, // Jodhpur Central
  zoom: 13,
  landmarks: [
    {
      id: "mehrangarh",
      name: "Mehrangarh Fort & Old City",
      type: "heritage",
      lat: 26.2978,
      lng: 73.0185,
      issuesCount: 3,
      status: "Monitored",
    },
    {
      id: "ratanada",
      name: "Ratanada & Circuit House",
      type: "infrastructure",
      lat: 26.2735,
      lng: 73.0335,
      issuesCount: 4,
      status: "In Progress",
    },
    {
      id: "shastri-nagar",
      name: "Shastri Nagar Ward 12",
      type: "sanitation",
      lat: 26.2825,
      lng: 73.0065,
      issuesCount: 2,
      status: "Assigned",
    },
    {
      id: "chopasni",
      name: "Chopasni Road / Sector 5",
      type: "water",
      lat: 26.2915,
      lng: 72.9825,
      issuesCount: 5,
      status: "Pending",
    },
    {
      id: "iit-campus",
      name: "IIT Jodhpur Campus (Karwar)",
      type: "university",
      lat: 26.4715,
      lng: 73.1135,
      issuesCount: 0,
      status: "Lead Partner",
    },
    {
      id: "aiims-campus",
      name: "AIIMS Jodhpur (Basni)",
      type: "university",
      lat: 26.2415,
      lng: 73.0085,
      issuesCount: 1,
      status: "Partner Uni",
    },
  ],
};

export function JodhpurCityMap({ className = "" }: { className?: string }) {
  const [activeItem, setActiveItem] = useState<(typeof JODHPUR_COORDINATES.landmarks)[0] | null>(
    JODHPUR_COORDINATES.landmarks[1] // Default to Ratanada (Report 001)
  );
  const [zoomLevel, setZoomLevel] = useState(13);

  // Map center bounds for OpenStreetMap embed iframe
  const centerLat = activeItem?.lat ?? JODHPUR_COORDINATES.center.lat;
  const centerLng = activeItem?.lng ?? JODHPUR_COORDINATES.center.lng;
  const delta = 0.035 / Math.pow(1.3, zoomLevel - 13);
  const bbox = `${(centerLng - delta * 1.5).toFixed(4)}%2C${(centerLat - delta).toFixed(4)}%2C${(centerLng + delta * 1.5).toFixed(4)}%2C${(centerLat + delta).toFixed(4)}`;

  return (
    <div className={`relative h-[380px] w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 sm:h-[440px] ${className}`}>
      {/* Real OpenStreetMap View of Jodhpur */}
      <iframe
        key={`${centerLat}-${centerLng}-${zoomLevel}`}
        title="Jodhpur Current Live Map"
        width="100%"
        height="100%"
        loading="lazy"
        className="h-full w-full border-0"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${centerLat}%2C${centerLng}`}
      />

      {/* Map Header Floating Overlay */}
      <div className="absolute left-3 top-3 z-10 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-md">
          <span className="h-2.5 w-2.5 animate-ping rounded-full bg-emerald-500"></span>
          <span className="text-xs font-bold text-slate-900">Jodhpur Live Civic GIS</span>
          <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-800">
            26.2885° N, 73.0243° E
          </span>
        </div>
      </div>

      {/* Map Control Actions */}
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5">
        <button
          onClick={() => setZoomLevel((z) => Math.min(z + 1, 16))}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white/95 text-slate-700 shadow-md transition hover:bg-slate-50 active:scale-95"
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(z - 1, 11))}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white/95 text-slate-700 shadow-md transition hover:bg-slate-50 active:scale-95"
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </button>
        <a
          href="https://www.google.com/maps/place/Jodhpur,+Rajasthan"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white/95 text-slate-700 shadow-md transition hover:bg-slate-50 active:scale-95"
          title="Open in Google Maps"
        >
          <ExternalLink size={15} />
        </a>
      </div>

      {/* Interactive Hotspot Pills (Ward & Location Selector) */}
      <div className="absolute bottom-3 left-3 right-3 z-10">
        <div className="flex items-center gap-2 overflow-x-auto rounded-2xl border border-slate-200/90 bg-white/95 p-2 shadow-xl backdrop-blur-md scrollbar-none">
          <span className="flex shrink-0 items-center gap-1 pl-1 text-[11px] font-bold text-slate-700">
            <Navigation size={12} className="text-primary-600" /> Wards:
          </span>
          {JODHPUR_COORDINATES.landmarks.map((landmark) => {
            const isSelected = activeItem?.id === landmark.id;
            return (
              <button
                key={landmark.id}
                onClick={() => setActiveItem(landmark)}
                className={`flex shrink-0 items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold transition ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200/70"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    landmark.status === "In Progress"
                      ? "bg-amber-400"
                      : landmark.status === "Assigned"
                      ? "bg-sky-400"
                      : landmark.status === "Lead Partner" || landmark.status === "Partner Uni"
                      ? "bg-purple-400"
                      : "bg-emerald-400"
                  }`}
                />
                <span className="truncate max-w-[140px] sm:max-w-none">{landmark.name}</span>
                {landmark.issuesCount > 0 && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                      isSelected ? "bg-white/20 text-white" : "bg-white text-slate-800"
                    }`}
                  >
                    {landmark.issuesCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Highlight Card for the Selected Jodhpur Ward */}
        {activeItem && (
          <div className="mt-2 hidden rounded-2xl border border-slate-200/90 bg-white/95 p-3 shadow-lg backdrop-blur-md sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700 ring-1 ring-primary-200">
                <MapPin size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-slate-900">{activeItem.name}</p>
                  <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                    {activeItem.status}
                  </span>
                </div>
                <p className="text-xs text-slate-700">
                  {activeItem.issuesCount > 0
                    ? `${activeItem.issuesCount} active civic issues reported in this zone`
                    : "Primary academic research partner site"}
                </p>
              </div>
            </div>
            <Link
              href="/university/reports"
              className="flex items-center gap-1 rounded-xl bg-primary-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-primary-700"
            >
              View Reports
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
