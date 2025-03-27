import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { setupRoutes } from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { rateLimiter } from "./middleware/rateLimiter";
import { logger } from "./utils/logger";
import { config } from "./config";
import { AIServiceManager } from './services/implementations/AIServiceManager';
import { AIServiceRepository } from './repositories/implementations/AIServiceRepository';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// Initialize dependencies
const repository = new AIServiceRepository();
const aiManager = new AIServiceManager(repository);

// Setup routes
setupRoutes(app, aiManager);

// Error handling
app.use(errorHandler);

// Start the server
app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`);
});

process.on("unhandledRejection", (error: Error) => {
  logger.error("Unhandled Rejection:", error);
});

process.on("uncaughtException", (error: Error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});
