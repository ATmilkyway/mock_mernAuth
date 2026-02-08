import express from "express";

const app = express();
const startServer = async () => {
  try {
    app.listen(4004, () => {
      console.log("Server 🟢");
    });
  } catch (error) {
    console.log("Server 🛑");
  }
};

startServer();
