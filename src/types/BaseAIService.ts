/**
 * Represents the rate limit information for an AI service.
 */
export interface RateLimitInfo {
  /**
   * Indicates whether the service is currently rate-limited.
   */
  isRateLimited: boolean;

  /**
   * The number of remaining tokens or requests allowed before hitting the rate limit.
   */
  remainingTokens?: number;

  /**
   * The time when the rate limit will reset.
   */
  resetTime?: Date;

  /**
   * The error message associated with the rate limit, if any.
   */
  error?: string;

  /**
   * Quota information for the rate limit.
   */
  quotaInfo?: {
    totalQuota?: number;
    usedQuota?: number;
    quotaResetTime?: Date;
  };
}

/**
 * Base interface for all AI services.
 */
export interface BaseAIService<T = string> {
  /**
   * Processes a message and returns the AI-generated response.
   * @param message - The input message to process.
   * @returns A promise that resolves to the AI-generated response.
   */
  processMessage(message: string): Promise<ServiceResponse<T>>;

  /**
   * Retrieves the name of the AI service.
   * @returns The name of the service as a string.
   */
  getName(): string;

  /**
   * Retrieves the current rate limit information for the service.
   * @returns A promise that resolves to the rate limit information.
   */
  getRateLimitInfo(): Promise<RateLimitInfo>;

  /**
   * Updates the rate limit information based on the provided error.
   * @param error - The error object from the API response.
   */
  updateRateLimit(error: any): void;

  /**
   * Retrieves the capabilities of the AI service.
   * @returns The capabilities of the service.
   */
  getCapabilities?(): ServiceCapabilities;
}

/**
 * Represents the response from an AI service.
 */
export interface ServiceResponse<T = string> {
  /**
   * The content of the response.
   */
  content: T;

  /**
   * Metadata associated with the response.
   */
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

/**
 * Represents the capabilities of an AI service.
 */
export interface ServiceCapabilities {
  /**
   * The maximum number of tokens the service can handle.
   */
  maxTokens: number;

  /**
   * Indicates whether the service supports streaming responses.
   */
  streaming: boolean;

  /**
   * Indicates whether the service supports multimodal inputs.
   */
  multimodal: boolean;

  /**
   * The languages supported by the service.
   */
  supportedLanguages: string[];

  /**
   * The specializations of the service.
   */
  specializations: string[];
}

/**
 * Represents an error from an AI service.
 */
export class ServiceError extends Error {
  /**
   * Creates a new instance of the ServiceError class.
   * @param serviceName - The name of the service that caused the error.
   * @param message - The error message.
   * @param code - The error code, if any.
   * @param retryAfter - The time to wait before retrying, if applicable.
   */
  constructor(
    public serviceName: string,
    message: string,
    public code?: string,
    public retryAfter?: number
  ) {
    super(message);
    this.name = "ServiceError";
  }
}

/**
 * Represents a rate limit error.
 */
export interface RateLimitError extends Error {
  /**
   * The time when the rate limit will reset.
   */
  resetTime?: Date;
  /**
   * The number of remaining tokens or requests allowed before hitting the rate limit.
   */
  remainingTokens?: number;
}
