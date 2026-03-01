import "dotenv/config";
import express from "express";
import { NODE_ENV, PORT } from "./constants/env.js";
import healthCheckRoutes from "./features/healthy/healthy.route.js";
import connectDB from "./config/db.js";
import authRoutes from "./features/auth/auth.routes.js";
import errorHandler from "./middleware/errorHandler.js";

// express server
const app = express();

// middlewares
app.use(express.json());

// routes
app.use("/healthy", healthCheckRoutes);
app.use("/auth/v1/", authRoutes);

// error handler
app.use(errorHandler);

// create the server
const createServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server 🟢 http://localhost:${PORT}
        PORT:${PORT}  
        Env: ${NODE_ENV}`);
    });
  } catch (error) {
    console.log("Server 🔴 :", error);
  }
};

createServer();
