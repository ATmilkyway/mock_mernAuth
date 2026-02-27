import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env.js";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB 🟢");
  } catch (error) {
    console.log("DB 🔴");
    process.exit(1);
  }
};

export default connectDB;
