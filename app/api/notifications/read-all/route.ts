import { NextResponse } from "next/server";

import { requireAuth } from "@/server/auth";
import { connectToDb } from "@/server/db";
import { Notification } from "@/server/models";

export const runtime = "nodejs";

export async function POST() {
  const auth = await requireAuth();
  if (!auth.ok) return auth.response;

  try {
    await connectToDb();
    const result = await Notification.updateMany(
      { userId: auth.user.id, read: false },
      { $set: { read: true } },
    );
    return NextResponse.json({ ok: true, modified: result.modifiedCount });
  } catch (error) {
    console.error("POST /api/notifications/read-all failed", error);
    return NextResponse.json({ error: "Failed to mark notifications read" }, { status: 500 });
  }
}