import { Goal } from "lucide-react";
import mongoose, { Model, Schema, model, Document } from "mongoose";

type Goal = { checked: boolean; text: string };
type Level = { checked: boolean; text: string };

export interface IUser extends Document {
  name: string;
  portfolio: string;
  email: string;
  password?: string;
  picture?: string;
  goals?: Goal[];
  levels?: Level[];
  stack?: string[];
  available?: boolean;
  start?: Date;
  end?: Date;
  onboardingCompleted: boolean;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  portfolio: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  goals: { type: Array, required: false },
  levels: { type: Array, required: false },
  stack: { type: Array, required: false },
  picture: { type: String, required: false },
  available: { type: Boolean, required: false },
  start: { type: Date, required: false },
  end: { type: Date, required: false },
  onboardingCompleted: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now },
});

const User =
  (mongoose.models.User as Model<IUser>) ||
  model<IUser, Model<IUser>>("User", UserSchema);

export default User;
