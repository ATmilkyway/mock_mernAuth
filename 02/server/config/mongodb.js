import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB 🟢");
  } catch (error) {
    console.log("DB 🛑", error.message);
    process.exit(1);
  }
};
