import { NextResponse } from "next/server";

import { getLeaderboards } from "@/server/analytics";
import { connectToDb } from "@/server/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectToDb();
    const leaderboards = await getLeaderboards();
    return NextResponse.json(leaderboards);
  } catch (error) {
    console.error("GET /api/analytics/leaderboard failed", error);
    return NextResponse.json({ error: "Failed to load leaderboards" }, { status: 500 });
  }
}