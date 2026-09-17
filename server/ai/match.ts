import { UNIVERSITIES, matchFor } from "@/lib/data/mock-data";
import type { Issue } from "@/lib/types";
import type { CategoryId } from "@/lib/types";
import { connectToDb } from "@/server/db";
import { Issue as IssueModel, University as UniversityModel } from "@/server/models";

import { withTimeout } from "./data-access";
import type { UniversityMatch } from "./types";

async function loadRealPriorProjects(): Promise<Map<string, number>> {
  try {
    await withTimeout(() => connectToDb());
    const docs = await withTimeout(() =>
      UniversityModel.find({}).select("_id priorProjects").lean(),
    );
    const map = new Map<string, number>();
    for (const doc of docs) {
      if (typeof doc.priorProjects === "number") {
        map.set(String(doc._id), doc.priorProjects);
      }
    }
    return map;
  } catch {
    return new Map();
  }
}

async function loadAssignmentCounts(): Promise<Map<string, number>> {
  try {
    await withTimeout(() => connectToDb());
    const rows = await withTimeout(() =>
      IssueModel.aggregate<{ _id: string | null; count: number }>([
        { $group: { _id: "$assignedUniversityId", count: { $sum: 1 } } },
      ]),
    );
    const map = new Map<string, number>();
    for (const row of rows) {
      if (typeof row._id === "string") map.set(row._id, row.count);
    }
    return map;
  } catch {
    return new Map();
  }
}

export async function matchUniversities(category: CategoryId): Promise<UniversityMatch[]> {
  const [realPrior, assignedCounts] = await Promise.all([
    loadRealPriorProjects(),
    loadAssignmentCounts(),
  ]);

  const universities = UNIVERSITIES.map((u) => ({
    ...u,
    priorProjects: realPrior.get(u.id) ?? u.priorProjects,
  }));

  const basis = matchFor({ category } as Issue, universities);

  return basis
    .map(({ university, score }) => {
      const assigned = assignedCounts.get(university.id) ?? 0;
      const priorProjects = Math.max(university.priorProjects, assigned * 3);
      const projectFactor = Math.min(1, priorProjects / 30);
      const blended = score * 0.9 + projectFactor * 10;
      return {
        university: {
          id: university.id,
          name: university.name,
          shortName: university.shortName,
          focus: university.focus,
        },
        score: Math.min(99, Math.max(30, Math.round(blended))),
        priorProjects,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}