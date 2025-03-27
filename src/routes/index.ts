import { Express } from "express";
import { AIServiceController } from "../controllers/AIServiceController";
import { IAIServiceManager } from '../services/interfaces/IAIServiceManager';

export function setupRoutes(app: Express, aiManager: IAIServiceManager) {
  const controller = new AIServiceController(aiManager);

  // Get available AI services
  app.get("/services", controller.getAvailableServices);

  // Add a new AI service
  app.post("/services", controller.addService);

  // Remove an AI service
  app.delete("/services/:name", controller.removeService);

  // Process a message using available AI services
  app.post("/process", controller.processMessage);
}
