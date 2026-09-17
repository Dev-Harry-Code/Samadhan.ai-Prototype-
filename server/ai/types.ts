import type { CategoryId, Severity } from "@/lib/types";

export interface AnalyzeRequest {
  description: string;
  location?: {
    lat?: number | string;
    lng?: number | string;
    label?: string;
    ward?: string;
    district?: string;
  } | null;
  category?: CategoryId | string;
  photo?: string | boolean | null;
  peopleAffected?: number | string | null;
  reporterKarma?: number | string | null;
}

export interface ClassificationResult {
  category: CategoryId;
  label: string;
  confidence: number;
  keywords: string[];
  method: "keyword" | "llm";
  userProvided?: boolean;
}

export interface SeverityResult {
  severity: Severity;
  score: number;
  reasons: string[];
}

export interface TrustFactors {
  base: number;
  description: number;
  photo: number;
  gps: number;
  similarPrior: number;
  karma: number;
}

export interface TrustResult {
  score: number;
  max: number;
  factors: TrustFactors;
}

export interface SimilarIssue {
  id: string;
  title: string;
  category: string;
  status: string;
  similarity: number;
}

export interface DuplicateClusterRef {
  canonicalIssueId: string;
  similarity: number;
}

export interface DuplicatesResult {
  top: SimilarIssue[];
  isDuplicate: boolean;
  similarCount: number;
  cluster: DuplicateClusterRef | null;
  source: "db" | "seed";
}

export type EvidenceKind = "scheme" | "paper" | "case-similar" | "solution";

export interface EvidenceItem {
  id?: string;
  kind: EvidenceKind;
  title: string;
  source: string;
  url: string;
  snippet: string;
  citedAt: string;
}

export interface ResearchResult {
  evidence: EvidenceItem[];
  source: "seeded" | "llm";
}

export interface UniversityMatch {
  university: {
    id: string;
    name: string;
    shortName: string;
    focus: string;
  };
  score: number;
  priorProjects: number;
}

export interface AnalyzeResponse {
  classification: ClassificationResult;
  severity: SeverityResult;
  trustScore: TrustResult;
  duplicates: DuplicatesResult;
  research: ResearchResult;
  matches: UniversityMatch[];
}