import { NextResponse } from "next/server";

import { requireAuth } from "@/server/auth";
import { connectToDb } from "@/server/db";
import { uniqueId } from "@/server/lib";
import { NgoDrive, type INgoDrive, type NgoDriveCategory } from "@/server/models";

export const runtime = "nodejs";

function driveJson(doc: INgoDrive) {
  return {
    id: String(doc._id),
    title: doc.title,
    category: doc.category,
    location: doc.location,
    ward: doc.ward,
    scheduledDate: doc.scheduledDate,
    status: doc.status,
    volunteersRequired: doc.volunteersRequired,
    volunteersRegistered: doc.volunteersRegistered,
    budgetAllocated: doc.budgetAllocated,
    budgetSpent: doc.budgetSpent,
    equipment: doc.equipment,
    csrSponsor: doc.csrSponsor,
    description: doc.description,
  };
}

export async function GET() {
  const auth = await requireAuth("ngo", "admin");
  if (!auth.ok) return auth.response;

  try {
    await connectToDb();
    const docs = await NgoDrive.find().sort({ status: 1 }).lean<INgoDrive[]>();
    return NextResponse.json({ drives: docs.map(driveJson) });
  } catch (error) {
    console.error("GET /api/ngo/drives failed", error);
    return NextResponse.json({ error: "Failed to load drives" }, { status: 500 });
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

  const title = typeof input.title === "string" ? input.title.trim() : "";
  const location = typeof input.location === "string" ? input.location.trim() : "";
  const ward = typeof input.ward === "string" ? input.ward.trim() : "";
  const category = (typeof input.category === "string" ? input.category : "") as NgoDriveCategory;

  if (!title || !location) {
    return NextResponse.json(
      { error: "title and location are required" },
      { status: 400 },
    );
  }

  const volunteersRequiredRaw = Number(input.volunteersRequired);
  const volunteersRequired = Number.isFinite(volunteersRequiredRaw)
    ? Math.max(1, Math.floor(volunteersRequiredRaw))
    : 15;
  const equipment = Array.isArray(input.equipment)
    ? (input.equipment as unknown[]).filter((e): e is string => typeof e === "string")
    : [];
  const csrSponsor = typeof input.csrSponsor === "string" ? input.csrSponsor.trim() : "";
  const description = typeof input.description === "string" ? input.description.trim() : "";

  try {
    await connectToDb();
    const doc = await NgoDrive.create({
      _id: uniqueId("drive"),
      title,
      category: category || "Sanitation & Waste",
      location,
      ward: ward || "Jodhpur Municipal Area",
      scheduledDate:
        typeof input.scheduledDate === "string" && input.scheduledDate.trim()
          ? (input.scheduledDate as string)
          : "Tomorrow · 07:30 AM",
      status: "Scheduled",
      volunteersRequired,
      volunteersRegistered: 1,
      budgetAllocated: 15000,
      budgetSpent: 0,
      equipment,
      csrSponsor: csrSponsor || "Tata Steel CSR Foundation",
      description: description || "Community-driven rapid cleanup and civic restoration drive in Jodhpur.",
    });

    return NextResponse.json({ drive: driveJson(doc.toObject() as INgoDrive) }, { status: 201 });
  } catch (error) {
    console.error("POST /api/ngo/drives failed", error);
    return NextResponse.json({ error: "Failed to create drive" }, { status: 500 });
  }
}