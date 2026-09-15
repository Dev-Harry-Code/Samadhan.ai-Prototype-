import { NextResponse } from "next/server";

import { requireAuth } from "@/server/auth";
import { connectToDb } from "@/server/db";
import { toCommentJson, uniqueId } from "@/server/lib";
import { Comment, Issue } from "@/server/models";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAuth();
  if (!auth.ok) return auth.response;

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const input = (body ?? {}) as Record<string, unknown>;
  const text = typeof input.text === "string" ? input.text.trim() : "";
  if (!text) {
    return NextResponse.json({ error: "Comment text is required" }, { status: 400 });
  }

  try {
    await connectToDb();

    const issue = await Issue.findById(id).select("_id").lean();
    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    const comment = await Comment.create({
      _id: uniqueId("cmt"),
      issueId: id,
      author: auth.user.id,
      text,
      upvotes: 0,
    });

    const json = await toCommentJson(comment.toObject());
    return NextResponse.json({ comment: json }, { status: 201 });
  } catch (error) {
    console.error(`POST /api/issues/[id]/comments failed for ${id}`, error);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}