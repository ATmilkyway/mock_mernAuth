import mongoose from "mongoose";
import { string } from "zod";
import { extend } from "zod/mini";
import { thirtyDaysFromNow } from "../../utils/date.js";

interface SessionDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  userAgent?: string;
  expireAt: Date;
}

const sessionSchema = new mongoose.Schema<SessionDocument>(
  {
    userId: {
      ref: "User",
      type: mongoose.Types.ObjectId,
      index: true,
    },
    userAgent: {
      type: String,
    },
    expireAt: { type: Date, default: thirtyDaysFromNow, index: { expires: 0 } },
  },
  { timestamps: true },
);

const SessionModel = mongoose.model("Session", sessionSchema);

export default SessionModel;
