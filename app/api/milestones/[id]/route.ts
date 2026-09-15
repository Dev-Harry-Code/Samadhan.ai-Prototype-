import { NextResponse } from "next/server";

import { requireAuth } from "@/server/auth";
import { connectToDb } from "@/server/db";
import { Team } from "@/server/models";

export const runtime = "nodejs";

export async function PATCH(
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

  const label = typeof input.label === "string" ? input.label.trim() : "";
  const done = input.done === true;
  const index = typeof input.index === "number" ? input.index : undefined;

  if (!label && index === undefined) {
    return NextResponse.json(
      { error: "Provide the milestone label (or index) to update" },
      { status: 400 },
    );
  }

  try {
    await connectToDb();

    const team = await Team.findById(id);
    if (!team) {
      return NextResponse.json({ error: "Team not found for this issue" }, { status: 404 });
    }

    const targetIndex =
      index !== undefined
        ? index
        : team.milestones.findIndex((m) => m.label === label);

    if (targetIndex < 0 || targetIndex >= team.milestones.length) {
      return NextResponse.json({ error: "Milestone not found" }, { status: 404 });
    }

    team.milestones[targetIndex].done = done;
    await team.save();

    return NextResponse.json({
      ok: true,
      milestone: team.milestones[targetIndex],
      milestones: team.milestones,
    });
  } catch (error) {
    console.error(`PATCH /api/milestones/[id] failed for ${id}`, error);
    return NextResponse.json({ error: "Failed to update milestone" }, { status: 500 });
  }
}