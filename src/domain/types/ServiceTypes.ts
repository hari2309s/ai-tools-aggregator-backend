export interface ServiceResponse {
  content: string;
  metadata?: {
    model?: string;
    usage?: {
      promptTokens?: number;
      completionTokens?: number;
      totalTokens?: number;
    };
    finishReason?: string;
  };
}

export interface ServiceError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface RateLimitInfo {
  isRateLimited: boolean;
  remainingTokens?: number;
  resetTime?: Date;
  error?: string;
  quotaInfo?: {
    totalQuota?: number;
    usedQuota?: number;
    quotaResetTime?: Date;
  };
}

export interface ServiceCapabilities {
  maxTokens: number;
  streaming: boolean;
  multimodal: boolean;
  supportedLanguages: string[];
  specializations: string[];
} 