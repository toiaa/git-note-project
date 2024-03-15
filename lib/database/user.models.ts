import mongoose, { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  picture?: string;
  createdAt: Date;
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  picture: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || model("User", UserSchema);

export default User;
