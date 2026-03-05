import mongoose from "mongoose";
import { hashValue } from "../../utils/bcrypt.js";

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  verified: boolean;
  updatedAt: Date;
  omitPassword(): Omit<UserDocument, "password">;
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
  this.password = await hashValue(this.password);
});

// omit password 1:
userSchema.methods["omitPassword"] = function () {
  const user = this["toObject"]();
  delete user.password;
  return user;
};
// omit password 2:
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    const { password, ...rest } = ret;
    return rest;
  },
});
// omit password 3:
// userSchema.set("toJSON", {
//   transform: (doc, ret) => {
//     delete ret.password;
//     delete ret.__v;
//     delete ret._id;
//     return ret;
//   },
// });

// userSchema.methods["omitPassword"] = function () {
//   const user = this["toObject"]();
//   delete user.password;
//   return user;
// };

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
