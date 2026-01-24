import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

// app
const app = express();

// db
connectDB();

// Allowd origins
const allowdOrigins = ["http://localhost:5173"];

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowdOrigins,
    credentials: true,
  }),
);

// routes
app.get("/", (req, res) => {
  res.status(200).json("API is working");
});
app.use("/api/auth/", authRouter);
app.use("/api/user/", userRouter);

// start server
const PORT = process.env.PORT || 4000;
try {
  app.listen(PORT, () => {
    console.log(`Server 🟢 http://localhost:${PORT}`);
  });
} catch (error) {
  console.log("Server 🛑", error);
}
