import { NextResponse } from "next/server";

import { requireAuth } from "@/server/auth";
import { connectToDb } from "@/server/db";
import { uniqueId } from "@/server/lib";
import { NgoGrant, type INgoGrant } from "@/server/models";

export const runtime = "nodejs";

function grantJson(doc: INgoGrant) {
  return {
    id: String(doc._id),
    projectTitle: doc.projectTitle,
    funderName: doc.funderName,
    funderLogo: doc.funderLogo,
    amountRequested: doc.amountRequested,
    amountApproved: doc.amountApproved,
    amountDisbursed: doc.amountDisbursed,
    status: doc.status,
    progressPct: doc.progressPct,
    targetDate: doc.targetDate,
    milestoneDescription: doc.milestoneDescription,
  };
}

export async function GET() {
  const auth = await requireAuth("ngo", "admin");
  if (!auth.ok) return auth.response;

  try {
    await connectToDb();
    const docs = await NgoGrant.find().sort({ createdAt: -1 }).lean<INgoGrant[]>();
    return NextResponse.json({ grants: docs.map(grantJson) });
  } catch (error) {
    console.error("GET /api/ngo/grants failed", error);
    return NextResponse.json({ error: "Failed to load grants" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAuth("ngo", "admin");
  if (!auth.ok) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const input = (body ?? {}) as Record<string, unknown>;

  const projectTitle = typeof input.projectTitle === "string" ? input.projectTitle.trim() : "";
  const funderName = typeof input.funderName === "string" ? input.funderName.trim() : "";
  const milestoneDescription =
    typeof input.milestoneDescription === "string" ? input.milestoneDescription.trim() : "";

  if (!projectTitle || !funderName) {
    return NextResponse.json(
      { error: "projectTitle and funderName are required" },
      { status: 400 },
    );
  }

  const amountRaw = Number(input.amount);
  const amountRequested = Number.isFinite(amountRaw) ? Math.max(50000, amountRaw) : 300000;

  try {
    await connectToDb();
    const doc = await NgoGrant.create({
      _id: uniqueId("grant"),
      projectTitle,
      funderName,
      funderLogo: funderName.slice(0, 2).toUpperCase(),
      amountRequested,
      amountApproved: amountRequested,
      amountDisbursed: 0,
      status: "Under CSR Review",
      progressPct: 10,
      targetDate: "Feb 2027",
      milestoneDescription: milestoneDescription || "Phase 1 pilot installation & citizen impact logging",
    });

    return NextResponse.json({ grant: grantJson(doc.toObject() as INgoGrant) }, { status: 201 });
  } catch (error) {
    console.error("POST /api/ngo/grants failed", error);
    return NextResponse.json({ error: "Failed to create grant" }, { status: 500 });
  }
}