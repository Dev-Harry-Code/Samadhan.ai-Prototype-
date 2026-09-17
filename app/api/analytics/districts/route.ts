import { NextResponse } from "next/server";

import { getDistrictCounts } from "@/server/analytics";
import { connectToDb } from "@/server/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectToDb();
    const districts = await getDistrictCounts();
    return NextResponse.json({ districts });
  } catch (error) {
    console.error("GET /api/analytics/districts failed", error);
    return NextResponse.json({ error: "Failed to load district analytics" }, { status: 500 });
  }
}