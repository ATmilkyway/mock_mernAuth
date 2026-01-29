import express from "express";
import { connectDB } from "./config/mongodb.js";
import dotenv from "dotenv/config";

const app = express();

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
