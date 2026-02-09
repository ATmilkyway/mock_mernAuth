import cors from "cors";
import express from "express";
import connectToDatabase from "./config/db.js";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  }),
);
app.use(cookieParser());
app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Hello World",
  });
});

// app.use(error )
const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(4004, () => {
      console.log(`Server 🟢 http://localhost:4004
        PORT:${PORT}  
        Env: ${NODE_ENV}`);
    });
  } catch (error) {
    console.log("Server 🛑");
  }
};

startServer();
