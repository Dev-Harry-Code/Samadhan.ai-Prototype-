import { Schema, model, models, type Model } from "mongoose";

export interface ITeamMember {
  name: string;
  role: string;
  year?: string;
}

export interface IMilestone {
  label: string;
  desc: string;
  due: string;
  done: boolean;
}

export interface ITeam {
  _id: string;
  issueId: string;
  universityId: string;
  members: ITeamMember[];
  faculty: string;
  message: string;
  milestones: IMilestone[];
  formedAt: Date;
}

const teamMemberSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    year: { type: String },
  },
  { _id: false },
);

const milestoneSchema = new Schema(
  {
    label: { type: String, required: true },
    desc: { type: String },
    due: { type: String },
    done: { type: Boolean, default: false },
  },
  { _id: false },
);

const teamSchema = new Schema({
  _id: { type: String, trim: true },
  issueId: { type: String, ref: "Issue", required: true, unique: true, index: true },
  universityId: { type: String, ref: "University", required: true, index: true },
  members: { type: [teamMemberSchema], default: [] },
  faculty: { type: String },
  message: { type: String },
  milestones: { type: [milestoneSchema], default: [] },
  formedAt: { type: Date, default: Date.now },
});

export const Team: Model<ITeam> = models.Team
  ? (models.Team as Model<ITeam>)
  : model<ITeam>("Team", teamSchema);