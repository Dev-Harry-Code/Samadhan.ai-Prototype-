import bcrypt from "bcryptjs";

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
  Notification,
  Proposal,
  Team,
  University,
  Upvote,
  User,
  type IUser,
  type UserRole,
} from "@/server/models";
import { INITIAL_COMMENTS, CITIZEN_NOTIFICATIONS } from "@/lib/data/akshat-mock";
import {
  ANALYSIS,
  CATEGORIES,
  FUNDERS,
  SEED_FUNDINGS,
  SEED_ISSUES,
  SEED_TEAMS,
  UNIVERSITIES,
} from "@/lib/data/mock-data";

const DAY = 86_400_000;
const now = Date.now();

const slugEmail = (name: string): string =>
  name
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "") + "@samadhan.ai";

const DEMO_USERS: Array<{
  role: UserRole;
  name: string;
  email: string;
  password: string;
  orgId?: string;
}> = [
  { role: "citizen", name: "Aarav Mehta", email: "aarav@samadhan.ai", password: "citizen123" },
  { role: "ngo", name: "Aditi Sharma", email: "aditi@samadhan.ai", password: "ngo123" },
  {
    role: "university",
    name: "Prof. Aarav Mehta",
    email: "prof@samadhan.ai",
    password: "uni@2026",
    orgId: "bit-mesra",
  },
  {
    role: "company",
    name: "Aarav Mehta",
    email: "aarav@samadhan.ai",
    password: "demo1234",
    orgId: "datar-trusts",
  },
  { role: "admin", name: "Admin", email: "admin@samadhan.ai", password: "admin@2026" },
];

const REPORTERS: Array<{ name: string; karma: number }> = [
  { name: "Sakshi Verma", karma: 320 },
  { name: "Ravi Kumar", karma: 210 },
  { name: "Anita Roy", karma: 180 },
  { name: "Dr. Meena Kumari", karma: 460 },
  { name: "Sunil Mahto", karma: 150 },
  { name: "Kiran Gopal", karma: 120 },
  { name: "Citizen", karma: 60 },
  { name: "Anita Singh", karma: 240 },
  { name: "Suresh Patel", karma: 195 },
];

const UPVOTE_SEED: Array<{ issueId: string; email: string; role: UserRole }> = [
  { issueId: "LOK-1042", email: "aarav@samadhan.ai", role: "citizen" },
  { issueId: "LOK-1042", email: "sakshi.verma@samadhan.ai", role: "citizen" },
  { issueId: "LOK-1042", email: "ravi.kumar@samadhan.ai", role: "citizen" },
  { issueId: "LOK-1042", email: "anita.singh@samadhan.ai", role: "citizen" },
  { issueId: "LOK-1042", email: "suresh.patel@samadhan.ai", role: "citizen" },
  { issueId: "LOK-0902", email: "sakshi.verma@samadhan.ai", role: "citizen" },
  { issueId: "LOK-1026", email: "ravi.kumar@samadhan.ai", role: "citizen" },
  { issueId: "LOK-1026", email: "suresh.patel@samadhan.ai", role: "citizen" },
  { issueId: "LOK-1011", email: "anita.roy@samadhan.ai", role: "citizen" },
  { issueId: "LOK-0990", email: "dr.meena.kumari@samadhan.ai", role: "citizen" },
  { issueId: "LOK-0990", email: "aarav@samadhan.ai", role: "citizen" },
  { issueId: "LOK-0987", email: "sunil.mahto@samadhan.ai", role: "citizen" },
  { issueId: "LOK-0974", email: "kiran.gopal@samadhan.ai", role: "citizen" },
];

const PROPOSAL_SEED: Array<{
  issueId: string;
  funderId: string;
  amount: number;
  note: string;
  status: "sent" | "approved";
  daysAgo: number;
}> = [
  {
    issueId: "LOK-1042",
    funderId: "datar-trusts",
    amount: 1000000,
    note: "HDPE pipe retrofit + solar chlorinator for community tap",
    status: "sent",
    daysAgo: 1,
  },
  {
    issueId: "LOK-1026",
    funderId: "datar-trusts",
    amount: 1500000,
    note: "School-corridor sanitation + drainage funding",
    status: "approved",
    daysAgo: 6,
  },
  {
    issueId: "LOK-0902",
    funderId: "piramal",
    amount: 1200000,
    note: "Clean-water kiosk pilot over 800 households",
    status: "approved",
    daysAgo: 51,
  },
];

const EVIDENCE_SEED: Array<{
  id: string;
  issueId: string;
  kind: "scheme" | "paper" | "case-similar" | "solution";
  title: string;
  source: string;
  url: string;
  snippet: string;
}> = [
  {
    id: "ev-LOK-1042-scheme-jjm",
    issueId: "LOK-1042",
    kind: "scheme",
    title: "Jal Jeevan Mission - Har Ghar Jal",
    source: "Ministry of Jal Shakti, Government of India",
    url: "https://jalshakti-dowr.gov.in/schemes/jal-jeevan-mission",
    snippet:
      "Functional household tap connections under JJM; pipeline replacement and community tap coverage in rural Jharkhand.",
  },
  {
    id: "ev-LOK-1042-case-kolhan",
    issueId: "LOK-1042",
    kind: "case-similar",
    title: "Community water kiosk pilot - Kolhan Block",
    source: "Samadhan.ai case library (LOK-0902)",
    url: "https://samadhan.ai/cases/kiosk-kolhan",
    snippet: "Solar-chlorinated kiosk served 800 households; 210 post-install samples verified clean.",
  },
  {
    id: "ev-LOK-1042-solution-kiosk",
    issueId: "LOK-1042",
    kind: "solution",
    title: "Solar-chlorinated community tap scheme",
    source: "BIT Mesra, Environmental Engineering department",
    url: "https://samadhan.ai/evidence/bit-mesra-kiosk",
    snippet:
      "HDPE retrofit + solar chlorinator before the community tap; pressure gauge and auto-sampler recommended.",
  },
];

const NOTIFICATION_SEED = CITIZEN_NOTIFICATIONS.map((n, i) => ({
  id: n.id,
  issueId: "LOK-1042",
  type: n.type,
  title: n.title,
  body: n.body,
  ageMinutes: [12, 60, 180, 300, 1440, 2880][i] ?? 1440,
}));

const STATUS_ORDER = [
  "reported",
  "ai_validated",
  "team_formed",
  "proposed",
  "funded",
  "deployed",
  "resolved",
] as const;

const universityName = (id: string): string =>
  UNIVERSITIES.find((u) => u.id === id)?.name ?? id;

const funderName = (id: string): string => FUNDERS.find((f) => f.id === id)?.name ?? id;

export interface SeedRunResult {
  dbName: string;
  host: string;
  counts: Record<string, number>;
}

export async function reseed(): Promise<SeedRunResult> {
  const mongoose = await connectToDb();

  const identity = (email: string, role: UserRole) => `${email}::${role}`;
  const userByIdentity = new Map<string, IUser>();

  const hashCache = new Map<string, string>();
  const hashFor = (pw: string): string => {
    const hit = hashCache.get(pw);
    if (hit) return hit;
    const out = bcrypt.hashSync(pw, 10);
    hashCache.set(pw, out);
    return out;
  };

  for (const u of DEMO_USERS) {
    const doc = await User.findOneAndUpdate(
      { email: u.email, role: u.role },
      {
        $set: {
          name: u.name,
          role: u.role,
          passwordHash: hashFor(u.password),
          orgId: u.orgId,
        },
        $setOnInsert: { createdAt: new Date(now) },
      },
      { upsert: true, returnDocument: "after" },
    );
    userByIdentity.set(identity(u.email, u.role), doc!.toObject());
  }

  for (const r of REPORTERS) {
    const doc = await User.findOneAndUpdate(
      { email: slugEmail(r.name), role: "citizen" },
      {
        $set: { name: r.name, role: "citizen", passwordHash: hashFor("citizen123") },
        $setOnInsert: { karma: r.karma, createdAt: new Date(now) },
      },
      { upsert: true, returnDocument: "after" },
    );
    userByIdentity.set(identity(slugEmail(r.name), "citizen"), doc!.toObject());
  }

  for (const c of CATEGORIES) {
    await Category.findOneAndUpdate(
      { _id: c.id },
      { $set: { label: c.label, icon: c.id } },
      { upsert: true, returnDocument: "after" },
    );
  }

  for (const u of UNIVERSITIES) {
    await University.findOneAndUpdate(
      { _id: u.id },
      {
        $set: {
          name: u.name,
          shortName: u.shortName,
          state: u.state,
          focus: u.focus,
          priorProjects: u.priorProjects,
          labs: u.labs,
          bestCategories: u.bestCategories,
        },
      },
      { upsert: true, returnDocument: "after" },
    );
  }

  for (const f of FUNDERS) {
    await Funder.findOneAndUpdate(
      { _id: f.id },
      {
        $set: {
          name: f.name,
          kind: f.kind,
          fundedProjects: f.fundedProjects,
          focus: f.focus,
        },
      },
      { upsert: true, returnDocument: "after" },
    );
  }

  for (const issue of SEED_ISSUES) {
    const reporter = userByIdentity.get(identity(slugEmail(issue.reportedBy), "citizen"));
    if (!reporter) continue;
    const extra: {
      matchScore?: number;
      assignedUniversityId?: string;
      photo?: string;
    } = {};
    if (issue.matchScore != null) extra.matchScore = issue.matchScore;
    if (issue.assignedUniversityId) extra.assignedUniversityId = issue.assignedUniversityId;
    if (issue.imageUrl ?? issue.photo) extra.photo = issue.imageUrl ?? issue.photo;
    await Issue.findOneAndUpdate(
      { _id: issue.id },
      {
        $set: {
          title: issue.title,
          description: issue.description,
          category: issue.category,
          severity: issue.severity,
          location: issue.location,
          reportedBy: reporter._id,
          peopleAffected: issue.peopleAffected,
          trustScore: issue.trustScore ?? 88,
          status: issue.status,
          createdAt: new Date(issue.createdAt),
          ...extra,
        },
      },
      { upsert: true, returnDocument: "after" },
    );
  }

  for (const issue of SEED_ISSUES) {
    const bundle = ANALYSIS[issue.category];
    const confidence = Number(
      Math.min(0.98, 0.85 + (issue.trustScore ?? 88) * 0.0012).toFixed(3),
    );
    await Analysis.findOneAndUpdate(
      { _id: `${issue.id}-analysis` },
      {
        $set: {
          issueId: issue.id,
          summary: bundle.summary,
          causes: bundle.causes,
          recommendations: bundle.recommendations,
          cost: bundle.cost,
          timeline: bundle.timeline,
          classificationConfidence: confidence,
        },
      },
      { upsert: true, returnDocument: "after" },
    );
  }

  for (const e of EVIDENCE_SEED) {
    await Evidence.findOneAndUpdate(
      { _id: e.id },
      {
        $set: {
          issueId: e.issueId,
          kind: e.kind,
          title: e.title,
          source: e.source,
          url: e.url,
          snippet: e.snippet,
          citedAt: new Date(now - DAY),
        },
      },
      { upsert: true, returnDocument: "after" },
    );
  }

  for (const [issueId, team] of Object.entries(SEED_TEAMS)) {
    await Team.findOneAndUpdate(
      { _id: issueId },
      {
        $set: {
          issueId,
          universityId: team.universityId,
          members: team.members.map((m) => ({
            name: m.name,
            role: m.role,
            year: m.year,
          })),
          faculty: team.faculty,
          message: team.message,
          milestones: team.milestones.map((m) => ({
            label: m.label,
            desc: m.desc,
            due: m.due,
            done: m.done,
          })),
          formedAt: new Date(team.formedAt),
        },
      },
      { upsert: true, returnDocument: "after" },
    );
  }

  for (const [issueId, f] of Object.entries(SEED_FUNDINGS)) {
    await Funding.findOneAndUpdate(
      { _id: `${issueId}-${f.funderId}` },
      {
        $set: {
          issueId,
          funderId: f.funderId,
          amount: f.amount,
          note: f.note,
          date: new Date(f.date),
        },
      },
      { upsert: true, returnDocument: "after" },
    );
  }

  for (const p of PROPOSAL_SEED) {
    await Proposal.findOneAndUpdate(
      { _id: `${p.issueId}-${p.funderId}` },
      {
        $set: {
          issueId: p.issueId,
          funderId: p.funderId,
          amount: p.amount,
          note: p.note,
          status: p.status,
          createdAt: new Date(now - p.daysAgo * DAY),
        },
      },
      { upsert: true, returnDocument: "after" },
    );
  }

  for (const c of INITIAL_COMMENTS) {
    const author = userByIdentity.get(identity(slugEmail(c.authorName), "citizen"));
    if (!author) continue;
    const ageDays = { c1: 3, c2: 2, c3: 1 }[c.id] ?? 1;
    await Comment.findOneAndUpdate(
      { _id: c.id },
      {
        $set: {
          issueId: "LOK-1042",
          author: author._id,
          text: c.text,
          upvotes: c.upvotes,
          createdAt: new Date(now - ageDays * DAY),
        },
      },
      { upsert: true, returnDocument: "after" },
    );
  }

  for (const u of UPVOTE_SEED) {
    const user = userByIdentity.get(identity(u.email, u.role));
    if (!user) continue;
    await Upvote.updateOne(
      { issueId: u.issueId, userId: user._id },
      { $setOnInsert: { issueId: u.issueId, userId: user._id } },
      { upsert: true },
    );
  }

  const citizenUser = userByIdentity.get(identity("aarav@samadhan.ai", "citizen"));
  if (citizenUser) {
    for (const n of NOTIFICATION_SEED) {
      await Notification.findOneAndUpdate(
        { _id: n.id },
        {
          $set: {
            userId: citizenUser._id,
            type: n.type,
            title: n.title,
            body: n.body,
            read: false,
            createdAt: new Date(now - n.ageMinutes * 60_000),
          },
        },
        { upsert: true, returnDocument: "after" },
      );
    }
  }

  for (const issue of SEED_ISSUES) {
    const cutoff = STATUS_ORDER.indexOf(issue.status) + 1;
    const progress = STATUS_ORDER.slice(0, cutoff);
    for (let i = 0; i < progress.length; i++) {
      const action = progress[i];
      const funderId = SEED_FUNDINGS[issue.id]?.funderId;
      const actor =
        action === "reported"
          ? issue.reportedBy
          : action === "ai_validated"
            ? "Samadhan AI"
            : action === "funded"
              ? funderName(funderId ?? "")
              : universityName(issue.assignedUniversityId ?? "");
      const note =
        action === "reported"
          ? "Issue reported"
          : action === "ai_validated"
            ? "AI validation passed"
            : action === "team_formed"
              ? `Team formed at ${universityName(issue.assignedUniversityId ?? "")}`
              : action === "proposed"
                ? "Proposal sent to funders"
                : action === "funded"
                  ? "Funding secured"
                  : action === "deployed"
                    ? "Solution deployed"
                    : "Issue resolved";
      await ActivityLog.findOneAndUpdate(
        { _id: `act-${issue.id}-${action}` },
        {
          $set: {
            issueId: issue.id,
            actor,
            action,
            note,
            createdAt: new Date(issue.createdAt + i * DAY),
          },
        },
        { upsert: true, returnDocument: "after" },
      );
    }
  }

  const rows: Array<[string, number]> = [
    ["users", await User.countDocuments()],
    ["categories", await Category.countDocuments()],
    ["issues", await Issue.countDocuments()],
    ["analyses", await Analysis.countDocuments()],
    ["evidence", await Evidence.countDocuments()],
    ["duplicateclusters", await DuplicateCluster.countDocuments()],
    ["universities", await University.countDocuments()],
    ["funders", await Funder.countDocuments()],
    ["teams", await Team.countDocuments()],
    ["proposals", await Proposal.countDocuments()],
    ["fundings", await Funding.countDocuments()],
    ["comments", await Comment.countDocuments()],
    ["upvotes", await Upvote.countDocuments()],
    ["notifications", await Notification.countDocuments()],
    ["activitylogs", await ActivityLog.countDocuments()],
  ];
  const counts: Record<string, number> = {};
  for (const [name, count] of rows) counts[name] = count;

  return {
    dbName: mongoose.connection.name,
    host: mongoose.connection.host,
    counts,
  };
}