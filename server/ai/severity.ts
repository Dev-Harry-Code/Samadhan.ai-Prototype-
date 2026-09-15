import type { Severity } from "@/lib/types";

import type { SeverityResult } from "./types";

const CRITICAL_PHRASES = [
  "life threatening",
  "life-threatening",
  "fatal",
  "death",
  "disease",
  "outbreak",
  "contaminated",
  "emergency",
  "collapse",
  "poison",
  "no drinking water",
];

const HIGH_PHRASES = [
  "children",
  "school",
  "students",
  "weeks",
  "months",
  "days",
  "overflow",
  "overflowing",
  "blocked",
  "one doctor",
  "shortage",
  "runs out",
  "fractured",
  "leak",
  "flood",
  "accident",
];

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function computeSeverity(
  description: string,
  peopleAffected?: number | string | null,
): SeverityResult {
  const people = Number.isFinite(Number(peopleAffected))
    ? Math.max(0, Number(peopleAffected))
    : 0;

  let score = Math.min(65, people * 0.18);
  const reasons: string[] = [];

  if (people > 0) {
    reasons.push(`${people} people affected`);
  }

  const plain = normalize(description);
  for (const phrase of CRITICAL_PHRASES) {
    if (plain.includes(phrase)) {
      score += 15;
      reasons.push(`critical signal: "${phrase}"`);
    }
  }
  for (const phrase of HIGH_PHRASES) {
    if (plain.includes(phrase)) {
      score += 8;
      reasons.push(`high signal: "${phrase}"`);
    }
  }

  score = Math.min(100, Math.round(score));

  let severity: Severity;
  if (score >= 78) severity = "Critical";
  else if (score >= 36) severity = "High";
  else if (score >= 28) severity = "Medium";
  else severity = "Low";

  return { severity, score, reasons: reasons.slice(0, 6) };
}