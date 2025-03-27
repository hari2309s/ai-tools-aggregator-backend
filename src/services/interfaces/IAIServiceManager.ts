import { ServiceResponse } from '../../domain/types/ServiceTypes';

export interface ProcessMessageResult {
  response: ServiceResponse;
  serviceName: string;
  metrics?: {
    processingTime: number;
    attemptedServices: string[];
  };
}

export interface IAIServiceManager {
  processMessage(message: string): Promise<ProcessMessageResult>;
  addService(name: string, apiKey: string): void;
  removeService(name: string): void;
  getAvailableServices(): Promise<Array<{ name: string; capabilities?: any }>>;
} 