import { thirtyDaysFromNow } from "../utils/date.js";
import mongoose from "mongoose";

export interface SessionDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  userAgent?: string;
  createdAt: Date;
  expiresAt: Date;
}

const sessionSchema = new mongoose.Schema<SessionDocument>({
  userId: {
    ref: "User",
    type: mongoose.Types.ObjectId,
    index: true,
  },
  userAgent: { type: String },
  createdAt: { type: Date, required: true, default: Date.now },
  // TTL for futuer
  // expirindex: { expires: 0 }esAt: { type: Date, default: thirtyDayFromNow, index: { expires: 0 } },
  // expiresAt: { type: Date, default: thirtyDayFromNow },
  expiresAt: { type: Date, default: thirtyDaysFromNow, index: { expires: 0 } },
});

const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);

export default SessionModel;
