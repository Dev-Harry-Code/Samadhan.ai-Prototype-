import { NextResponse } from "next/server";

import { getTrends } from "@/server/analytics";
import { connectToDb } from "@/server/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectToDb();
    const trends = await getTrends();
    return NextResponse.json({ trends });
  } catch (error) {
    console.error("GET /api/analytics/trends failed", error);
    return NextResponse.json({ error: "Failed to load trends" }, { status: 500 });
  }
}