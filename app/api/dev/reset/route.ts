import { NextResponse } from "next/server";

import { requireAuth } from "@/server/auth";
import { connectToDb } from "@/server/db";
import {
  ActivityLog,
  Analysis,
  Category,
  Comment,
  DuplicateCluster,
  Evidence,
  Funder,
  Funding,
  Issue,
  NgoDrive,
  NgoGrant,
  NgoVolunteer,
  Notification,
  Proposal,
  Team,
  University,
  Upvote,
  User,
} from "@/server/models";
import { reseed } from "@/server/seed";

export const runtime = "nodejs";

const SEEDED_COLLECTIONS = [
  "users",
  "activitylogs",
  "analyses",
  "categories",
  "comments",
  "duplicateclusters",
  "evidences",
  "funders",
  "fundings",
  "issues",
  "notifications",
  "proposals",
  "teams",
  "universities",
  "upvotes",
  "ngodrives",
  "ngovolunteers",
  "ngogrants",
];

export async function POST() {
  const gated =
    process.env.NODE_ENV === "production" && process.env.ALLOW_RESET !== "true";
  if (gated) {
    return NextResponse.json(
      { error: "Reset is disabled outside dev/demo. Set ALLOW_RESET=true to enable." },
      { status: 403 },
    );
  }

  const auth = await requireAuth("admin");
  if (!auth.ok) return auth.response;

  const seedModels = [
    User,
    ActivityLog,
    Analysis,
    Category,
    Comment,
    DuplicateCluster,
    Evidence,
    Funder,
    Funding,
    Issue,
    NgoDrive,
    NgoGrant,
    NgoVolunteer,
    Notification,
    Proposal,
    Team,
    University,
    Upvote,
  ];

  try {
    await connectToDb();

    for (const name of SEEDED_COLLECTIONS) {
      try {
        await seedModels
          .find((m) => m.collection.name === name)
          ?.collection.drop();
      } catch {
        // collection does not exist yet - ignore
      }
    }

    const result = await reseed();
    return NextResponse.json({
      ok: true,
      db: result.dbName,
      counts: result.counts,
    });
  } catch (error) {
    console.error("POST /api/dev/reset failed", error);
    return NextResponse.json({ error: "Reset failed" }, { status: 500 });
  }
}