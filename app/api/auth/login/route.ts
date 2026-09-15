import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createSessionCookie, safeSessionCookieOptions } from "@/server/auth";
import { connectToDb } from "@/server/db";
import { SESSION_COOKIE } from "@/server/jwt";
import { User } from "@/server/models";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const { email, password } = (body ?? {}) as { email?: string; password?: string };
  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 },
    );
  }

  const normalizedEmail = email.trim().toLowerCase();
  let user:
    | { _id: string; role: string; name: string; email: string; orgId?: string }
    | undefined;

  try {
    await connectToDb();
    const candidates = await User.find({ email: normalizedEmail }).lean();
    for (const candidate of candidates) {
      if (await bcrypt.compare(password, candidate.passwordHash)) {
        user = {
          _id: String(candidate._id),
          role: candidate.role,
          name: candidate.name,
          email: candidate.email,
          orgId: candidate.orgId,
        };
        break;
      }
    }
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }

  if (!user) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 },
    );
  }

  const token = await createSessionCookie({ sub: user._id, role: user.role });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, safeSessionCookieOptions());

  return NextResponse.json({ user });
}