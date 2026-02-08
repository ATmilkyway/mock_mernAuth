import express from "express";
import { success } from "zod";

const app = express();

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Hello World",
  });
});
const startServer = async () => {
  try {
    app.listen(4004, () => {
      console.log(`Server 🟢 http://localhost:4004`);
    });
  } catch (error) {
    console.log("Server 🛑");
  }
};

startServer();
