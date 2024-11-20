import bodyParser from "body-parser";
import express, { Request, request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ImageRouter from "./routes/ImageRouter";

dotenv.config();

const app = express();
app.use(cors());

//Middleware
app.use(bodyParser.json());

//Router
app.use("/api/imagerouter", ImageRouter);
//Backend running
app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

//Connect Mongodb
mongoose
  .connect(process.env.MONGO_URI || "", {})
  .then(() => console.log("Connect to MongoDB"))
  .catch((err) => console.log("Database connection error:", err));

export default app;
