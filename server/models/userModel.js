import mongoose from "mongoose";

const userSchama = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    verifyOtp: {
      type: String,
      default: "",
      select: false,
    },
    verifyOtpExpiresAt: {
      type: Number,
      default: 0,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    resetOtp: {
      type: String,
      default: "",
      select: false,
    },
    resetOtpExpireAt: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    strict: true, // extra fields will be ignored
  },
);

const userModel = mongoose.models.User || mongoose.model("User", userSchama);

export default userModel;
