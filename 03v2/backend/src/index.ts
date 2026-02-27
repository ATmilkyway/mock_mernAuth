import "dotenv/config";
import express from "express";
import { NODE_ENV, PORT } from "./constants/env.js";
import healthCheckRoutes from "./features/healthy/healthy.routes.js";

// express server
const app = express();

// routes
app.use("/healthy", healthCheckRoutes);

// create the server
const createServer = () => {
  try {
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
