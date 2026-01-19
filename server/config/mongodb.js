import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`DB 🟢 `);
  } catch (error) {
    console.log("DB 🛑", error);
    process.exit(1);
  }
};

export default connectDB;
