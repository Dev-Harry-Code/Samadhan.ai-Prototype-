import type { NextResponse } from "next/server";

import { cookies } from "next/headers";

import { connectToDb } from "@/server/db";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  signSession,
  verifySessionToken,
  type SessionPayload,
  type SessionUser,
} from "@/server/jwt";
import { User } from "@/server/models";

export type AuthResult =
  | { ok: true; user: SessionUser }
  | { ok: false; response: NextResponse };

export const safeSessionCookieOptions = (): {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax";
  path: string;
  maxAge: number;
} => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: SESSION_MAX_AGE,
});

export const createSessionCookie = async (
  payload: SessionPayload,
): Promise<string> => signSession(payload);

export const deleteSessionCookie = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
};

export const getUserFromSession = async (): Promise<SessionUser | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const payload = await verifySessionToken(token);
  if (!payload) return null;

  try {
    await connectToDb();
    const user = await User.findById(payload.sub)
      .select("name role orgId")
      .lean<{ _id: unknown; name: string; role: string; orgId?: string }>();
    if (!user) return null;
    return { id: String(user._id), role: user.role, name: user.name, orgId: user.orgId };
  } catch {
    return null;
  }
};

export const requireAuth = async (
  ...allowedRoles: string[]
): Promise<AuthResult> => {
  const user = await getUserFromSession();

  if (!user) {
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }) as NextResponse,
    };
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }) as NextResponse,
    };
  }

  return { ok: true, user };
};

export type { SessionPayload, SessionUser };