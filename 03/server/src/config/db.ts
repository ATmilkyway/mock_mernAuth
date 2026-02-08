import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env.js";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.log("DB 🛑", error);
    process.exit(1);
  }
};

export default connectToDatabase