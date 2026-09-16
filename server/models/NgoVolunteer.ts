import { Schema, model, models, type Model } from "mongoose";

export type NgoVolunteerStatus = "Available" | "Deployed" | "On Leave";

export interface INgoVolunteer {
  _id: string;
  name: string;
  phone: string;
  avatar: string;
  skills: string[];
  status: NgoVolunteerStatus;
  hours: number;
  drivesCompleted: number;
  assignedDrive?: string;
  rating: number;
}

const ngoVolunteerSchema = new Schema({
  _id: { type: String, trim: true },
  name: { type: String, required: true },
  phone: { type: String },
  avatar: { type: String },
  skills: { type: [String], default: [] },
  status: { type: String, required: true, default: "Available" },
  hours: { type: Number, default: 0 },
  drivesCompleted: { type: Number, default: 0 },
  assignedDrive: { type: String },
  rating: { type: Number, default: 4.5 },
});

ngoVolunteerSchema.index({ status: 1 });

export const NgoVolunteer: Model<INgoVolunteer> = models.NgoVolunteer
  ? (models.NgoVolunteer as Model<INgoVolunteer>)
  : model<INgoVolunteer>("NgoVolunteer", ngoVolunteerSchema);