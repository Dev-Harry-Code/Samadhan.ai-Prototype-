import type { Issue } from "@/lib/akshat-types";

export type Translate = (key: string, fallback?: string) => string;

export const CATEGORY_KEYS: Record<string, string> = {
  "Water Resources": "catWater",
  Sanitation: "catGarbage",
  Infrastructure: "catRoad",
  Roads: "catRoad",
  Electricity: "catElectricity",
  Transport: "catTransport",
  Healthcare: "catHealthcare",
};

export const STATUS_KEYS: Record<string, string> = {
  New: "statusNew",
  "Under review": "statusUnderReview",
  "In progress": "statusInProgress",
  Resolved: "statusResolved",
};

export function categoryText(t: Translate, category: string): string {
  const key = CATEGORY_KEYS[category];
  return key ? t(key, category) : category;
}

export function statusText(t: Translate, status: string): string {
  const key = STATUS_KEYS[status];
  return key ? t(key, status) : status;
}

export function issueField(
  t: Translate,
  issue: Pick<Issue, "id">,
  field: "title" | "description" | "location" | "assignedUniversity",
  fallback: string,
): string {
  return t(`issue.${issue.id}.${field}`, fallback);
}

export function notifField(
  t: Translate,
  id: string,
  field: "title" | "body" | "timeAgo",
  fallback: string,
): string {
  return t(`notif.${id}.${field}`, fallback);
}

export function volunteerField(
  t: Translate,
  id: string,
  field: "name" | "role" | "badge",
  fallback: string,
): string {
  return t(`volunteer.${id}.${field}`, fallback);
}

export function commentField(
  t: Translate,
  id: string,
  field: "text" | "authorRole" | "daysAgo",
  fallback: string,
): string {
  return t(`comment.${id}.${field}`, fallback);
}