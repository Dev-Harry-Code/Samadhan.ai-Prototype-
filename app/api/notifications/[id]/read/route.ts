import { NextResponse } from "next/server";

import { requireAuth } from "@/server/auth";
import { connectToDb } from "@/server/db";
import { Notification } from "@/server/models";

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
    await Notification.updateOne(
      { _id: id, userId: auth.user.id },
      { $set: { read: true } },
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(`POST /api/notifications/[id]/read failed for ${id}`, error);
    return NextResponse.json({ error: "Failed to mark notification read" }, { status: 500 });
  }
}