import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import connectToDatabase from "./config/db.js";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env.js";
import errorHandler from "./middleware/errorHandler.js";
import catchErrors from "./utils/catchErrors.js";
import { OK } from "./constants/http.js";
import authRoutes from "./routes/auth.routes.js";

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

app.get("/", (_, res, next) => {
  return res.status(OK).json({
    success: true,
    message: "Hello World",
  });
});

app.use("/auth", authRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server 🟢 http://localhost:${PORT}
        PORT:${PORT}  
        Env: ${NODE_ENV}`);
    });
  } catch (error) {
    console.log("Server 🛑");
  }
};

startServer();
