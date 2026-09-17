import { NextResponse } from "next/server";

import { requireAuth } from "@/server/auth";
import { connectToDb } from "@/server/db";
import { Notification, type INotification } from "@/server/models";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const auth = await requireAuth();
  if (!auth.ok) return auth.response;

  const { searchParams } = new URL(request.url);
  const limitRaw = Number(searchParams.get("limit"));
  const limit =
    Number.isFinite(limitRaw) && limitRaw > 0 ? Math.min(Math.floor(limitRaw), 100) : 50;

  try {
    await connectToDb();

    const docs = await Notification.find({ userId: auth.user.id })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean<INotification[]>();

    const unread = await Notification.countDocuments({
      userId: auth.user.id,
      read: false,
    });

    return NextResponse.json({
      notifications: docs.map((n) => ({
        id: String(n._id),
        type: n.type,
        title: n.title,
        body: n.body ?? "",
        read: n.read,
        createdAt: n.createdAt ? n.createdAt.toISOString() : new Date().toISOString(),
      })),
      count: docs.length,
      unread,
    });
  } catch (error) {
    console.error("GET /api/notifications failed", error);
    return NextResponse.json({ error: "Failed to load notifications" }, { status: 500 });
  }
}