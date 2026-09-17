import { MapPin, type LucideIcon } from "lucide-react";

import type { CompanyIssue, CompanySeverity, CompanyStatus } from "@/lib/data/company-mock";
import type { ApiIssue, ApiIssueDetail } from "@/lib/api/models";
import { timeAgoFromIso } from "@/lib/akshat-mapper";

const STATUS_MAP: Record<string, CompanyStatus> = {
  reported: "open",
  ai_validated: "pending",
  team_formed: "in_progress",
  proposed: "pending",
  funded: "in_progress",
  deployed: "in_progress",
  resolved: "resolved",
};

export function companyIssueStatus(status: string): CompanyStatus {
  return STATUS_MAP[status] ?? "open";
}

export function apiIssueToCompanyIssue(issue: ApiIssue): CompanyIssue {
  const severity = (issue.severity as CompanySeverity) || "Medium";
  const status = companyIssueStatus(issue.status);

  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    category: issue.categoryLabel || issue.category,
    severity,
    status,
    priority: severity,
    assignee: issue.assignedUniversity?.name ?? "Unassigned",
    department: issue.assignedUniversity?.shortName ?? "Civic Issues",
    reportedBy: issue.reportedBy || issue.postedBy || "Citizen",
    reportedAt: timeAgoFromIso(issue.createdAt),
    area: issue.location.label || issue.location.district,
    upvotes: issue.upvotes ?? 0,
    verified: issue.status !== "reported" ? true : null,
    duplicate: Boolean(issue.duplicateOfId),
    confidence: issue.trustScore != null ? issue.trustScore / 100 : 0,
    coordinates: { x: 50, y: 50 },
    beforeImage: (MapPin as LucideIcon) as LucideIcon,
    afterImage: null,
    sentiment: "Neutral",
    resolutionETA: issue.status === "resolved" ? "Resolved" : "In pipeline",
    revenueEstimate: 0,
    aiSummary: undefined,
  };
}

export function apiDetailToCompanyIssue(detail: ApiIssueDetail): CompanyIssue {
  const issue = apiIssueToCompanyIssue(detail.issue);
  const analysis = detail.analysis as
    | { summary?: string; classificationConfidence?: number; timeline?: string }
    | null
    | undefined;

  return {
    ...issue,
    aiSummary: analysis?.summary,
    confidence: analysis?.classificationConfidence ?? issue.confidence,
    resolutionETA: detail.team ? (issue.status === "resolved" ? "Resolved" : "Team on site") : "Awaiting assignment",
    revenueEstimate: issue.status === "resolved" ? 12000 : issue.status === "in_progress" ? 8000 : 0,
  };
}