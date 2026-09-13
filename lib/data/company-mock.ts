// ---------------------------------------------------------------------------
// AI Samadhan for Business — Company / CSR-Funder portal mock data
// Ported from "Gaurav's App" (src/data/mockData.js). All data is mock.
// ---------------------------------------------------------------------------

import {
  BarChart3,
  Building2,
  CheckCircle2,
  CircleDot,
  Construction,
  DoorOpen,
  Droplets,
  Handshake,
  Lightbulb,
  Megaphone,
  PawPrint,
  Store,
  Trash2,
  TreeDeciduous,
  TreePine,
  type LucideIcon,
} from "lucide-react";

export type CompanyStatus = "open" | "pending" | "in_progress" | "resolved" | "duplicate";
export type CompanySeverity = "Low" | "Medium" | "High" | "Critical";

export interface CompanyIssue {
  id: string;
  title: string;
  description: string;
  category: string;
  severity: CompanySeverity;
  status: CompanyStatus;
  priority: CompanySeverity;
  assignee: string;
  department: string;
  reportedBy: string;
  reportedAt: string;
  area: string;
  upvotes: number;
  verified: boolean | null;
  duplicate: boolean;
  confidence: number;
  coordinates: { x: number; y: number };
  beforeImage: LucideIcon;
  afterImage: LucideIcon | null;
  sentiment: string;
  resolutionETA: string;
  revenueEstimate: number;
  resolutionTime?: string;
  duplicateOf?: string;
  aiSummary?: string;
}

export const COMPANY_ISSUES: CompanyIssue[] = [
  {
    id: "AS-2026-1042",
    title: "Deep pothole on MG Road",
    description:
      "A large pothole has formed near the crossing, causing traffic jams and two-wheeler accidents at night.",
    category: "Roads & Potholes",
    severity: "High",
    status: "in_progress",
    priority: "High",
    assignee: "Rahul Verma",
    department: "Public Works Dept",
    reportedBy: "Amit Patel",
    reportedAt: "2 days ago",
    area: "MG Road, Malad West",
    upvotes: 142,
    verified: true,
    duplicate: false,
    confidence: 0.94,
    coordinates: { x: 62, y: 38 },
    beforeImage: Construction,
    afterImage: null,
    sentiment: "Frustrated",
    resolutionETA: "Working on it",
    revenueEstimate: 4200,
    aiSummary:
      "Deep pothole widening rapidly. Likely water-logging damage. Recommend urgent cold-mix patch and drainage check.",
  },
  {
    id: "AS-2026-1043",
    title: "Streetlight not working — Palava Road",
    description:
      "Three consecutive streetlights have been out for over a week, making the road unsafe after 8 PM.",
    category: "Street Lighting",
    severity: "Medium",
    status: "pending",
    priority: "Medium",
    assignee: "Unassigned",
    department: "Electricity Dept",
    reportedBy: "Sneha Iyer",
    reportedAt: "5 hours ago",
    area: "Palava Road, Mira Road",
    upvotes: 27,
    verified: null,
    duplicate: false,
    confidence: 0.88,
    coordinates: { x: 28, y: 55 },
    beforeImage: Lightbulb,
    afterImage: null,
    sentiment: "Concerned",
    resolutionETA: "Queued",
    revenueEstimate: 1200,
  },
  {
    id: "AS-2026-1044",
    title: "Overflowing garbage bin near school",
    description:
      "Garbage is spilling onto the footpath and creating a health hazard for school children.",
    category: "Garbage & Sanitation",
    severity: "Medium",
    status: "resolved",
    priority: "Medium",
    assignee: "Municipal Corp",
    department: "Sanitation Dept",
    reportedBy: "Kavita Sharma",
    reportedAt: "6 days ago",
    area: "Sector 12, Vashi",
    upvotes: 88,
    verified: true,
    duplicate: false,
    confidence: 0.97,
    coordinates: { x: 74, y: 66 },
    beforeImage: Trash2,
    afterImage: CheckCircle2,
    sentiment: "Satisfied",
    resolutionETA: "Resolved in 3 days",
    resolutionTime: "3 days",
    revenueEstimate: 800,
  },
  {
    id: "AS-2026-1045",
    title: "Broken water pipeline leaking",
    description:
      "A municipal water line is leaking near the bus stand, wasting water and flooding the road.",
    category: "Water & Sewage",
    severity: "Critical",
    status: "in_progress",
    priority: "Critical",
    assignee: "Suresh Nair",
    department: "Water Dept",
    reportedBy: "Rajesh Gupta",
    reportedAt: "1 day ago",
    area: "Bus Stand, Thane West",
    upvotes: 210,
    verified: true,
    duplicate: false,
    confidence: 0.98,
    coordinates: { x: 42, y: 30 },
    beforeImage: Droplets,
    afterImage: null,
    sentiment: "Angry",
    resolutionETA: "In progress",
    revenueEstimate: 5400,
  },
  {
    id: "AS-2026-1046",
    title: "Illegal hoardings blocking road signs",
    description:
      "Large advertisement hoardings are hiding traffic signs at the junction near the flyover.",
    category: "Illegal Hoardings",
    severity: "Low",
    status: "open",
    priority: "Low",
    assignee: "Unassigned",
    department: "Municipal Corp",
    reportedBy: "Priya Desai",
    reportedAt: "3 hours ago",
    area: "Flyover Junction, Andheri",
    upvotes: 12,
    verified: null,
    duplicate: false,
    confidence: 0.72,
    coordinates: { x: 85, y: 22 },
    beforeImage: Megaphone,
    afterImage: null,
    sentiment: "Neutral",
    resolutionETA: "Awaiting assignment",
    revenueEstimate: 900,
  },
  {
    id: "AS-2026-1047",
    title: "Broken public toilet — railway station",
    description:
      "Public toilets at the station exit are out of service forcing commuters to struggle.",
    category: "Public Amenities",
    severity: "Medium",
    status: "pending",
    priority: "Medium",
    assignee: "Unassigned",
    department: "Public Works Dept",
    reportedBy: "Arjun Mehta",
    reportedAt: "8 hours ago",
    area: "Railway Station, Dadar",
    upvotes: 65,
    verified: null,
    duplicate: true,
    confidence: 0.85,
    coordinates: { x: 55, y: 78 },
    beforeImage: DoorOpen,
    afterImage: null,
    sentiment: "Annoyed",
    resolutionETA: "Queued",
    revenueEstimate: 1500,
  },
  {
    id: "AS-2026-1048",
    title: "Fallen tree blocking footpath",
    description: "A tree fell during last night's storm and is blocking the main footpath.",
    category: "Trees & Parks",
    severity: "High",
    status: "resolved",
    priority: "High",
    assignee: "Green Squad",
    department: "Forestry Dept",
    reportedBy: "Neha Kumari",
    reportedAt: "4 days ago",
    area: "Central Park, Chembur",
    upvotes: 54,
    verified: true,
    duplicate: false,
    confidence: 0.96,
    coordinates: { x: 12, y: 80 },
    beforeImage: TreePine,
    afterImage: TreeDeciduous,
    sentiment: "Thankful",
    resolutionETA: "Resolved in 2 days",
    resolutionTime: "2 days",
    revenueEstimate: 2000,
  },
  {
    id: "AS-2026-1049",
    title: "Open manhole next to shopping complex",
    description:
      "A manhole cover is missing and pedestrians are at risk, especially children in the evening.",
    category: "Roads & Potholes",
    severity: "Critical",
    status: "open",
    priority: "Critical",
    assignee: "Unassigned",
    department: "Public Works Dept",
    reportedBy: "Rohit Jain",
    reportedAt: "30 minutes ago",
    area: "City Mall, Borivali",
    upvotes: 8,
    verified: null,
    duplicate: false,
    confidence: 0.91,
    coordinates: { x: 90, y: 48 },
    beforeImage: CircleDot,
    afterImage: null,
    sentiment: "Scared",
    resolutionETA: "Priority dispatch",
    revenueEstimate: 3000,
  },
  {
    id: "AS-2026-1050",
    title: "Stray cattle near highway flyover",
    description:
      "Stray cattle are wandering near the highway exit and causing near-accidents every night.",
    category: "Stray Animals",
    severity: "High",
    status: "in_progress",
    priority: "High",
    assignee: "Animal Welfare",
    department: "Animal Control",
    reportedBy: "Meera Nair",
    reportedAt: "12 hours ago",
    area: "Highway Exit 14, Mulund",
    upvotes: 96,
    verified: true,
    duplicate: false,
    confidence: 0.93,
    coordinates: { x: 20, y: 40 },
    beforeImage: PawPrint,
    afterImage: null,
    sentiment: "Worried",
    resolutionETA: "Working on it",
    revenueEstimate: 2600,
  },
  {
    id: "AS-2026-1051",
    title: "Footpath encroachment by vendors",
    description:
      "Vendors have set up stalls that leave no space for pedestrians on the busy market road.",
    category: "Encroachment",
    severity: "Medium",
    status: "duplicate",
    priority: "Medium",
    assignee: "Municipal Corp",
    department: "Licensing Dept",
    reportedBy: "Vikram Singh",
    reportedAt: "1 day ago",
    area: "Market Road, Ghatkopar",
    upvotes: 41,
    verified: false,
    duplicate: true,
    duplicateOf: "AS-2026-1031",
    confidence: 0.8,
    coordinates: { x: 40, y: 60 },
    beforeImage: Store,
    afterImage: null,
    sentiment: "Annoyed",
    resolutionETA: "Duplicate found",
    revenueEstimate: 1100,
  },
];

export const COMPANY_STATUS_MAP: Record<CompanyStatus, { label: string; color: string; dot: string }> = {
  open: { label: "Open", color: "bg-slate-100 text-slate-800 border border-slate-300", dot: "bg-slate-600" },
  pending: { label: "Pending", color: "bg-amber-50 text-amber-900 border border-amber-200", dot: "bg-amber-600" },
  in_progress: { label: "In Progress", color: "bg-blue-50 text-blue-800 border border-blue-200", dot: "bg-blue-600" },
  resolved: { label: "Resolved", color: "bg-emerald-50 text-emerald-800 border border-emerald-200", dot: "bg-emerald-600" },
  duplicate: { label: "Duplicate", color: "bg-rose-50 text-rose-800 border border-rose-200", dot: "bg-rose-600" },
};

export const COMPANY_SEVERITY_MAP: Record<CompanySeverity, { color: string; bar: string }> = {
  Low: { color: "bg-slate-100 text-slate-800 border border-slate-300", bar: "bg-slate-600" },
  Medium: { color: "bg-amber-50 text-amber-900 border border-amber-200", bar: "bg-amber-600" },
  High: { color: "bg-orange-50 text-orange-900 border border-orange-200", bar: "bg-orange-600" },
  Critical: { color: "bg-rose-50 text-rose-800 border border-rose-200", bar: "bg-rose-700" },
};

export interface CompanyEmployee {
  id: string;
  name: string;
  role: string;
  dept: string;
  avatar: string;
  active: boolean;
  workload: number;
}

export const COMPANY_EMPLOYEES: CompanyEmployee[] = [
  { id: "E-101", name: "Rahul Verma", role: "Field Officer", dept: "Public Works", avatar: "RV", active: true, workload: 6 },
  { id: "E-102", name: "Suresh Nair", role: "Technician", dept: "Water Dept", avatar: "SN", active: true, workload: 4 },
  { id: "E-103", name: "Lakshmi Rao", role: "Sanitation Lead", dept: "Sanitation", avatar: "LR", active: true, workload: 8 },
  { id: "E-104", name: "Imran Khan", role: "Electrician", dept: "Electricity", avatar: "IK", active: false, workload: 2 },
  { id: "E-105", name: "Pooja Singh", role: "Data Analyst", dept: "Analytics", avatar: "PS", active: true, workload: 3 },
  { id: "E-106", name: "Dev Patel", role: "Green Squad", dept: "Forestry", avatar: "DP", active: true, workload: 5 },
];

export const COMPANY_DEPARTMENTS = [
  "Field Ops",
  "Public Works",
  "Water Dept",
  "Sanitation",
  "Electricity",
  "Analytics",
] as const;

export interface CompanyAssignment {
  id: string;
  title: string;
  assignee: string;
  status: CompanyStatus;
  priority: CompanySeverity;
  due: string;
}

export const COMPANY_ASSIGNMENTS: CompanyAssignment[] = [
  { id: "AS-2026-1042", title: "Deep pothole on MG Road", assignee: "Rahul Verma", status: "in_progress", priority: "High", due: "Today" },
  { id: "AS-2026-1045", title: "Water pipeline leak", assignee: "Suresh Nair", status: "in_progress", priority: "Critical", due: "Today" },
  { id: "AS-2026-1050", title: "Stray cattle near flyover", assignee: "Animal Welfare", status: "in_progress", priority: "High", due: "Tomorrow" },
  { id: "AS-2026-1043", title: "Streetlight not working", assignee: "Unassigned", status: "pending", priority: "Medium", due: "In 2 days" },
  { id: "AS-2026-1047", title: "Broken public toilet", assignee: "Unassigned", status: "pending", priority: "Medium", due: "In 3 days" },
];

export interface CompanyRevenue {
  source: string;
  amount: number;
  trend: string;
  icon: LucideIcon;
}

export const COMPANY_REVENUE: CompanyRevenue[] = [
  { source: "Company Subscriptions", amount: 84000, trend: "+12%", icon: Building2 },
  { source: "Sponsored Listings", amount: 27000, trend: "+8%", icon: Megaphone },
  { source: "Sponsor a Fix / CSR", amount: 41500, trend: "+24%", icon: Handshake },
  { source: "Premium Analytics", amount: 18000, trend: "+5%", icon: BarChart3 },
];

export const COMPANY_PERFORMANCE = {
  score: 87,
  label: "Great",
  metrics: [
    { name: "Resolution time", value: 82 },
    { name: "Citizen satisfaction", value: 91 },
    { name: "Backlog health", value: 76 },
    { name: "Verification accuracy", value: 95 },
  ],
};

export const COMPANY_ANALYTICS = {
  monthlyTrend: [
    { month: "Mar", reported: 320, resolved: 240, sponsored: 12 },
    { month: "Apr", reported: 410, resolved: 318, sponsored: 18 },
    { month: "May", reported: 385, resolved: 342, sponsored: 22 },
    { month: "Jun", reported: 462, resolved: 400, sponsored: 29 },
    { month: "Jul", reported: 428, resolved: 411, sponsored: 27 },
    { month: "Aug", reported: 512, resolved: 459, sponsored: 35 },
    { month: "Sep", reported: 498, resolved: 472, sponsored: 34 },
  ],
  categoryBreakdown: [
    { name: "Roads", value: 34 },
    { name: "Lighting", value: 16 },
    { name: "Sanitation", value: 21 },
    { name: "Water", value: 12 },
    { name: "Other", value: 17 },
  ],
  resolutionTrend: [
    { name: "Week 1", time: 6.2 },
    { name: "Week 2", time: 5.4 },
    { name: "Week 3", time: 4.9 },
    { name: "Week 4", time: 4.1 },
    { name: "Week 5", time: 3.6 },
    { name: "Week 6", time: 3.2 },
  ],
  duplicateRate: 6.4,
  avgResolutionDays: 4.2,
  topAreas: ["MG Road corridor", "Borivali East", "Vashi Sector 12"],
  sentimentPie: [
    { name: "Satisfied", value: 58 },
    { name: "Neutral", value: 24 },
    { name: "Frustrated", value: 18 },
  ],
};

export interface CompanyAccount {
  id: string;
  name: string;
  plan: string;
  issues: number;
  score: number;
  status: "active" | "suspended";
}

export const COMPANY_ACCOUNTS: CompanyAccount[] = [
  { id: "C-01", name: "Municipal Corp", plan: "Growth", issues: 120, score: 91, status: "active" },
  { id: "C-02", name: "Thane Waterworks", plan: "Enterprise", issues: 44, score: 84, status: "active" },
  { id: "C-03", name: "City Power Grid", plan: "Standard", issues: 68, score: 79, status: "active" },
  { id: "C-04", name: "GreenCity Foundation", plan: "Growth", issues: 12, score: 95, status: "active" },
  { id: "C-05", name: "Metro Roads Ltd", plan: "Premium", issues: 33, score: 72, status: "suspended" },
];

export const COMPANY_ISSUE_STEPS = [
  { label: "Reported", date: "Tue 9 Sep 2026", done: true },
  { label: "AI Verified", date: "Tue 9 Sep 2026", done: true },
  { label: "Assigned", date: "Wed 10 Sep 2026", done: true },
  { label: "In progress", date: "Thu 11 Sep 2026", done: true },
  { label: "Resolution proof", date: "Expected Tue 16 Sep", done: false },
  { label: "Closed", date: "Pending", done: false },
];

export interface CompanyNotification {
  id: string;
  type: "alert" | "ai" | "sponsor" | "done" | "system";
  title: string;
  detail: string;
  time: string;
  read: boolean;
  urgent?: boolean;
}

export const COMPANY_NOTIFICATIONS: CompanyNotification[] = [
  { id: "n1", type: "alert", title: "Critical issue unattended", detail: "AS-2026-1049 (open manhole) has been critical for 2 hours.", time: "10 min ago", read: false, urgent: true },
  { id: "n2", type: "ai", title: "AI flagged duplicate cluster", detail: "3 new reports near Borivali East may match AS-2026-1031.", time: "1 hour ago", read: false },
  { id: "n3", type: "sponsor", title: "CSR campaign funded", detail: "Adopt-a-Road reached its ₹2.5L target with 128 supporters.", time: "4 hours ago", read: false },
  { id: "n4", type: "done", title: "Task completed", detail: "Rahul Verma closed AS-2026-1044 with resolution proof.", time: "1 day ago", read: true },
  { id: "n5", type: "system", title: "Weekly analytics ready", detail: "City-wide performance report for Sep week 2 is available.", time: "2 days ago", read: true },
];

export const COMPANY_USER = {
  name: "Aarav Mehta",
  title: "Operations Manager",
  company: "Municipal Corp",
  avatar: "AM",
};

export const COMPANY_PIE_COLORS = ["#10b981", "#0d9488", "#f59e0b", "#ef4444", "#8b5cf6"];
export const COMPANY_SENTIMENT_COLORS = ["#10b981", "#fbbf24", "#ef4444"];
