import { Schema, model, models, type Model } from "mongoose";

export type NgoGrantStatus = "Approved & Active" | "Under CSR Review" | "Completed";

export interface INgoGrant {
  _id: string;
  projectTitle: string;
  funderName: string;
  funderLogo: string;
  amountRequested: number;
  amountApproved: number;
  amountDisbursed: number;
  status: NgoGrantStatus;
  progressPct: number;
  targetDate: string;
  milestoneDescription: string;
}

const ngoGrantSchema = new Schema({
  _id: { type: String, trim: true },
  projectTitle: { type: String, required: true },
  funderName: { type: String, required: true },
  funderLogo: { type: String },
  amountRequested: { type: Number, required: true },
  amountApproved: { type: Number, default: 0 },
  amountDisbursed: { type: Number, default: 0 },
  status: { type: String, required: true, default: "Under CSR Review" },
  progressPct: { type: Number, default: 0 },
  targetDate: { type: String },
  milestoneDescription: { type: String },
});

ngoGrantSchema.index({ status: 1 });
ngoGrantSchema.index({ funderName: 1 });

export const NgoGrant: Model<INgoGrant> = models.NgoGrant
  ? (models.NgoGrant as Model<INgoGrant>)
  : model<INgoGrant>("NgoGrant", ngoGrantSchema);