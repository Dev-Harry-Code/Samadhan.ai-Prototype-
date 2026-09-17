import { Schema, model, models, type Model, type Types } from "mongoose";

export interface IComment {
  _id: string;
  issueId: string;
  author: Types.ObjectId;
  text: string;
  upvotes: number;
  createdAt: Date;
}

const commentSchema = new Schema({
  _id: { type: String, trim: true },
  issueId: { type: String, ref: "Issue", required: true, index: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

commentSchema.index({ issueId: 1, createdAt: 1 });

export const Comment: Model<IComment> = models.Comment
  ? (models.Comment as Model<IComment>)
  : model<IComment>("Comment", commentSchema);