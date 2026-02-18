import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import connectToDatabase from "./config/db.js";
import { APP_ORIGIN, PORT, NODE_ENV } from "./constants/env.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import { OK } from "./constants/http.js";
import authenticate from "./middleware/authenticate.js";
import userRoutes from "./routes/user.routes.js";

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

// protected routes
app.use("/user", authenticate, userRoutes);

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
