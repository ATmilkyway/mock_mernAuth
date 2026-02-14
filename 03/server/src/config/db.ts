import { MONGO_URI } from "@/constants/env.js";
import mongoose from "mongoose";
 
const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB 🟢");
  } catch (error) {
    console.log("DB 🛑", error);
    process.exit(1);
  }
};

export default connectToDatabase;
