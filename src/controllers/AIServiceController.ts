import { Request, Response } from "express";
import { IAIServiceManager } from "../services/interfaces/IAIServiceManager";

export class AIServiceController {
  constructor(private readonly aiManager: IAIServiceManager) {}

  /**
   * Handles fetching available AI services.
   */
  public getAvailableServices = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const services = await this.aiManager.getAvailableServices();
      res.json({ services });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  };

  /**
   * Handles adding a new AI service.
   */
  public addService = (req: Request, res: Response): void => {
    const { name, apiKey } = req.body;
    if (!name || !apiKey) {
      res.status(400).json({ error: "Name and API key are required" });
      return;
    }

    this.aiManager.addService(name, apiKey);
    res.json({ message: "Service added successfully" });
  };

  /**
   * Handles removing an AI service.
   */
  public removeService = (req: Request, res: Response): void => {
    const { name } = req.params;
    this.aiManager.removeService(name);
    res.json({ message: "Service removed successfully" });
  };

  /**
   * Handles processing a message using available AI services.
   */
  public processMessage = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { message } = req.body;
    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    try {
      const result = await this.aiManager.processMessage(message);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to process message" });
    }
  };
}
