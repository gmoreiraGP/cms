import dotenv from "dotenv";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
      status: "Error",
      message: error.message,
    });
  }
);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
