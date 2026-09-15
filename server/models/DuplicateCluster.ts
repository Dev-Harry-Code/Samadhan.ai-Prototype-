import { Schema, model, models, type Model } from "mongoose";

export interface IDuplicateCluster {
  _id: string;
  canonicalIssueId: string;
  memberIssueIds: string[];
  similarity: number;
}

const duplicateClusterSchema = new Schema({
  _id: { type: String, trim: true },
  canonicalIssueId: {
    type: String,
    ref: "Issue",
    required: true,
    unique: true,
    index: true,
  },
  memberIssueIds: { type: [String], default: [] },
  similarity: { type: Number, min: 0, max: 1, default: 0 },
});

export const DuplicateCluster: Model<IDuplicateCluster> =
  models.DuplicateCluster
    ? (models.DuplicateCluster as Model<IDuplicateCluster>)
    : model<IDuplicateCluster>("DuplicateCluster", duplicateClusterSchema);