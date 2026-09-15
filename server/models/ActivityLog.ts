import { Schema, model, models, type Model } from "mongoose";

export interface IActivityLog {
  _id: string;
  issueId: string;
  actor: string;
  action: string;
  note: string;
  createdAt: Date;
}

const activityLogSchema = new Schema({
  _id: { type: String, trim: true },
  issueId: { type: String, ref: "Issue", required: true, index: true },
  actor: { type: String, required: true },
  action: { type: String, required: true },
  note: { type: String },
  createdAt: { type: Date, default: Date.now },
});

activityLogSchema.index({ issueId: 1, createdAt: 1 });

export const ActivityLog: Model<IActivityLog> = models.ActivityLog
  ? (models.ActivityLog as Model<IActivityLog>)
  : model<IActivityLog>("ActivityLog", activityLogSchema);