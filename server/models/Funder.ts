import { Schema, model, models, type Model } from "mongoose";

export interface IFunder {
  _id: string;
  name: string;
  kind: string;
  fundedProjects: number;
  focus: string;
}

const funderSchema = new Schema({
  _id: { type: String, trim: true },
  name: { type: String, required: true },
  kind: { type: String },
  fundedProjects: { type: Number, default: 0 },
  focus: { type: String },
});

export const Funder: Model<IFunder> = models.Funder
  ? (models.Funder as Model<IFunder>)
  : model<IFunder>("Funder", funderSchema);