import { Schema, model, models, type Model, type Types } from "mongoose";

export interface IEmailOtp {
  _id?: Types.ObjectId;
  email: string;
  code: string;
  expiresAt: Date;
  attempts: number;
  createdAt?: Date;
}

const emailOtpSchema = new Schema({
  email: { type: String, required: true, lowercase: true, trim: true, index: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  attempts: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

emailOtpSchema.index({ email: 1 }, { unique: true });
emailOtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const EmailOtp: Model<IEmailOtp> = models.EmailOtp
  ? (models.EmailOtp as Model<IEmailOtp>)
  : model<IEmailOtp>("EmailOtp", emailOtpSchema);