import { NextResponse } from "next/server";

import { requireAuth } from "@/server/auth";
import { connectToDb } from "@/server/db";
import { Issue, Upvote } from "@/server/models";

export const runtime = "nodejs";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAuth();
  if (!auth.ok) return auth.response;

  const { id } = await params;

  try {
    await connectToDb();

    const issue = await Issue.findById(id).select("_id").lean();
    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    const existing = await Upvote.findOne({ issueId: id, userId: auth.user.id }).lean();

    let upvoted: boolean;
    if (existing) {
      await Upvote.deleteOne({ _id: existing._id });
      upvoted = false;
    } else {
      await Upvote.create({ issueId: id, userId: auth.user.id });
      upvoted = true;
    }

    const upvotes = await Upvote.countDocuments({ issueId: id });
    return NextResponse.json({ upvoted, upvotes });
  } catch (error) {
    console.error(`POST /api/issues/[id]/upvote failed for ${id}`, error);
    return NextResponse.json({ error: "Failed to toggle upvote" }, { status: 500 });
  }
}