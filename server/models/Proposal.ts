import { Schema, model, models, type Model } from "mongoose";

export type ProposalStatus = "draft" | "sent" | "approved" | "declined";

export interface IProposal {
  _id: string;
  issueId: string;
  funderId: string;
  amount: number;
  note: string;
  status: ProposalStatus;
  createdAt: Date;
}

const proposalSchema = new Schema({
  _id: { type: String, trim: true },
  issueId: { type: String, ref: "Issue", required: true, index: true },
  funderId: { type: String, ref: "Funder", required: true, index: true },
  amount: { type: Number, required: true },
  note: { type: String },
  status: {
    type: String,
    enum: ["draft", "sent", "approved", "declined"],
    required: true,
    default: "draft",
  },
  createdAt: { type: Date, default: Date.now },
});

proposalSchema.index({ issueId: 1, funderId: 1 });
proposalSchema.index({ status: 1 });

export const Proposal: Model<IProposal> = models.Proposal
  ? (models.Proposal as Model<IProposal>)
  : model<IProposal>("Proposal", proposalSchema);