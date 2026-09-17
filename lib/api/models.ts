export interface ApiAssignedUniversity {
  id: string;
  name: string;
  shortName: string;
}

export interface ApiIssue {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  severity: string;
  location: { lat: number; lng: number; label: string; ward?: string; district: string };
  status: string;
  peopleAffected: number;
  trustScore: number | null;
  matchScore: number | null;
  assignedUniversityId: string | null;
  assignedUniversity: ApiAssignedUniversity | null;
  reportedBy: string;
  postedBy: string;
  upvotes: number;
  commentsCount: number;
  photo: string | null;
  createdAt: string;
  duplicateOfId?: string | null;
}

export interface ApiAnalysis {
  summary?: string;
  causes?: string[];
  recommendations?: string[];
  cost?: { min?: number; max?: number } | string;
  timeline?: string;
  classificationConfidence?: number;
}

export interface ApiComment {
  id: string;
  authorId: string;
  authorName: string;
  text: string;
  upvotes: number;
  createdAt: string;
}

export interface ApiMilestone {
  label: string;
  desc?: string;
  due?: string;
  done: boolean;
}

export interface ApiTeam {
  id: string;
  issueId: string;
  universityId: string;
  university?: { id: string; name: string; shortName: string; state?: string } | null;
  members: { name: string; role: string; year?: string }[];
  faculty: string;
  message: string;
  milestones?: ApiMilestone[];
  formedAt?: string;
}

export interface ApiFunding {
  id: string;
  issueId: string;
  funderId: string;
  amount: number;
  note: string;
  date: string;
  funder?: { id: string; name: string; kind: string } | null;
}

export interface ApiTimelineEntry {
  id: string;
  actor: string;
  action: string;
  note: string;
  createdAt: string;
}

export interface ApiIssueDetail {
  issue: ApiIssue;
  analysis: ApiAnalysis | null;
  evidences: unknown[];
  team: ApiTeam | null;
  funding: ApiFunding[];
  comments: ApiComment[];
  timeline: ApiTimelineEntry[];
  upvotedByUser: boolean;
}

export interface ApiNotification {
  id: string;
  type: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface ApiSessionUser {
  id: string;
  name: string;
  role: string;
  email: string;
  orgId?: string;
}

export interface ApiStatsLive {
  issuesReported: number;
  validated: number;
  workedOn: number;
  deployed: number;
  districts: number;
  universities: number;
  funders: number;
}