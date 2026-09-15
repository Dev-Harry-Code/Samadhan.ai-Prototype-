import { Schema, model, models, type Model, type Types } from "mongoose";

export interface INotification {
  _id: string;
  userId: Types.ObjectId;
  type: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: Date;
}

const notificationSchema = new Schema({
  _id: { type: String, trim: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

notificationSchema.index({ userId: 1, read: 1, createdAt: -1 });

export const Notification: Model<INotification> = models.Notification
  ? (models.Notification as Model<INotification>)
  : model<INotification>("Notification", notificationSchema);