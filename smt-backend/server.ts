import app from "./app.js";
import { connectDB } from "./src/config/database.js";
import { ENV } from "./src/config/env.js";

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(ENV.PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${ENV.PORT}`);
  });
};

startServer();