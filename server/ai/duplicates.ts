import { SEED_ISSUES } from "@/lib/data/mock-data";
import { connectToDb } from "@/server/db";
import { DuplicateCluster, Issue } from "@/server/models";

import { withTimeout } from "./data-access";
import type { DuplicatesResult, SimilarIssue } from "./types";

const DUPLICATE_THRESHOLD = 0.55;
const SIMILAR_COUNT_THRESHOLD = 0.1;

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "for", "with", "without", "from",
  "this", "that", "these", "those", "of", "in", "on", "at", "to", "is",
  "are", "was", "were", "has", "have", "had", "be", "been", "being", "by",
  "as", "it", "its", "we", "our", "they", "their", "there", "here", "not",
  "no", "so", "all", "any", "some", "than", "then", "into", "over", "under",
  "about", "after", "before", "near", "via", "per", "which", "who", "whom",
  "will", "would", "can", "could", "may", "might", "one", "also", "etc",
  "currently", "now", "still", "very", "just", "much", "many", "more", "most",
  "two", "three", "four", "five", "behind", "along", "against", "among",
  "during", "within", "between", "through", "until", "both", "each", "few",
  "other", "such", "only", "own", "same",
]);

interface CorpusIssue {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
}

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function tokenize(description: string): Set<string> {
  const tokens = new Set<string>();
  for (const token of normalizeText(description).split(" ")) {
    if (!token) continue;
    if (token.length < 3) continue;
    if (STOPWORDS.has(token)) continue;
    tokens.add(token);
    if (token.length > 3 && token.endsWith("s") && !token.endsWith("ss")) {
      const singular = token.slice(0, -1);
      if (!STOPWORDS.has(singular)) tokens.add(singular);
    }
  }
  return tokens;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 0;
  let intersection = 0;
  for (const token of a) {
    if (b.has(token)) intersection += 1;
  }
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function isActiveStatus(status: string | undefined): boolean {
  return status !== "resolved";
}

async function loadIssueCorpus(): Promise<{ source: "db" | "seed"; issues: CorpusIssue[] }> {
  try {
    await withTimeout(() => connectToDb());
    const docs = await withTimeout(() =>
      Issue.find({})
        .select("_id title description category status")
        .lean(),
    );
    if (!docs.length) throw new Error("no issues in db");
    return {
      source: "db",
      issues: docs.map((d) => ({
        id: String(d._id),
        title: d.title,
        description: d.description,
        category: d.category,
        status: d.status ?? "reported",
      })),
    };
  } catch {
    return {
      source: "seed",
      issues: SEED_ISSUES.map((i) => ({
        id: i.id,
        title: i.title,
        description: i.description,
        category: i.category,
        status: i.status,
      })),
    };
  }
}

async function findClusterFor(canonicalIssueId: string): Promise<string | null> {
  try {
    await withTimeout(() => connectToDb());
    const cluster = await withTimeout(() =>
      DuplicateCluster.findOne({
        $or: [{ canonicalIssueId }, { memberIssueIds: canonicalIssueId }],
      })
        .select("canonicalIssueId")
        .lean(),
    );
    return cluster ? String(cluster.canonicalIssueId) : null;
  } catch {
    return null;
  }
}

export async function findDuplicates(description: string): Promise<DuplicatesResult> {
  const { source, issues } = await loadIssueCorpus();

  const queryTokens = tokenize(description);
  const scored = issues
    .map((issue) => ({
      issue,
      similarity: jaccard(queryTokens, tokenize(issue.description)),
    }))
    .filter((entry) => entry.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity);

  const top: SimilarIssue[] = scored.slice(0, 4).map((entry) => ({
    id: entry.issue.id,
    title: entry.issue.title,
    category: entry.issue.category,
    status: entry.issue.status,
    similarity: Math.round(entry.similarity * 1000) / 1000,
  }));

  const similarCount = scored.filter((entry) => entry.similarity >= SIMILAR_COUNT_THRESHOLD).length;

  const best = scored[0]?.issue;
  const bestSimilarity = scored[0]?.similarity ?? 0;
  let isDuplicate = false;
  let cluster: DuplicatesResult["cluster"] = null;

  if (best && bestSimilarity >= DUPLICATE_THRESHOLD && isActiveStatus(best.status)) {
    isDuplicate = true;
    const canonical = await findClusterFor(best.id);
    if (canonical && canonical !== best.id) {
      cluster = { canonicalIssueId: canonical, similarity: Math.round(bestSimilarity * 1000) / 1000 };
    } else {
      cluster = { canonicalIssueId: best.id, similarity: Math.round(bestSimilarity * 1000) / 1000 };
    }
  }

  return { top, isDuplicate, similarCount, cluster, source };
}