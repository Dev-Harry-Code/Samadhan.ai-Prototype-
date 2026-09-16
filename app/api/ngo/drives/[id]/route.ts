import { NextResponse } from "next/server";

import { requireAuth } from "@/server/auth";
import { connectToDb } from "@/server/db";
import { NgoDrive, type INgoDrive } from "@/server/models";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const auth = await requireAuth("ngo", "admin");
  if (!auth.ok) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const input = (body ?? {}) as Record<string, unknown>;

  try {
    await connectToDb();
    const drive = await NgoDrive.findById(id);
    if (!drive) {
      return NextResponse.json({ error: "Drive not found" }, { status: 404 });
    }

    const action = typeof input.action === "string" ? input.action.trim() : "";

    if (action === "deploy") {
      drive.volunteersRegistered = Math.min(
        drive.volunteersRequired,
        drive.volunteersRegistered + 1,
      );
    } else if (action === "toggle-done") {
      drive.status = drive.status === "Completed" ? "Active Now" : "Completed";
    } else if (action === "start") {
      drive.status = "Active Now";
    } else if (action === "update") {
      if (typeof input.status === "string") {
        const status = input.status as INgoDrive["status"];
        if (["Active Now", "Scheduled", "Completed"].includes(status)) drive.status = status;
      }
      if (typeof input.budgetSpent === "number") drive.budgetSpent = input.budgetSpent;
    } else {
      return NextResponse.json(
        { error: "Unknown action. Use deploy, toggle-done, start or update." },
        { status: 400 },
      );
    }

    await drive.save();
    return NextResponse.json({ ok: true, id: String(drive._id), status: drive.status });
  } catch (error) {
    console.error(`PATCH /api/ngo/drives/[id] failed for ${id}`, error);
    return NextResponse.json({ error: "Failed to update drive" }, { status: 500 });
  }
}