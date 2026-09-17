import { randomUUID } from "crypto";

import type { Types } from "mongoose";

import { CATEGORY_MAP } from "@/lib/data/mock-data";
import { ISSUE_STATUS_ORDER, type IssueStatus } from "@/lib/types";
import {
  ActivityLog,
  Category,
  Comment,
  Issue,
  Notification,
  University,
  Upvote,
  User,
  type IIssue,
} from "@/server/models";

export const uniqueId = (prefix: string): string =>
  `${prefix}-${Date.now().toString(36)}-${randomUUID().slice(0, 8)}`;

export async function nextIssueId(): Promise<string> {
  const docs = await Issue.find({}, { _id: 1 }).lean<{ _id: string }[]>();
  let max = 0;
  for (const doc of docs) {
    const match = /^(LOK-)(\d+)$/.exec(String(doc._id));
    if (match) max = Math.max(max, Number(match[2]));
  }
  return `LOK-${String(max + 1).padStart(4, "0")}`;
}

const STATUS_RANK: Record<IssueStatus, number> = Object.fromEntries(
  ISSUE_STATUS_ORDER.map((status, index) => [status, index]),
) as Record<IssueStatus, number>;

export function canTransition(current: IssueStatus, next: IssueStatus): boolean {
  if (current === next) return false;
  const from = STATUS_RANK[current] ?? -1;
  const to = STATUS_RANK[next] ?? -1;
  return to === from + 1;
}

export interface CommentJson {
  id: string;
  authorId: string;
  authorName: string;
  text: string;
  upvotes: number;
  createdAt: string;
}

export async function toCommentJson(doc: {
  _id: string;
  author: Types.ObjectId | string;
  text: string;
  upvotes: number;
  createdAt?: Date;
}): Promise<CommentJson> {
  let authorName = "Citizen";
  try {
    const author = await User.findById(doc.author).select("name").lean();
    if (author?.name) authorName = author.name;
  } catch {
    // keep fallback
  }
  return {
    id: String(doc._id),
    authorId: String(doc.author),
    authorName,
    text: doc.text,
    upvotes: doc.upvotes ?? 0,
    createdAt: (doc.createdAt ?? new Date()).toISOString(),
  };
}

export interface IssueJson {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  severity: string;
  location: {
    lat: number;
    lng: number;
    label: string;
    ward?: string;
    district: string;
  };
  status: string;
  peopleAffected: number;
  trustScore: number | null;
  matchScore: number | null;
  assignedUniversityId: string | null;
  assignedUniversity: { id: string; name: string; shortName: string } | null;
  reportedBy: string;
  postedBy: string;
  upvotes: number;
  commentsCount: number;
  photo: string | null;
  createdAt: string;
  duplicateOfId?: string | null;
}

export interface IssueLookupContext {
  reporters: Map<string, string>;
  universities: Map<string, { id: string; name: string; shortName: string }>;
  upvotes: Map<string, number>;
  comments: Map<string, number>;
}

export function issueToJson(doc: IIssue, ctx: IssueLookupContext): IssueJson {
  const reporterName = ctx.reporters.get(String(doc.reportedBy)) ?? "Citizen";
  const university =
    doc.assignedUniversityId && ctx.universities.has(doc.assignedUniversityId)
      ? ctx.universities.get(doc.assignedUniversityId)!
      : null;

  const categorySlug = doc.category;
  const categoryLabel =
    CATEGORY_MAP[categorySlug as keyof typeof CATEGORY_MAP]?.label ?? categorySlug;

  return {
    id: String(doc._id),
    title: doc.title,
    description: doc.description,
    category: categorySlug,
    categoryLabel,
    severity: doc.severity,
    location: doc.location,
    status: doc.status,
    peopleAffected: doc.peopleAffected ?? 0,
    trustScore: doc.trustScore ?? null,
    matchScore: doc.matchScore ?? null,
    assignedUniversityId: doc.assignedUniversityId ?? null,
    assignedUniversity: university,
    reportedBy: reporterName,
    postedBy: reporterName,
    upvotes: ctx.upvotes.get(String(doc._id)) ?? 0,
    commentsCount: ctx.comments.get(String(doc._id)) ?? 0,
    photo: doc.photo ?? null,
    createdAt: (doc.createdAt ?? new Date()).toISOString(),
    duplicateOfId: doc.duplicateOfId ?? null,
  };
}

export async function buildIssueLookupContext(
  docs: IIssue[],
): Promise<IssueLookupContext> {
  const reporterIds = Array.from(new Set(docs.map((d) => String(d.reportedBy))));
  const universityIds = Array.from(
    new Set(docs.map((d) => d.assignedUniversityId).filter((v): v is string => !!v)),
  );
  const issueIds = docs.map((d) => String(d._id));

  const [reporters, universities, upvoteRows, commentRows] = await Promise.all([
    reporterIds.length > 0
      ? User.find({ _id: { $in: reporterIds } }).select("name").lean()
      : Promise.resolve([]),
    universityIds.length > 0
      ? University.find({ _id: { $in: universityIds } })
          .select("name shortName")
          .lean()
      : Promise.resolve([]),
    issueIds.length > 0
      ? Upvote.aggregate<{ _id: string; count: number }>([
          { $match: { issueId: { $in: issueIds } } },
          { $group: { _id: "$issueId", count: { $sum: 1 } } },
        ])
      : Promise.resolve([]),
    issueIds.length > 0
      ? Comment.aggregate<{ _id: string; count: number }>([
          { $match: { issueId: { $in: issueIds } } },
          { $group: { _id: "$issueId", count: { $sum: 1 } } },
        ])
      : Promise.resolve([]),
  ]);

  const reportersMap = new Map<string, string>();
  for (const r of reporters) reportersMap.set(String(r._id), r.name);

  const universitiesMap = new Map<
    string,
    { id: string; name: string; shortName: string }
  >();
  for (const u of universities) {
    universitiesMap.set(String(u._id), {
      id: String(u._id),
      name: u.name,
      shortName: u.shortName,
    });
  }

  return {
    reporters: reportersMap,
    universities: universitiesMap,
    upvotes: new Map(upvoteRows.map((r) => [r._id, r.count])),
    comments: new Map(commentRows.map((r) => [r._id, r.count])),
  };
}

export async function toIssueJson(
  doc: IIssue,
  opts: { upvotes?: number; commentsCount?: number } = {},
): Promise<IssueJson> {
  const ctx = await buildIssueLookupContext([doc]);
  if (opts.upvotes !== undefined) ctx.upvotes.set(String(doc._id), opts.upvotes);
  if (opts.commentsCount !== undefined) {
    ctx.comments.set(String(doc._id), opts.commentsCount);
  }
  return issueToJson(doc, ctx);
}

export async function countUpvotes(issueId: string): Promise<number> {
  return await Upvote.countDocuments({ issueId });
}

export async function countComments(issueId: string): Promise<number> {
  return await Comment.countDocuments({ issueId });
}

export interface TrackOptions {
  actor: string;
  action: string;
  note: string;
  issue?: Pick<IIssue, "reportedBy" | "assignedUniversityId" | "_id">;
}

export async function trackIssueAction(
  issueId: string,
  opts: TrackOptions,
): Promise<void> {
  await ActivityLog.create({
    _id: uniqueId("act"),
    issueId,
    actor: opts.actor,
    action: opts.action,
    note: opts.note,
  });

  const recipients: Types.ObjectId[] = [];
  if (opts.issue?.reportedBy) recipients.push(opts.issue.reportedBy as Types.ObjectId);

  if (opts.issue?.assignedUniversityId) {
    const uniUser = await User.findOne({
      role: "university",
      orgId: opts.issue.assignedUniversityId,
    })
      .select("_id")
      .lean();
    if (uniUser) recipients.push(uniUser._id as Types.ObjectId);
  }

  for (const userId of recipients) {
    await Notification.create({
      _id: uniqueId("ntf"),
      userId,
      type: "issue-status",
      title: `Issue ${issueId} ${opts.action.replace("_", " ")}`,
      body: opts.note,
    });
  }
}

export async function getCategoryLabel(slug: string): Promise<string> {
  const mapped = CATEGORY_MAP[slug as keyof typeof CATEGORY_MAP]?.label;
  if (mapped) return mapped;
  const category = await Category.findById(slug).select("label").lean();
  return category?.label ?? slug;
}