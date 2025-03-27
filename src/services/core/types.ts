import { ServiceResponse, ServiceCapabilities, RateLimitInfo } from '../../domain/types/ServiceTypes';

export interface BaseAIService {
  getName(): string;
  getApiKey(): string;
  getCapabilities(): ServiceCapabilities | undefined;
  processMessage(message: string): Promise<ServiceResponse>;
  checkHealth(): Promise<boolean>;
  getRateLimitInfo(): Promise<RateLimitInfo>;
  updateRateLimit(error: any): void;
} 