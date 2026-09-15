import { Schema, model, models, type Model, type Types } from "mongoose";

export type Severity = "Low" | "Medium" | "High" | "Critical";

export type IssueStatus =
  | "reported"
  | "ai_validated"
  | "team_formed"
  | "proposed"
  | "funded"
  | "deployed"
  | "resolved";

export interface IIssueLocation {
  lat: number;
  lng: number;
  label: string;
  ward: string;
  district: string;
}

export interface IIssue {
  _id: string;
  title: string;
  description: string;
  category: string;
  severity: Severity;
  location: IIssueLocation;
  reportedBy: Types.ObjectId;
  peopleAffected: number;
  trustScore?: number;
  matchScore?: number;
  assignedUniversityId?: string;
  duplicateOfId?: string;
  photo?: string;
  status: IssueStatus;
  createdAt?: Date;
}

const locationSchema = new Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    label: { type: String, required: true },
    ward: { type: String },
    district: { type: String, required: true },
  },
  { _id: false },
);

const issueSchema = new Schema({
  _id: { type: String, trim: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, ref: "Category", required: true, index: true },
  severity: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    required: true,
  },
  location: { type: locationSchema, required: true },
  reportedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  peopleAffected: { type: Number, default: 0 },
  trustScore: { type: Number, min: 0, max: 100 },
  matchScore: { type: Number, min: 0, max: 100 },
  assignedUniversityId: { type: String, ref: "University", index: true },
  duplicateOfId: { type: String },
  photo: { type: String },
  status: {
    type: String,
    enum: [
      "reported",
      "ai_validated",
      "team_formed",
      "proposed",
      "funded",
      "deployed",
      "resolved",
    ],
    required: true,
    default: "reported",
    index: true,
  },
  createdAt: { type: Date, default: Date.now },
});

issueSchema.index({ "location.district": 1 });
issueSchema.index({ createdAt: -1 });

export const Issue: Model<IIssue> = models.Issue
  ? (models.Issue as Model<IIssue>)
  : model<IIssue>("Issue", issueSchema);