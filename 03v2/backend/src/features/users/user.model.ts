import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  verified: boolean;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
