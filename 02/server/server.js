import express from "express";
import { connectDB } from "./config/mongodb.js";
import dotenv from "dotenv/config";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use("/api/auth", authRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(1000, () => {
      console.log("Server 🟢");
    });
  } catch (error) {
    console.log("Server 🛑", error.message);
  }
};

startServer();
