import { NextResponse } from "next/server";

import { requireAuth } from "@/server/auth";
import { connectToDb } from "@/server/db";
import { NgoGrant, type NgoGrantStatus } from "@/server/models";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const auth = await requireAuth("ngo", "admin");
  if (!auth.ok) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const input = (body ?? {}) as Record<string, unknown>;

  try {
    await connectToDb();
    const grant = await NgoGrant.findById(id);
    if (!grant) {
      return NextResponse.json({ error: "Grant not found" }, { status: 404 });
    }

    const action = typeof input.action === "string" ? input.action.trim() : "";

    if (action === "release") {
      grant.progressPct = Math.min(100, grant.progressPct + 20);
      grant.amountDisbursed = Math.min(
        grant.amountApproved,
        grant.amountDisbursed + Math.round(grant.amountApproved * 0.2),
      );
      if (grant.progressPct >= 100) grant.status = "Completed";
    } else if (action === "update") {
      if (typeof input.status === "string") {
        const status = input.status as NgoGrantStatus;
        if (["Approved & Active", "Under CSR Review", "Completed"].includes(status)) {
          grant.status = status;
        }
      }
      if (typeof input.progressPct === "number") grant.progressPct = input.progressPct;
    } else {
      return NextResponse.json(
        { error: "Unknown action. Use release or update." },
        { status: 400 },
      );
    }

    await grant.save();
    return NextResponse.json({
      ok: true,
      id: String(grant._id),
      status: grant.status,
      progressPct: grant.progressPct,
      amountDisbursed: grant.amountDisbursed,
    });
  } catch (error) {
    console.error(`PATCH /api/ngo/grants/[id] failed for ${id}`, error);
    return NextResponse.json({ error: "Failed to update grant" }, { status: 500 });
  }
}