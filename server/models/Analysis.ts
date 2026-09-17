import { Schema, model, models, type Model } from "mongoose";

export interface IAnalysis {
  _id: string;
  issueId: string;
  summary: string;
  causes: string[];
  recommendations: string[];
  cost: string;
  timeline: string;
  classificationConfidence: number;
}

const analysisSchema = new Schema({
  _id: { type: String, trim: true },
  issueId: { type: String, ref: "Issue", required: true, unique: true, index: true },
  summary: { type: String, required: true },
  causes: { type: [String], default: [] },
  recommendations: { type: [String], default: [] },
  cost: { type: String },
  timeline: { type: String },
  classificationConfidence: { type: Number, min: 0, max: 1 },
});

export const Analysis: Model<IAnalysis> = models.Analysis
  ? (models.Analysis as Model<IAnalysis>)
  : model<IAnalysis>("Analysis", analysisSchema);