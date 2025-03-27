import { BaseAIService } from '../../services/core/types';
import { IAIServiceRepository } from '../interfaces/IAIServiceRepository';

export class AIServiceRepository implements IAIServiceRepository {
  private services: Map<string, BaseAIService> = new Map();

  addService(service: BaseAIService): void {
    this.services.set(service.getName(), service);
  }

  removeService(name: string): void {
    this.services.delete(name);
  }

  getService(name: string): BaseAIService | undefined {
    return this.services.get(name);
  }

  getAllServices(): BaseAIService[] {
    return Array.from(this.services.values());
  }

  updateService(service: BaseAIService): void {
    if (this.services.has(service.getName())) {
      this.services.set(service.getName(), service);
    }
  }
} 