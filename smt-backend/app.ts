import express, { type Application, type Request, type Response } from "express";
import cors from "cors";
import { requestLogger } from "./src/middlewares/logger.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import nameRoutes from "./src/routes/name.routes.js";


const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger);


app.use("/api/v1/names", nameRoutes);
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