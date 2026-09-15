import { NextResponse } from "next/server";

import { requireAuth } from "@/server/auth";
import { connectToDb } from "@/server/db";
import { trackIssueAction } from "@/server/lib";
import { Issue, Team, type ITeamMember, type IMilestone } from "@/server/models";
import { ISSUE_STATUS_ORDER, type IssueStatus } from "@/lib/types";

export const runtime = "nodejs";

interface MemberInput {
  name?: unknown;
  role?: unknown;
  year?: unknown;
}

interface MilestoneInput {
  label?: unknown;
  desc?: unknown;
  due?: unknown;
  done?: unknown;
}

const isMember = (m: MemberInput): m is ITeamMember =>
  typeof m.name === "string" && typeof m.role === "string";

const isMilestone = (m: MilestoneInput): m is IMilestone =>
  typeof m.label === "string";

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
  const universityId =
    typeof input.universityId === "string" && input.universityId.trim()
      ? input.universityId.trim()
      : auth.user.orgId
        ? auth.user.orgId
        : undefined;

  if (!issueId) {
    return NextResponse.json({ error: "issueId is required" }, { status: 400 });
  }
  if (!universityId) {
    return NextResponse.json(
      { error: "universityId is required (or set orgId on your account)" },
      { status: 400 },
    );
  }

  const membersRaw = Array.isArray(input.members) ? (input.members as MemberInput[]) : [];
  const members = membersRaw.filter(isMember);
  const milestonesRaw = Array.isArray(input.milestones)
    ? (input.milestones as MilestoneInput[])
    : [];
  const milestones = milestonesRaw.filter(isMilestone).map((m) => ({
    label: m.label,
    desc: typeof m.desc === "string" ? m.desc : undefined,
    due: typeof m.due === "string" ? m.due : undefined,
    done: m.done === true,
  }));

  try {
    await connectToDb();

    const issue = await Issue.findById(issueId);
    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    const team = await Team.findOneAndUpdate(
      { _id: issueId },
      {
        $set: {
          universityId,
          members: members.map((m) => ({ name: m.name, role: m.role, year: m.year })),
          faculty: typeof input.faculty === "string" ? input.faculty : "",
          message: typeof input.message === "string" ? input.message : "",
          milestones,
        },
        $setOnInsert: { issueId, formedAt: new Date() },
      },
      { upsert: true, returnDocument: "after" },
    );

    const currentRank = ISSUE_STATUS_ORDER.indexOf(issue.status as IssueStatus);
    const teamRank = ISSUE_STATUS_ORDER.indexOf("team_formed");
    let statusChanged = false;
    if (currentRank < teamRank) {
      issue.status = "team_formed";
      await issue.save();
      statusChanged = true;
    }

    await trackIssueAction(issueId, {
      actor: auth.user.name,
      action: statusChanged ? "team_formed" : "team_updated",
      note: statusChanged
        ? `Team formed at ${universityId}`
        : `Team updated at ${universityId}`,
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
        team: { ...team!.toObject(), id: String(team!._id) },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/teams failed", error);
    return NextResponse.json({ error: "Failed to form team" }, { status: 500 });
  }
}