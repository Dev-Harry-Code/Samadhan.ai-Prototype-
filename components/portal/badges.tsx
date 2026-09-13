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
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold",
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
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold",
        meta.color,
      )}
    >
      {severity}
    </span>
  );
}

export function CompanyDepartmentTag({ department }: { department: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700">
      {department}
    </span>
  );
}

const UNIVERSITY_STATUS_STYLES: Record<UniversityReportStatus, string> = {
  "In Progress": "bg-blue-50 text-blue-800 border border-blue-200",
  Assigned: "bg-slate-100 text-slate-800 border border-slate-300",
  Pending: "bg-amber-50 text-amber-900 border border-amber-200",
  Resolved: "bg-emerald-50 text-emerald-800 border border-emerald-200",
};

export function UniversityStatusBadge({ status }: { status: UniversityReportStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold",
        UNIVERSITY_STATUS_STYLES[status],
      )}
    >
      <span className="mr-1">•</span>
      {status}
    </span>
  );
}

const UNIVERSITY_URGENCY_STYLES: Record<"High" | "Medium" | "Low", string> = {
  High: "bg-rose-50 text-rose-800 border border-rose-200",
  Medium: "bg-amber-50 text-amber-900 border border-amber-200",
  Low: "bg-emerald-50 text-emerald-800 border border-emerald-200",
};

export function UniversityUrgencyBadge({ urgency }: { urgency: "High" | "Medium" | "Low" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold",
        UNIVERSITY_URGENCY_STYLES[urgency],
      )}
    >
      Urgency: {urgency}
    </span>
  );
}