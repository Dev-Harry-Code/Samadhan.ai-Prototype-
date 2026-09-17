import { NextResponse } from "next/server";

import { getUserFromSession } from "@/server/auth";
import { connectToDb } from "@/server/db";
import { buildIssueLookupContext, countComments, countUpvotes, issueToJson } from "@/server/lib";
import {
  ActivityLog,
  Analysis,
  Comment,
  Evidence,
  Funder,
  Funding,
  Issue,
  Team,
  University,
  Upvote,
  User,
  type IIssue,
} from "@/server/models";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    await connectToDb();

    const issue = await Issue.findById(id).lean<IIssue>();
    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    const [
      analysis,
      evidences,
      team,
      fundings,
      comments,
      timeline,
      upvotesCount,
      commentsCount,
      session,
    ] = await Promise.all([
      Analysis.findOne({ issueId: id }).lean(),
      Evidence.find({ issueId: id }).sort({ citedAt: -1 }).lean(),
      Team.findOne({ issueId: id }).lean(),
      Funding.find({ issueId: id }).sort({ date: -1 }).lean(),
      Comment.find({ issueId: id }).sort({ createdAt: -1 }).lean(),
      ActivityLog.find({ issueId: id }).sort({ createdAt: 1 }).lean(),
      countUpvotes(id),
      countComments(id),
      getUserFromSession(),
    ]);

    const ctx = await buildIssueLookupContext([issue]);
    const issueJson = issueToJson(issue, ctx);
    issueJson.upvotes = upvotesCount;
    issueJson.commentsCount = commentsCount;

    const [university, funderDocs] = await Promise.all([
      team ? University.findById(team.universityId).select("name shortName state").lean() : null,
      Funder.find({ _id: { $in: fundings.map((f) => f.funderId) } })
        .select("name kind")
        .lean(),
    ]);
    const funderById = new Map(funderDocs.map((f) => [String(f._id), f]));

    const commenterIds = Array.from(new Set(comments.map((c) => String(c.author))));
    const commenterDocs = await User.find({ _id: { $in: commenterIds } }).select("name").lean();
    const commenterByName = new Map(commenterDocs.map((u) => [String(u._id), u.name]));

    const commentsJson = comments.map((c) => ({
      id: String(c._id),
      authorId: String(c.author),
      authorName: commenterByName.get(String(c.author)) ?? "Citizen",
      text: c.text,
      upvotes: c.upvotes ?? 0,
      createdAt: c.createdAt ? c.createdAt.toISOString() : new Date().toISOString(),
    }));

    const upvotedByUser = session ? await Upvote.exists({ issueId: id, userId: session.id }) : null;

    return NextResponse.json({
      issue: issueJson,
      analysis,
      evidences: evidences.map((e) => ({
        ...e,
        id: String(e._id),
      })),
      team: team
        ? {
            ...team,
            id: String(team._id),
            university: university
              ? {
                  id: String(university._id),
                  name: university.name,
                  shortName: university.shortName,
                  state: university.state,
                }
              : null,
          }
        : null,
      funding: fundings.map((f) => ({
        ...f,
        id: String(f._id),
        funder: funderById.get(f.funderId)
          ? { id: f.funderId, name: funderById.get(f.funderId)!.name, kind: funderById.get(f.funderId)!.kind }
          : null,
      })),
      comments: commentsJson,
      timeline: timeline.map((t) => ({
        ...t,
        id: String(t._id),
        createdAt: t.createdAt ? t.createdAt.toISOString() : new Date().toISOString(),
      })),
      upvotedByUser: Boolean(upvotedByUser),
    });
  } catch (error) {
    console.error(`GET /api/issues/[id] failed for ${id}`, error);
    return NextResponse.json({ error: "Failed to load issue" }, { status: 500 });
  }
}