"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  DraftIssue,
  Funder,
  Issue,
  IssueStatus,
  Team,
  University,
} from "@/lib/types";
import {
  FLAGSHIP_ISSUE,
  FUNDERS,
  SEED_FUNDINGS,
  SEED_ISSUES,
  SEED_TEAMS,
  UNIVERSITIES,
  matchFor,
} from "@/lib/data/mock-data";

const STORAGE_KEY = "samadhan.store.v1";

interface AppState {
  issues: Issue[];
  teams: Record<string, Team>;
  fundings: Record<string, { funderId: string; amount: number; note: string; date: number }>;
  session: { name: string; role: string } | null;
}

interface StoreContextValue extends AppState {
  universities: University[];
  funders: Funder[];
  setSession: (name: string | null, role: string | null) => void;
  submitIssue: (draft: DraftIssue) => Issue;
  assignUniversity: (issueId: string, universityId: string, score: number) => void;
  setStatus: (issueId: string, status: IssueStatus) => void;
  formTeam: (issueId: string, team: Omit<Team, "issueId" | "formedAt">) => void;
  addFunding: (issueId: string, funderId: string, amount: number, note: string) => void;
  matchesFor: (issue: Issue) => { university: University; score: number }[];
  clearStore: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const seedState = (): AppState => ({
  issues: SEED_ISSUES,
  teams: { ...SEED_TEAMS },
  fundings: { ...SEED_FUNDINGS },
  session: null,
});

function loadInitial(): AppState {
  if (typeof window === "undefined") return seedState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AppState>;
      return {
        issues: parsed.issues?.length ? parsed.issues : SEED_ISSUES,
        teams: parsed.teams ?? { ...SEED_TEAMS },
        fundings: parsed.fundings ?? { ...SEED_FUNDINGS },
        session: parsed.session ?? null,
      };
    }
  } catch {
    /* ignore */
  }
  return seedState();
}

const STATUS_FLOW: IssueStatus[] = [
  "reported",
  "ai_validated",
  "team_formed",
  "proposed",
  "funded",
  "deployed",
  "resolved",
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(seedState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setState(loadInitial());
      setHydrated(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, hydrated]);

  const nextId = () => {
    const max = state.issues.reduce(
      (m, i) => Math.max(m, parseInt(i.id.replace(/\D+/g, ""), 10) || 0),
      1042,
    );
    return `LOK-${max + 1}`;
  };

  const setSession = (name: string | null, role: string | null) => {
    setState((s) => ({
      ...s,
      session: name ? { name, role: role ?? "citizen" } : null,
    }));
  };

  const submitIssue = (draft: DraftIssue): Issue => {
    const hits = matchFor(
      { category: draft.category } as Issue,
      UNIVERSITIES,
    );
    const top = hits[0];
    const issue: Issue = {
      id: nextId(),
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
      createdAt: Date.now(),
    };
    setState((s) => ({ ...s, issues: [issue, ...s.issues] }));
    return issue;
  };

  const assignUniversity = (issueId: string, universityId: string, score: number) => {
    setState((s) => ({
      ...s,
      issues: s.issues.map((i) =>
        i.id === issueId
          ? { ...i, assignedUniversityId: universityId, matchScore: score, status: "ai_validated" }
          : i,
      ),
    }));
  };

  const setStatus = (issueId: string, status: IssueStatus) => {
    setState((s) => ({
      ...s,
      issues: s.issues.map((i) => (i.id === issueId ? { ...i, status } : i)),
    }));
  };

  const formTeam = (issueId: string, team: Omit<Team, "issueId" | "formedAt">) => {
    setState((s) => ({
      ...s,
      teams: {
        ...s.teams,
        [issueId]: { ...team, issueId, formedAt: Date.now() },
      },
      issues: s.issues.map((i) =>
        i.id === issueId ? { ...i, status: "team_formed" } : i,
      ),
    }));
  };

  const addFunding = (issueId: string, funderId: string, amount: number, note: string) => {
    setState((s) => ({
      ...s,
      fundings: {
        ...s.fundings,
        [issueId]: { funderId, amount, note, date: Date.now() },
      },
      issues: s.issues.map((i) =>
        i.id === issueId ? { ...i, status: "funded" } : i,
      ),
    }));
  };

  const matchesFor = (issue: Issue) => matchFor(issue, UNIVERSITIES);

  const clearStore = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(seedState());
  };

  const value: StoreContextValue = {
    issues: state.issues,
    teams: state.teams,
    fundings: state.fundings,
    session: state.session,
    universities: UNIVERSITIES,
    funders: FUNDERS,
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

export { STATUS_FLOW, FLAGSHIP_ISSUE };