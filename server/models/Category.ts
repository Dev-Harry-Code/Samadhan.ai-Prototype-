import { Schema, model, models, type Model } from "mongoose";

export interface ICategory {
  _id: string;
  label: string;
  icon: string;
}

const categorySchema = new Schema({
  _id: { type: String, trim: true },
  label: { type: String, required: true },
  icon: { type: String, required: true },
});

export const Category: Model<ICategory> = models.Category
  ? (models.Category as Model<ICategory>)
  : model<ICategory>("Category", categorySchema);