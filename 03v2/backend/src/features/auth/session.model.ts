import mongoose from "mongoose";
import { string } from "zod";
import { extend } from "zod/mini";
import { thirtyDaysFromNow } from "../../utils/date.js";

interface SessionDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  useragent?: string;
  expireAt: Date;
}

const sessionSchema = new mongoose.Schema<SessionDocument>({
  userId: {
    ref: "User",
    type: mongoose.Types.ObjectId,
    index: true,
  },
  useragent: {
    type: String,
  },
  expireAt: { type: Date, default: thirtyDaysFromNow, index: { expires: 0 } },
});

const SessionModel = mongoose.model("Session", sessionSchema);

export default SessionModel;
