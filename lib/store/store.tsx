"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

import { api, isApiError, signOut } from "@/lib/api/client";
import type { ApiIssue, ApiSessionUser } from "@/lib/api/models";
import { daysAgoFromIso } from "@/lib/akshat-mapper";
import { FUNDERS, SEED_ISSUES, UNIVERSITIES, matchFor } from "@/lib/data/mock-data";
import type {
  DraftIssue,
  Funder,
  Issue,
  IssueStatus,
  Team,
  University,
} from "@/lib/types";
import { ISSUE_STATUS_ORDER } from "@/lib/types";

interface StoreContextValue {
  issues: Issue[];
  teams: Record<string, { issueId: string; universityId: string; formedAt: number }>;
  fundings: Record<string, { funderId: string; amount: number; note: string; date: number }>;
  session: { name: string; role: string } | null;
  universities: University[];
  funders: Funder[];
  loading: boolean;
  setSession: (name: string | null, role: string | null) => void;
  submitIssue: (draft: DraftIssue) => Promise<Issue | null>;
  assignUniversity: (issueId: string, universityId: string, score: number) => Promise<void>;
  setStatus: (issueId: string, status: IssueStatus) => Promise<void>;
  formTeam: (issueId: string, team: Omit<Team, "issueId" | "formedAt">) => Promise<void>;
  addFunding: (issueId: string, funderId: string, amount: number, note: string) => Promise<void>;
  matchesFor: (issue: Issue) => { university: University; score: number }[];
  clearStore: () => Promise<void>;
}

const StoreContext = createContext<StoreContextValue | null>(null);

function toStoreIssue(apiIssue: ApiIssue): Issue {
  return {
    id: apiIssue.id,
    title: apiIssue.title,
    category: apiIssue.category as Issue["category"],
    description: apiIssue.description,
    severity: apiIssue.severity as Issue["severity"],
    location: {
      lat: apiIssue.location.lat,
      lng: apiIssue.location.lng,
      label: apiIssue.location.label,
      ward: apiIssue.location.ward ?? "",
      district: apiIssue.location.district,
    },
    reportedBy: apiIssue.reportedBy,
    reportedDaysAgo: daysAgoFromIso(apiIssue.createdAt),
    upvotes: apiIssue.upvotes ?? 0,
    commentsCount: apiIssue.commentsCount ?? 0,
    status: apiIssue.status as IssueStatus,
    peopleAffected: apiIssue.peopleAffected,
    trustScore: apiIssue.trustScore ?? undefined,
    matchScore: apiIssue.matchScore ?? undefined,
    assignedUniversityId: apiIssue.assignedUniversityId ?? undefined,
    photo: apiIssue.photo ?? undefined,
    imageUrl: apiIssue.photo ?? undefined,
    createdAt: new Date(apiIssue.createdAt).getTime(),
  };
}

function buildLocalIssue(draft: DraftIssue, existing: Issue[]): Issue {
  const max = existing.reduce(
    (m, issue) => Math.max(m, Number(/LOK-(\d+)/.exec(issue.id)?.[1]) || 1042),
    1042,
  );
  const hits = matchFor({ category: draft.category } as Issue, UNIVERSITIES);
  const top = hits[0];
  return {
    id: `LOK-${max + 1}`,
    title: draft.title,
    category: draft.category,
    description: draft.description,
    severity: draft.severity,
    location: draft.location,
    reportedBy: "You (Citizen)",
    reportedDaysAgo: 0,
    upvotes: 1,
    commentsCount: 0,
    status: "ai_validated",
    peopleAffected: draft.peopleAffected,
    trustScore: 88 + Math.round(Math.random() * 9),
    matchScore: top.score,
    assignedUniversityId: top.university.id,
    photo: draft.photo,
    imageUrl: draft.photo,
    createdAt: Date.now(),
  };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [issues, setIssues] = useState<Issue[]>(SEED_ISSUES);
  const [session, setSessionState] = useState<{ name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [teams] = useState<StoreContextValue["teams"]>({});
  const [fundings] = useState<StoreContextValue["fundings"]>({});

  useEffect(() => {
    let cancelled = false;
    Promise.allSettled([
      api.get<{ issues: ApiIssue[] }>("/api/issues?limit=100"),
      api.get<{ user: ApiSessionUser }>("/api/auth/session"),
    ]).then(([issuesResult, sessionResult]) => {
      if (cancelled) return;
      if (issuesResult.status === "fulfilled") {
        setIssues(issuesResult.value.issues.map(toStoreIssue));
      }
      if (sessionResult.status === "fulfilled") {
        setSessionState({
          name: sessionResult.value.user.name,
          role: sessionResult.value.user.role,
        });
      }
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const setSession = useCallback((name: string | null, role: string | null) => {
    setSessionState(name ? { name, role: role ?? "citizen" } : null);
  }, []);

  const submitIssue = useCallback(
    async (draft: DraftIssue): Promise<Issue | null> => {
      try {
        const created = await api.post<ApiIssue>("/api/issues", {
          title: draft.title,
          description: draft.description,
          category: draft.category,
          severity: draft.severity,
          location: draft.location,
          peopleAffected: draft.peopleAffected,
          photo: draft.photo,
        });
        const issue = toStoreIssue(created);
        setIssues((prev) => [issue, ...prev]);
        return issue;
      } catch (error) {
        if (isApiError(error) && error.status === 401) {
          const local = buildLocalIssue(draft, issues);
          setIssues((prev) => [local, ...prev]);
          return local;
        }
        return null;
      }
    },
    [issues],
  );

  const assignUniversity = useCallback(
    async (issueId: string, universityId: string, score: number) => {
      setIssues((prev) =>
        prev.map((issue) =>
          issue.id === issueId
            ? { ...issue, assignedUniversityId: universityId, matchScore: score }
            : issue,
        ),
      );
      try {
        await api.post("/api/teams", { issueId, universityId, message: "" });
      } catch {
        // keep local state
      }
    },
    [],
  );

  const setStatus = useCallback(
    async (issueId: string, status: IssueStatus) => {
      setIssues((prev) =>
        prev.map((issue) => (issue.id === issueId ? { ...issue, status } : issue)),
      );
      try {
        await api.patch(`/api/issues/${encodeURIComponent(issueId)}/status`, { status });
      } catch {
        // keep local state
      }
    },
    [],
  );

  const formTeam = useCallback(async (issueId: string, team: Omit<Team, "issueId" | "formedAt">) => {
    try {
      await api.post("/api/teams", {
        issueId,
        members: team.members.map((member) => ({
          name: member.name,
          role: member.role,
          year: member.year,
        })),
        faculty: team.faculty,
        message: team.message,
        milestones: team.milestones,
      });
    } catch {
      // keep local state
    }
  }, []);

  const addFunding = useCallback(
    async (issueId: string, funderId: string, amount: number, note: string) => {
      try {
        await api.post("/api/funding", { issueId, funderId, amount, note });
      } catch {
        // keep local state
      }
    },
    [],
  );

  const matchesFor = useCallback((issue: Issue) => matchFor(issue, UNIVERSITIES), []);

  const clearStore = useCallback(async () => {
    await signOut();
    setSessionState(null);
    setIssues(SEED_ISSUES);
  }, []);

  const value: StoreContextValue = {
    issues,
    teams,
    fundings,
    session,
    universities: UNIVERSITIES,
    funders: FUNDERS,
    loading,
    setSession,
    submitIssue,
    assignUniversity,
    setStatus,
    formTeam,
    addFunding,
    matchesFor,
    clearStore,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export { ISSUE_STATUS_ORDER as STATUS_FLOW };