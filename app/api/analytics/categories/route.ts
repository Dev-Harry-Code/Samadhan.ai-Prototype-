import { NextResponse } from "next/server";

import { getCategoryShare } from "@/server/analytics";
import { connectToDb } from "@/server/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectToDb();
    const categories = await getCategoryShare();
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("GET /api/analytics/categories failed", error);
    return NextResponse.json({ error: "Failed to load category analytics" }, { status: 500 });
  }
}