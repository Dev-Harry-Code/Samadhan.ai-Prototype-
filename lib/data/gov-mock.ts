import {
  DISTRICT_SERIES,
  IMPACT_SERIES,
  PLATFORM_STATS,
} from "@/lib/data/mock-data";
import type { DistrictDatum } from "@/components/government/district-map";

export const GOV_FALLBACK_STATS = {
  issuesReported: PLATFORM_STATS.issuesReported,
  validated: PLATFORM_STATS.validated,
  workedOn: PLATFORM_STATS.workedOn,
  deployed: PLATFORM_STATS.deployed,
  districts: PLATFORM_STATS.districts,
  universities: PLATFORM_STATS.universities,
  funders: PLATFORM_STATS.funders,
};

export const DISTRICTS: DistrictDatum[] = DISTRICT_SERIES.map((d) => ({
  district: d.district,
  count: d.count,
  active: Math.round(d.count * 0.34),
  resolved: Math.round(d.count * 0.18),
}));

export const SECTOR_SHARE = [
  { name: "Water", label: "water", total: 4413, pct: 31 },
  { name: "Healthcare", label: "healthcare", total: 3131, pct: 22 },
  { name: "Sanitation", label: "sanitation", total: 2562, pct: 18 },
  { name: "Agriculture", label: "agriculture", total: 1708, pct: 12 },
  { name: "Accessibility", label: "accessibility", total: 1139, pct: 8 },
];

export const MONTHLY_TREND = IMPACT_SERIES.map((m) => ({
  month: m.month,
  reported: m.submitted,
  resolved: m.verified,
}));

export const LEADERBOARD_DATA = {
  universities: [
    { name: "IIT Jodhpur", value: 46 },
    { name: "AIIMS Jodhpur", value: 39 },
    { name: "BIT Mesra", value: 28 },
    { name: "Mody University", value: 22 },
    { name: "GPC Jodhpur", value: 17 },
  ],
  districts: DISTRICT_SERIES.map((d) => ({ name: d.district, value: d.count })).slice(0, 6),
};