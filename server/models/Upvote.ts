import { Schema, model, models, type Model, type Types } from "mongoose";

export interface IUpvote {
  issueId: string;
  userId: Types.ObjectId;
}

const upvoteSchema = new Schema({
  issueId: { type: String, ref: "Issue", required: true, index: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
});

upvoteSchema.index({ issueId: 1, userId: 1 }, { unique: true });

export const Upvote: Model<IUpvote> = models.Upvote
  ? (models.Upvote as Model<IUpvote>)
  : model<IUpvote>("Upvote", upvoteSchema);