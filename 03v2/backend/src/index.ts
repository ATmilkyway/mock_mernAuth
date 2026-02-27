import express from "express";
import dotenv from "dotenv";

// load env var
dotenv.config();

// express server
const app = express();

// create the server
const PORT = process.env.PORT || 4000;

const createServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server 🟢 : http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Server 🔴 :", error);
  }
};

createServer();
