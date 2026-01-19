import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";

// app
const app = express();

// db
connectDB();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // origin: "http://localhost:5173",
    credentials: true,
  }),
);

// routes
app.get("/", (req, res) => {
  res.status(200).json("API is working");
});

// start server
const PORT = process.env.PORT || 3000;
try {
  app.listen(PORT, () => {
    console.log(`Server 🟢 http://localhost:${PORT}`);
  });
} catch (error) {
  console.log("Server 🛑", error);
}
