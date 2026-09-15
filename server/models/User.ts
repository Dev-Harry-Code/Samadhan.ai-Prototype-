import { Schema, model, models, type Model, type Types } from "mongoose";

export type UserRole = "citizen" | "university" | "ngo" | "company" | "admin";

export interface IUser {
  _id?: Types.ObjectId;
  role: UserRole;
  name: string;
  email: string;
  phone?: string;
  passwordHash: string;
  karma?: number;
  orgId?: string;
  createdAt?: Date;
}

const userSchema = new Schema({
  role: {
    type: String,
    enum: ["citizen", "university", "ngo", "company", "admin"],
    required: true,
    index: true,
  },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  passwordHash: { type: String, required: true },
  karma: { type: Number, default: 0 },
  orgId: { type: String, index: true },
  createdAt: { type: Date, default: Date.now },
});

userSchema.index({ email: 1, role: 1 }, { unique: true });
userSchema.index({ karma: -1 });
userSchema.index({ createdAt: -1 });

export const User: Model<IUser> = models.User
  ? (models.User as Model<IUser>)
  : model<IUser>("User", userSchema);