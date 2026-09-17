import { NextResponse } from "next/server";

import { getLiveStats } from "@/server/analytics";
import { connectToDb } from "@/server/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectToDb();
    const stats = await getLiveStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("GET /api/stats/live failed", error);
    return NextResponse.json({ error: "Failed to load live stats" }, { status: 500 });
  }
}