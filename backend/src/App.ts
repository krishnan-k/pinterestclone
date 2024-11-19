import bodyParser from "body-parser";
import express, { Request, request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();
const app = express();

//Middleware
app.use(bodyParser.json());

//Router

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
