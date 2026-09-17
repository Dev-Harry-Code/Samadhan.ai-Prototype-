import { Schema, model, models, type Model } from "mongoose";

export interface IFunding {
  _id: string;
  issueId: string;
  funderId: string;
  amount: number;
  note: string;
  date: Date;
}

const fundingSchema = new Schema({
  _id: { type: String, trim: true },
  issueId: { type: String, ref: "Issue", required: true, index: true },
  funderId: { type: String, ref: "Funder", required: true, index: true },
  amount: { type: Number, required: true },
  note: { type: String },
  date: { type: Date, default: Date.now },
});

fundingSchema.index({ issueId: 1, funderId: 1 }, { unique: true });

export const Funding: Model<IFunding> = models.Funding
  ? (models.Funding as Model<IFunding>)
  : model<IFunding>("Funding", fundingSchema);