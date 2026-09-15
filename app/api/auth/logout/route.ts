import { deleteSessionCookie } from "@/server/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  await deleteSessionCookie();
  return NextResponse.json({ ok: true });
}