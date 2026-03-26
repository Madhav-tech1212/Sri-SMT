import { Pool } from "pg";
import { ENV } from "./env.js";
import { logger } from "../middlewares/logger.js";

export const db = new Pool({
  connectionString: ENV.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const connectDB = async () => {
  try {
    const client = await db.connect();
    const res = await client.query("SELECT NOW()");
    logger.info(`Database connected at ${res.rows[0].now}`);
    client.release();
  } catch (error) {
    logger.error("Database connection failed", error);
    process.exit(1);
  }
};