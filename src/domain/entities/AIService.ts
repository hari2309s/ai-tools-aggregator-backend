import { ServiceCapabilities, ServiceResponse, RateLimitInfo } from '../types/ServiceTypes';

export class AIService {
  constructor(
    private readonly name: string,
    private readonly apiKey: string,
    private readonly capabilities: ServiceCapabilities = {
      maxTokens: 1000,
      streaming: false,
      multimodal: false,
      supportedLanguages: ['en'],
      specializations: ['general']
    }
  ) {}

  public getName(): string {
    return this.name;
  }

  public getApiKey(): string {
    return this.apiKey;
  }

  public getCapabilities(): ServiceCapabilities {
    return this.capabilities;
  }

  public async processMessage(message: string): Promise<ServiceResponse> {
    return {
      content: `Test response from ${this.name}: ${message}`,
      metadata: {
        model: 'test-model',
        usage: {
          promptTokens: message.length,
          completionTokens: message.length * 2,
          totalTokens: message.length * 3
        },
        finishReason: 'completed'
      }
    };
  }

  public async checkHealth(): Promise<boolean> {
    return true;
  }

  public async getRateLimitInfo(): Promise<RateLimitInfo> {
    return {
      isRateLimited: false,
      remainingTokens: 1000,
      resetTime: new Date(Date.now() + 3600000),
      quotaInfo: {
        totalQuota: 1000,
        usedQuota: 0,
        quotaResetTime: new Date(Date.now() + 3600000)
      }
    };
  }

  public updateRateLimit(error: any): void {
    // Implementation will be added when needed
  }
} 