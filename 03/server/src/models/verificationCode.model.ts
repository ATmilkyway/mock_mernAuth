import type verificationCodeType from "@/constants/verificationCodeType.js";
import mongoose, { mongo } from "mongoose";

export interface VerificationCodeDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  type: verificationCodeType;
  expireAt: Date;
  createAt: Date;
}

const verificationCodeSchema = new mongoose.Schema<VerificationCodeDocument>({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  type: { type: String, required: true },
  createAt: { type: Date, required: true, default: Date.now },
  expireAt: { type: Date, required: true, index: { expires: 0 } },
});

const VerificationCodeModel = mongoose.model(
  "VerificationCode",
  verificationCodeSchema,
  "verification_codes",
);

export default VerificationCodeModel;
