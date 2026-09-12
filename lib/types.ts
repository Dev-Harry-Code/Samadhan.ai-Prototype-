export type CategoryId =
  | "water"
  | "sanitation"
  | "health"
  | "education"
  | "agriculture"
  | "environment"
  | "energy"
  | "urban"
  | "accessibility"
  | "livelihoods";

export type Severity = "Low" | "Medium" | "High" | "Critical";

export type IssueStatus =
  | "reported"
  | "ai_validated"
  | "team_formed"
  | "proposed"
  | "funded"
  | "deployed"
  | "resolved";

export type Role = "citizen" | "ngo" | "company";

export interface LatLng {
  lat: number;
  lng: number;
}

export interface IssueLocation extends LatLng {
  label: string;
  ward: string;
  district: string;
}

export interface Issue {
  id: string;
  title: string;
  category: CategoryId;
  description: string;
  severity: Severity;
  location: IssueLocation;
  reportedBy: string;
  reportedDaysAgo: number;
  upvotes: number;
  commentsCount: number;
  status: IssueStatus;
  peopleAffected: number;
  trustScore?: number;
  matchScore?: number;
  assignedUniversityId?: string;
  photo?: string;
  imageUrl?: string;
  createdAt: number;
}

export interface University {
  id: string;
  name: string;
  shortName: string;
  state: string;
  focus: string;
  priorProjects: number;
  labs: string;
  bestCategories: CategoryId[];
}

export interface Milestone {
  label: string;
  desc: string;
  due: string;
  done: boolean;
}

export interface Team {
  issueId: string;
  universityId: string;
  members: { name: string; role: string; year?: string }[];
  faculty: string;
  message: string;
  formedAt: number;
  milestones: Milestone[];
}

export interface Funder {
  id: string;
  name: string;
  kind: string;
  fundedProjects: number;
  focus: string;
}

export interface Funding {
  issueId: string;
  funderId: string;
  amount: number;
  note: string;
  date: number;
}

export interface DraftIssue {
  title: string;
  category: CategoryId;
  description: string;
  severity: Severity;
  location: IssueLocation;
  peopleAffected: number;
  photo?: string;
}

export const ISSUE_STATUS_ORDER: IssueStatus[] = [
  "reported",
  "ai_validated",
  "team_formed",
  "proposed",
  "funded",
  "deployed",
  "resolved",
];