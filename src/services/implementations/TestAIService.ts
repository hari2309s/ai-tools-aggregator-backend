import { BaseAIService } from '../core/types';
import { ServiceResponse, ServiceCapabilities, RateLimitInfo } from '../../domain/types/ServiceTypes';

export class TestAIService implements BaseAIService {
  private rateLimitInfo: RateLimitInfo = {
    isRateLimited: false,
    remainingTokens: 1000,
    resetTime: new Date(Date.now() + 3600000),
    quotaInfo: {
      totalQuota: 1000,
      usedQuota: 0,
      quotaResetTime: new Date(Date.now() + 3600000)
    }
  };

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

  getName(): string {
    return this.name;
  }

  getApiKey(): string {
    return this.apiKey;
  }

  getCapabilities(): ServiceCapabilities {
    return this.capabilities;
  }

  async processMessage(message: string): Promise<ServiceResponse> {
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

  async checkHealth(): Promise<boolean> {
    return true;
  }

  async getRateLimitInfo(): Promise<RateLimitInfo> {
    return this.rateLimitInfo;
  }

  updateRateLimit(error: any): void {
    if (error?.response?.headers) {
      const remaining = error.response.headers['x-ratelimit-remaining'];
      if (remaining) {
        this.rateLimitInfo.remainingTokens = parseInt(remaining);
      }
    }
  }
} 