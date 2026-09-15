import { NextResponse } from "next/server";

import { requireAuth } from "@/server/auth";
import { connectToDb } from "@/server/db";
import { trackIssueAction } from "@/server/lib";
import { Funder, Issue, Notification, Proposal, User } from "@/server/models";
import { ISSUE_STATUS_ORDER, type IssueStatus } from "@/lib/types";

export const runtime = "nodejs";

const roleHasAccess = ["university", "company", "admin"];

export async function GET() {
  const auth = await requireAuth(...roleHasAccess);
  if (!auth.ok) return auth.response;

  try {
    await connectToDb();

    const proposals = await Proposal.find({}).sort({ createdAt: -1 }).lean();
    const issueIds = Array.from(new Set(proposals.map((p) => p.issueId)));
    const funderIds = Array.from(new Set(proposals.map((p) => p.funderId)));

    const [issues, funders] = await Promise.all([
      Issue.find({ _id: { $in: issueIds } })
        .select("_id title category status assignedUniversityId")
        .lean(),
      Funder.find({ _id: { $in: funderIds } }).select("name kind").lean(),
    ]);
    const issueById = new Map(issues.map((i) => [String(i._id), i]));
    const funderById = new Map(funders.map((f) => [String(f._id), f]));

    const filtered = proposals.filter((p) => {
      if (auth.user.role === "university") {
        const issue = issueById.get(p.issueId);
        return issue?.assignedUniversityId === auth.user.orgId;
      }
      if (auth.user.role === "company") {
        return p.funderId === auth.user.orgId;
      }
      return true;
    });

    return NextResponse.json({
      proposals: filtered.map((p) => ({
        ...p,
        id: String(p._id),
        createdAt: p.createdAt ? p.createdAt.toISOString() : new Date().toISOString(),
        issue: issueById.get(p.issueId)
          ? {
              id: String(issueById.get(p.issueId)!._id),
              title: issueById.get(p.issueId)!.title,
              category: issueById.get(p.issueId)!.category,
              status: issueById.get(p.issueId)!.status,
            }
          : null,
        funder: funderById.get(p.funderId)
          ? {
              id: String(funderById.get(p.funderId)!._id),
              name: funderById.get(p.funderId)!.name,
              kind: funderById.get(p.funderId)!.kind,
            }
          : null,
      })),
    });
  } catch (error) {
    console.error("GET /api/proposals failed", error);
    return NextResponse.json({ error: "Failed to load proposals" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAuth("university");
  if (!auth.ok) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const input = (body ?? {}) as Record<string, unknown>;
  const issueId = typeof input.issueId === "string" ? input.issueId.trim() : "";
  const funderId = typeof input.funderId === "string" ? input.funderId.trim() : "";
  const amount = Number(input.amount);
  const note = typeof input.note === "string" ? input.note.trim() : "";

  if (!issueId || !funderId) {
    return NextResponse.json(
      { error: "issueId and funderId are required" },
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

    const proposal = await Proposal.findOneAndUpdate(
      { _id: `${issueId}-${funderId}` },
      {
        $set: {
          issueId,
          funderId,
          amount,
          note,
          status: "sent",
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true, returnDocument: "after" },
    );

    const currentRank = ISSUE_STATUS_ORDER.indexOf(issue.status as IssueStatus);
    const proposedRank = ISSUE_STATUS_ORDER.indexOf("proposed");
    let statusChanged = false;
    if (currentRank < proposedRank) {
      issue.status = "proposed";
      await issue.save();
      statusChanged = true;
    }

    await trackIssueAction(issueId, {
      actor: auth.user.name,
      action: statusChanged ? "proposed" : "proposal_updated",
      note: statusChanged
        ? `Proposal of ₹${amount.toLocaleString("en-IN")} sent to ${funder.name}`
        : `Proposal updated for ${funder.name}`,
      issue: {
        reportedBy: issue.reportedBy,
        assignedUniversityId: issue.assignedUniversityId,
        _id: issue._id,
      },
    });

    const funderUser = await User.findOne({ role: "company", orgId: funderId }).select("_id").lean();
    if (funderUser) {
      await Notification.create({
        _id: `ntf-${Date.now().toString(36)}-prop`,
        userId: funderUser._id,
        type: "proposal",
        title: `New proposal for ${issueId}`,
        body: `${auth.user.name} proposed ₹${amount.toLocaleString("en-IN")} for "${issue.title}"`,
      });
    }

    return NextResponse.json(
      {
        ok: true,
        statusChanged,
        proposal: { ...proposal!.toObject(), id: String(proposal!._id) },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/proposals failed", error);
    return NextResponse.json({ error: "Failed to create proposal" }, { status: 500 });
  }
}