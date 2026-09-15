import { Schema, model, models, type Model } from "mongoose";

export type EvidenceKind = "scheme" | "paper" | "case-similar" | "solution";

export interface IEvidence {
  _id: string;
  issueId: string;
  kind: EvidenceKind;
  title: string;
  source: string;
  url: string;
  snippet: string;
  citedAt: Date;
}

const evidenceSchema = new Schema({
  _id: { type: String, trim: true },
  issueId: { type: String, ref: "Issue", required: true, index: true },
  kind: {
    type: String,
    enum: ["scheme", "paper", "case-similar", "solution"],
    required: true,
  },
  title: { type: String, required: true },
  source: { type: String, required: true },
  url: { type: String, required: true },
  snippet: { type: String },
  citedAt: { type: Date, default: Date.now },
});

evidenceSchema.index({ issueId: 1, url: 1 }, { unique: true });

export const Evidence: Model<IEvidence> = models.Evidence
  ? (models.Evidence as Model<IEvidence>)
  : model<IEvidence>("Evidence", evidenceSchema);