import { NextResponse } from "next/server";

import { requireAuth } from "@/server/auth";
import { connectToDb } from "@/server/db";
import { canTransition, trackIssueAction } from "@/server/lib";
import { Issue, type IssueStatus } from "@/server/models";
import { ISSUE_STATUS_ORDER } from "@/lib/types";

export const runtime = "nodejs";

const STATUS_ROLES: Record<IssueStatus, readonly string[]> = {
  reported: ["citizen", "university", "company", "admin"],
  ai_validated: ["university", "admin"],
  team_formed: ["university", "admin"],
  proposed: ["university", "company", "admin"],
  funded: ["company", "admin"],
  deployed: ["university", "admin"],
  resolved: ["university", "admin"],
};

const DEFAULT_NOTES: Record<IssueStatus, string> = {
  reported: "Issue reported",
  ai_validated: "AI validation passed",
  team_formed: "University team formed",
  proposed: "Proposal sent to funders",
  funded: "Funding secured",
  deployed: "Solution deployed",
  resolved: "Issue resolved",
};

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const input = (body ?? {}) as Record<string, unknown>;
  const nextStatus = typeof input.status === "string" ? input.status.trim() : "";
  const note = typeof input.note === "string" ? input.note.trim() : "";

  if (!ISSUE_STATUS_ORDER.includes(nextStatus as IssueStatus)) {
    return NextResponse.json(
      { error: `Status must be one of: ${ISSUE_STATUS_ORDER.join(", ")}` },
      { status: 400 },
    );
  }

  const allowed = STATUS_ROLES[nextStatus as IssueStatus];
  const auth = await requireAuth(...allowed);
  if (!auth.ok) return auth.response;

  try {
    await connectToDb();

    const issue = await Issue.findById(id);
    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    if (!canTransition(issue.status as IssueStatus, nextStatus as IssueStatus)) {
      return NextResponse.json(
        {
          error: `Cannot transition ${issue.status} → ${nextStatus}. Status can only advance one step: ${ISSUE_STATUS_ORDER.join(" → ")}`,
        },
        { status: 409 },
      );
    }

    issue.status = nextStatus as IssueStatus;
    await issue.save();

    await trackIssueAction(id, {
      actor: auth.user.name,
      action: nextStatus,
      note: note || DEFAULT_NOTES[nextStatus as IssueStatus],
      issue: {
        reportedBy: issue.reportedBy,
        assignedUniversityId: issue.assignedUniversityId,
        _id: issue._id,
      },
    });

    return NextResponse.json({
      ok: true,
      issue: {
        id: String(issue._id),
        title: issue.title,
        status: issue.status,
      },
    });
  } catch (error) {
    console.error(`PATCH /api/issues/[id]/status failed for ${id}`, error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}