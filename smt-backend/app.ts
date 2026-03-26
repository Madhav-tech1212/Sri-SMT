import express, { type Application, type Request, type Response } from "express";
import cors from "cors";
import { logger } from "./src/middlewares/logger.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("API Running 🚀");
});

app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "OK",
    time: new Date(),
  });
});

// Error Handler (always last)
app.use(errorHandler);

export default app;