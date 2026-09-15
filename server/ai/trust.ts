import type { AnalyzeRequest, TrustFactors, TrustResult } from "./types";

interface TrustInput {
  description: string;
  location?: AnalyzeRequest["location"];
  photo?: string | boolean | null;
  reporterKarma?: number | string | null;
  similarPriorCount: number;
}

function toNumber(value: number | string | null | undefined): number | undefined {
  if (value == null || value === "") return undefined;
  const num = Number(value);
  return Number.isFinite(num) ? num : undefined;
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).length;
}

export function computeTrustScore(input: TrustInput): TrustResult {
  const factors: TrustFactors = {
    base: 44,
    description: 0,
    photo: 0,
    gps: 0,
    similarPrior: 0,
    karma: 0,
  };

  const words = wordCount(input.description);
  factors.description = Math.min(18, Math.round(words * 0.45));

  const hasPhoto =
    input.photo === true ||
    (typeof input.photo === "string" && input.photo.trim().length > 0);
  if (hasPhoto) factors.photo = 15;

  const lat = toNumber(input.location?.lat);
  const lng = toNumber(input.location?.lng);
  if (lat !== undefined && lng !== undefined) factors.gps = 13;

  factors.similarPrior = Math.min(8, Math.round(input.similarPriorCount * 2.2));

  const karma = toNumber(input.reporterKarma);
  if (karma !== undefined) factors.karma = Math.min(10, Math.round(karma / 60));

  const raw =
    factors.base +
    factors.description +
    factors.photo +
    factors.gps +
    factors.similarPrior +
    factors.karma;
  const score = Math.min(100, Math.max(0, raw));

  return { score, max: 100, factors };
}