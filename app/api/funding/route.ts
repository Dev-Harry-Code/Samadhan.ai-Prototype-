import { NextResponse } from "next/server";

import { requireAuth } from "@/server/auth";
import { connectToDb } from "@/server/db";
import { trackIssueAction } from "@/server/lib";
import { Funder, Funding, Issue } from "@/server/models";
import { ISSUE_STATUS_ORDER, type IssueStatus } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const auth = await requireAuth("company");
  if (!auth.ok) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const input = (body ?? {}) as Record<string, unknown>;
  const issueId = typeof input.issueId === "string" ? input.issueId.trim() : "";
  const funderId =
    typeof input.funderId === "string" && input.funderId.trim()
      ? input.funderId.trim()
      : auth.user.orgId
        ? auth.user.orgId
        : undefined;
  const amount = Number(input.amount);
  const note = typeof input.note === "string" ? input.note.trim() : "";

  if (!issueId || !funderId) {
    return NextResponse.json(
      { error: "issueId and funderId are required (funderId falls back to your org)" },
      { status: 400 },
    );
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: "amount must be a positive number" }, { status: 400 });
  }

  try {
    await connectToDb();

    const [issue, funder] = await Promise.all([
      Issue.findById(issueId),
      Funder.findById(funderId),
    ]);
    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }
    if (!funder) {
      return NextResponse.json({ error: "Funder not found" }, { status: 404 });
    }

    const funding = await Funding.findOneAndUpdate(
      { _id: `${issueId}-${funderId}` },
      {
        $set: {
          issueId,
          funderId,
          amount,
          note,
          date: new Date(),
        },
      },
      { upsert: true, returnDocument: "after" },
    );

    const currentRank = ISSUE_STATUS_ORDER.indexOf(issue.status as IssueStatus);
    const fundedRank = ISSUE_STATUS_ORDER.indexOf("funded");
    let statusChanged = false;
    if (currentRank < fundedRank) {
      issue.status = "funded";
      await issue.save();
      statusChanged = true;
    }

    await trackIssueAction(issueId, {
      actor: `${funder.name} (${auth.user.name})`,
      action: statusChanged ? "funded" : "funding_updated",
      note: statusChanged
        ? `Funding of ₹${amount.toLocaleString("en-IN")} secured by ${funder.name}`
        : `Funding updated by ${funder.name}`,
      issue: {
        reportedBy: issue.reportedBy,
        assignedUniversityId: issue.assignedUniversityId,
        _id: issue._id,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        statusChanged,
        funding: { ...funding!.toObject(), id: String(funding!._id) },
        issueStatus: issue.status,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/funding failed", error);
    return NextResponse.json({ error: "Failed to record funding" }, { status: 500 });
  }
}