"use client";

import { useMemo } from "react";

import { api, useApiGet } from "@/lib/api/client";
import type { ApiIssue } from "@/lib/api/models";
import { universityReportFromApiIssue } from "@/lib/university-mapper";
import { apiIssueToCompanyIssue } from "@/lib/funder-mapper";
import type { UniversityReport } from "@/lib/data/university-mock";
import type { CompanyIssue } from "@/lib/data/company-mock";

export interface ApiIssueListState {
  issues: ApiIssue[];
  loading: boolean;
  error: unknown;
}

export function useApiIssueList(query = "?limit=50"): ApiIssueListState {
  const { data, loading, error } = useApiGet<{ issues: ApiIssue[] }>(`/api/issues${query}`);
  return { issues: data?.issues ?? [], loading, error };
}

export interface UniIssueHooks {
  reports: UniversityReport[];
  loading: boolean;
}

export function useUniApiIssues(assignedUniversityId?: string): UniIssueHooks {
  const query = assignedUniversityId ? `?assigned=${encodeURIComponent(assignedUniversityId)}` : "?limit=50";
  const { data, loading } = useApiGet<{ issues: ApiIssue[] }>(`/api/issues${query}`);
  const reports = useMemo(
    () => (data?.issues ?? []).map((issue, i) => universityReportFromApiIssue(issue, i)),
    [data],
  );
  return { reports, loading };
}

export interface FunderIssuesHooks {
  issues: CompanyIssue[];
  loading: boolean;
}

export function useFunderApiIssues(): FunderIssuesHooks {
  const { data, loading } = useApiGet<{ issues: ApiIssue[] }>("/api/issues?limit=50");
  const issues = useMemo(() => (data?.issues ?? []).map(apiIssueToCompanyIssue), [data]);
  return { issues, loading };
}

export async function markNotificationRead(id: string): Promise<void> {
  try {
    await api.post(`/api/notifications/${encodeURIComponent(id)}/read`);
  } catch {
    // ignore
  }
}

export async function markAllNotificationsRead(): Promise<void> {
  try {
    await api.post("/api/notifications/read-all");
  } catch {
    // ignore
  }
}