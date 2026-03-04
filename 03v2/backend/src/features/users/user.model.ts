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

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  // this.password = await
});
// userSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;
//   this.password = await hashValue(this.password);
// });
const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
