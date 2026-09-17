import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectToDb } from "@/server/db";
import { SESSION_COOKIE, verifySessionToken } from "@/server/jwt";
import { User } from "@/server/models";

export const runtime = "nodejs";

export async function GET() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await verifySessionToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDb();
    const user = await User.findById(payload.sub)
      .select("name role email orgId")
      .lean<{ _id: unknown; name: string; role: string; email: string; orgId?: string }>();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      user: { id: String(user._id), name: user.name, role: user.role, email: user.email, orgId: user.orgId },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}