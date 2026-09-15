import { NextResponse } from "next/server";

import { classify, isValidCategory } from "@/server/ai/classify";
import { findDuplicates } from "@/server/ai/duplicates";
import { matchUniversities } from "@/server/ai/match";
import { buildResearch } from "@/server/ai/research";
import { computeSeverity } from "@/server/ai/severity";
import { computeTrustScore } from "@/server/ai/trust";
import type { AnalyzeRequest, AnalyzeResponse } from "@/server/ai/types";

export const runtime = "nodejs";

function toNullableNumber(value: unknown): number | null {
  if (value == null || value === "") return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function toNullableString(value: unknown): string | null {
  if (typeof value === "string" && value.trim().length > 0) return value.trim();
  if (typeof value === "boolean") return value ? "true" : null;
  return null;
}

function normalizeLocation(raw: unknown): AnalyzeRequest["location"] {
  if (!raw || typeof raw !== "object") return null;
  const loc = raw as Record<string, unknown>;
  const lat = Number(loc.lat);
  const lng = Number(loc.lng);
  return {
    lat: Number.isFinite(lat) ? lat : undefined,
    lng: Number.isFinite(lng) ? lng : undefined,
    label: typeof loc.label === "string" ? loc.label : undefined,
    ward: typeof loc.ward === "string" ? loc.ward : undefined,
    district: typeof loc.district === "string" ? loc.district : undefined,
  };
}

export async function POST(request: Request) {
  let body: AnalyzeRequest | null;
  try {
    body = (await request.json()) as AnalyzeRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const description = typeof body?.description === "string" ? body.description.trim() : "";
  if (description.length < 8) {
    return NextResponse.json(
      { error: "Description is required (at least 8 characters)" },
      { status: 400 },
    );
  }

  const rawCategory = typeof body?.category === "string" ? body.category.trim() : "";
  const category = isValidCategory(rawCategory) ? rawCategory : undefined;
  const peopleAffected = toNullableNumber(body?.peopleAffected);
  const reporterKarma = toNullableNumber(body?.reporterKarma);
  const location = normalizeLocation(body?.location);
  const photo = toNullableString(body?.photo ?? null);

  try {
    const [classification, duplicates] = await Promise.all([
      classify(description, category),
      findDuplicates(description),
    ]);

    const severity = computeSeverity(description, peopleAffected);
    const trustScore = computeTrustScore({
      description,
      location,
      photo,
      reporterKarma,
      similarPriorCount: duplicates.similarCount,
    });

    const [research, matches] = await Promise.all([
      buildResearch(classification.category),
      matchUniversities(classification.category),
    ]);

    const response: AnalyzeResponse = {
      classification,
      severity,
      trustScore,
      duplicates,
      research,
      matches,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("ai/analyze failed", error);
    return NextResponse.json(
      { error: "AI analysis failed" },
      { status: 500 },
    );
  }
}