import express from "express";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import authRouter from "./routes/auth";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// config
dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// router
app.use("/", productRoutes);
app.use("/", categoryRoutes);
app.use("/", authRouter);

// connect db
const { MONGO_URI } = process.env;
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("ket noi thanh cong");
  })
  .catch((err) => {
    console.error("ket noi that bai");
  });

export const viteNodeApp = app;
