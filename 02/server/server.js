import express, { json } from "express";
import { connectDB } from "./config/mongodb.js";
import dotenv from "dotenv/config";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server 🟢 http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Server 🛑", error.message);
  }
};

startServer();
