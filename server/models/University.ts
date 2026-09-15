import { Schema, model, models, type Model } from "mongoose";

export interface IUniversity {
  _id: string;
  name: string;
  shortName: string;
  state: string;
  focus: string;
  priorProjects: number;
  labs: string;
  bestCategories: string[];
}

const universitySchema = new Schema({
  _id: { type: String, trim: true },
  name: { type: String, required: true },
  shortName: { type: String },
  state: { type: String },
  focus: { type: String },
  priorProjects: { type: Number, default: 0 },
  labs: { type: String },
  bestCategories: { type: [String], default: [] },
});

export const University: Model<IUniversity> = models.University
  ? (models.University as Model<IUniversity>)
  : model<IUniversity>("University", universitySchema);