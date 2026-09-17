import { Schema, model, models, type Model } from "mongoose";

export type NgoDriveStatus = "Active Now" | "Scheduled" | "Completed";
export type NgoDriveCategory =
  | "Sanitation & Waste"
  | "Water Body Revival"
  | "Green Cover"
  | "Disaster Relief"
  | "Public Safety";

export interface INgoDrive {
  _id: string;
  title: string;
  category: NgoDriveCategory;
  location: string;
  ward: string;
  scheduledDate: string;
  status: NgoDriveStatus;
  volunteersRequired: number;
  volunteersRegistered: number;
  budgetAllocated: number;
  budgetSpent: number;
  equipment: string[];
  csrSponsor: string;
  description: string;
}

const ngoDriveSchema = new Schema({
  _id: { type: String, trim: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  ward: { type: String, required: true },
  scheduledDate: { type: String, required: true },
  status: { type: String, required: true, default: "Scheduled" },
  volunteersRequired: { type: Number, required: true },
  volunteersRegistered: { type: Number, required: true, default: 0 },
  budgetAllocated: { type: Number, default: 0 },
  budgetSpent: { type: Number, default: 0 },
  equipment: { type: [String], default: [] },
  csrSponsor: { type: String },
  description: { type: String },
});

ngoDriveSchema.index({ status: 1 });
ngoDriveSchema.index({ ward: 1 });

export const NgoDrive: Model<INgoDrive> = models.NgoDrive
  ? (models.NgoDrive as Model<INgoDrive>)
  : model<INgoDrive>("NgoDrive", ngoDriveSchema);