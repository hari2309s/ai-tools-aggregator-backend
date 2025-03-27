import { BaseAIService } from '../../services/core/types';

export interface IAIServiceRepository {
  addService(service: BaseAIService): void;
  removeService(name: string): void;
  getService(name: string): BaseAIService | undefined;
  getAllServices(): BaseAIService[];
  updateService(service: BaseAIService): void;
} 