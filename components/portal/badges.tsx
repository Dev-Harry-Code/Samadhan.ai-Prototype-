"use client";

import { cn } from "@/lib/utils";
import {
  COMPANY_SEVERITY_MAP,
  COMPANY_STATUS_MAP,
  type CompanySeverity,
  type CompanyStatus,
} from "@/lib/data/company-mock";
import type { UniversityReportStatus } from "@/lib/data/university-mock";

export function CompanyStatusBadge({ status }: { status: CompanyStatus }) {
  const meta = COMPANY_STATUS_MAP[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ring-1 ring-inset ring-black/5",
        meta.color,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
      {meta.label}
    </span>
  );
}

export function CompanySeverityBadge({ severity }: { severity: CompanySeverity }) {
  const meta = COMPANY_SEVERITY_MAP[severity];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ring-1 ring-inset ring-black/5",
        meta.color,
      )}
    >
      {severity}
    </span>
  );
}

export function CompanyDepartmentTag({ department }: { department: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
      {department}
    </span>
  );
}

const UNIVERSITY_STATUS_STYLES: Record<UniversityReportStatus, string> = {
  "In Progress": "bg-amber-100 text-amber-800",
  Assigned: "bg-blue-100 text-blue-800",
  Pending: "bg-slate-100 text-slate-700",
  Resolved: "bg-emerald-100 text-emerald-800",
};

export function UniversityStatusBadge({ status }: { status: UniversityReportStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ring-1 ring-inset ring-black/5",
        UNIVERSITY_STATUS_STYLES[status],
      )}
    >
      <span className="mr-1">•</span>
      {status}
    </span>
  );
}

const UNIVERSITY_URGENCY_STYLES: Record<"High" | "Medium" | "Low", string> = {
  High: "bg-red-50 text-red-700 ring-red-200",
  Medium: "bg-amber-50 text-amber-800 ring-amber-200",
  Low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

export function UniversityUrgencyBadge({ urgency }: { urgency: "High" | "Medium" | "Low" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 ring-inset",
        UNIVERSITY_URGENCY_STYLES[urgency],
      )}
    >
      Urgency: {urgency}
    </span>
  );
}