import mongoose from "mongoose";
import type VerificationCodeType from "./auth.types.js";
import { string } from "zod";

interface VerificationCodeDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  type: VerificationCodeType;
  expiresAt: Date;
}

const verificationCodeSchema = new mongoose.Schema<VerificationCodeDocument>(
  {
    userId: {
      ref: "User",
      type: mongoose.Types.ObjectId,
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
    },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  { timestamps: true },
);

const VerificationCode = mongoose.model(
  "VerificationCode",
  verificationCodeSchema,
  "verification_codes",
);

export default VerificationCode;

// export default VerificationCodeModel;
