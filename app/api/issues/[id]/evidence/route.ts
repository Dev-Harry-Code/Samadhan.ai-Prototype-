import { NextResponse } from "next/server";

import { requireAuth } from "@/server/auth";
import { connectToDb } from "@/server/db";
import { trackIssueAction, uniqueId } from "@/server/lib";
import { Evidence, Issue, type EvidenceKind } from "@/server/models";

export const runtime = "nodejs";

const KINDS: EvidenceKind[] = ["scheme", "paper", "case-similar", "solution"];

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAuth("university");
  if (!auth.ok) return auth.response;

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const input = (body ?? {}) as Record<string, unknown>;
  const kind = typeof input.kind === "string" ? input.kind.trim() : "";
  const title = typeof input.title === "string" ? input.title.trim() : "";
  const source = typeof input.source === "string" ? input.source.trim() : "";
  const url = typeof input.url === "string" ? input.url.trim() : "";
  const snippet = typeof input.snippet === "string" ? input.snippet.trim() : "";

  if (!KINDS.includes(kind as EvidenceKind)) {
    return NextResponse.json(
      { error: `kind must be one of: ${KINDS.join(", ")}` },
      { status: 400 },
    );
  }
  if (!title || !source || !url) {
    return NextResponse.json(
      { error: "title, source and url are required" },
      { status: 400 },
    );
  }

  try {
    await connectToDb();

    const issue = await Issue.findById(id);
    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    const evidence = await Evidence.findOneAndUpdate(
      { issueId: id, url },
      {
        $set: {
          kind: kind as EvidenceKind,
          title,
          source,
          snippet,
          citedAt: new Date(),
        },
        $setOnInsert: { _id: uniqueId("ev"), issueId: id },
      },
      { upsert: true, returnDocument: "after" },
    );

    await trackIssueAction(id, {
      actor: auth.user.name,
      action: "evidence_added",
      note: `Research evidence added: ${title}`,
      issue: {
        reportedBy: issue.reportedBy,
        assignedUniversityId: issue.assignedUniversityId,
        _id: issue._id,
      },
    });

    return NextResponse.json(
      { ok: true, evidence: { ...evidence!.toObject(), id: String(evidence!._id) } },
      { status: 201 },
    );
  } catch (error) {
    console.error(`POST /api/issues/[id]/evidence failed for ${id}`, error);
    return NextResponse.json({ error: "Failed to add evidence" }, { status: 500 });
  }
}