import { NextResponse } from "next/server";

import { requireAuth } from "@/server/auth";
import { connectToDb } from "@/server/db";
import { NgoVolunteer, type INgoVolunteer } from "@/server/models";

export const runtime = "nodejs";

function volunteerJson(doc: INgoVolunteer) {
  return {
    id: String(doc._id),
    name: doc.name,
    phone: doc.phone,
    avatar: doc.avatar,
    skills: doc.skills,
    status: doc.status,
    hours: doc.hours,
    drivesCompleted: doc.drivesCompleted,
    assignedDrive: doc.assignedDrive ?? undefined,
    rating: doc.rating,
  };
}

export async function GET() {
  const auth = await requireAuth("ngo", "admin");
  if (!auth.ok) return auth.response;

  try {
    await connectToDb();
    const docs = await NgoVolunteer.find().sort({ hours: -1 }).lean<INgoVolunteer[]>();
    return NextResponse.json({ volunteers: docs.map(volunteerJson) });
  } catch (error) {
    console.error("GET /api/ngo/volunteers failed", error);
    return NextResponse.json({ error: "Failed to load volunteers" }, { status: 500 });
  }
}