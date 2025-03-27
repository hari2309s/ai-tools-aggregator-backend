import { config } from '../../config';
import { logger } from '../../utils/logger';
import { IAIServiceManager, ProcessMessageResult } from '../interfaces/IAIServiceManager';
import { IAIServiceRepository } from '../../repositories/interfaces/IAIServiceRepository';
import { BaseAIService } from '../core/types';
import { ServiceFactory } from '../core/ServiceFactory';
import { detectLanguage, assessMessageComplexity, containsAnyTerms, countTermOccurrences } from '../../utils/textAnalysis';

export class AIServiceManager implements IAIServiceManager {
  private serviceHealthChecks: Map<string, Date> = new Map();

  constructor(private readonly repository: IAIServiceRepository) {
    this.initializeServices();
    this.startHealthChecks();
  }

  private initializeServices() {
    if (process.env.ANTHROPIC_API_KEY) {
      this.addService("anthropic", process.env.ANTHROPIC_API_KEY);
    }
    if (process.env.OPENAI_API_KEY) {
      this.addService("openai", process.env.OPENAI_API_KEY);
    }
    if (process.env.GOOGLE_API_KEY) {
      this.addService("google", process.env.GOOGLE_API_KEY);
    }
    if (process.env.HUGGINGFACE_API_KEY) {
      this.addService("huggingface", process.env.HUGGINGFACE_API_KEY);
    }
    if (process.env.COHERE_API_KEY) {
      this.addService("cohere", process.env.COHERE_API_KEY);
    }
    if (process.env.REPLICATE_API_KEY) {
      this.addService("replicate", process.env.REPLICATE_API_KEY);
    }
  }

  private async getServiceScore(
    serviceName: string,
    message: string,
    service: BaseAIService
  ): Promise<number> {
    const lowerMessage = message.toLowerCase();
    let score = config.services.scoring.baseScore;

    const capabilities = service.getCapabilities();
    if (capabilities) {
      // Multimodal capabilities
      if (capabilities.multimodal && message.includes("image")) {
        score += config.services.scoring.bonusScore.multimodal;
      }

      // Language-specific scoring with weighted bonuses
      if (capabilities.supportedLanguages) {
        const messageLanguage = detectLanguage(message);
        if (capabilities.supportedLanguages.includes(messageLanguage)) {
          // Higher bonus for non-English languages
          score += messageLanguage === 'en' ? 1 : 3;
        }
      }

      // Specialization-based scoring with context awareness
      if (capabilities.specializations) {
        // Coding and technical tasks with framework detection
        if (capabilities.specializations.includes("coding")) {
          const codingTerms = ["code", "program", "function", "api", "debug", "test", "compile"];
          const frameworkTerms = ["react", "angular", "vue", "node", "python", "java", "go", "rust"];
          
          if (containsAnyTerms(message, codingTerms)) score += config.services.scoring.bonusScore.coding;
          if (containsAnyTerms(message, frameworkTerms)) score += 2;
        }

        // Creative writing with genre detection
        if (capabilities.specializations.includes("creative")) {
          const creativeTerms = ["story", "write", "creative", "narrative", "plot", "character"];
          const genreTerms = ["fiction", "poetry", "essay", "article", "blog", "script"];
          
          if (containsAnyTerms(message, creativeTerms)) score += 2;
          if (containsAnyTerms(message, genreTerms)) score += 1;
        }

        // Analysis and reasoning with depth detection
        if (capabilities.specializations.includes("analysis")) {
          const analysisTerms = ["analyze", "explain", "why", "how", "compare", "contrast"];
          const depthTerms = ["deep", "detailed", "comprehensive", "thorough"];
          
          if (containsAnyTerms(message, analysisTerms)) score += 2;
          if (containsAnyTerms(message, depthTerms)) score += 1;
        }

        // Translation with language pair detection
        if (capabilities.specializations.includes("translation")) {
          const translationTerms = ["translate", "language", "localize", "localization"];
          if (containsAnyTerms(message, translationTerms)) score += 2;
        }
      }
    }

    // Service-specific scoring with enhanced context awareness
    switch (serviceName.toLowerCase()) {
      case "anthropic":
        // Claude is great for long-form content, analysis, and coding
        if (message.length > 500) score += 3;
        if (message.length > 2000) score += 2;
        if (containsAnyTerms(message, ["explain", "analyze"])) score += 2;
        if (containsAnyTerms(message, ["code", "program"])) score += 3;
        if (containsAnyTerms(message, ["write", "essay"])) score += 2;
        if (containsAnyTerms(message, ["ethical", "moral"])) score += 2;
        if (containsAnyTerms(message, ["research", "academic"])) score += 2;
        if (containsAnyTerms(message, ["reasoning", "logic"])) score += 2;
        break;

      case "openai":
        // GPT is great for creative tasks and general conversation
        if (containsAnyTerms(message, ["creative", "story"])) score += 2;
        if (containsAnyTerms(message, ["chat", "conversation"])) score += 2;
        if (containsAnyTerms(message, ["fun", "joke"])) score += 1;
        if (containsAnyTerms(message, ["brainstorm", "ideas"])) score += 2;
        if (containsAnyTerms(message, ["short", "concise"])) score += 1;
        if (containsAnyTerms(message, ["generate", "create"])) score += 2;
        if (containsAnyTerms(message, ["variation", "alternative"])) score += 1;
        break;

      case "google":
        // Google's AI is good for factual and search-related tasks
        if (containsAnyTerms(message, ["search", "find"])) score += 2;
        if (containsAnyTerms(message, ["fact", "information"])) score += 2;
        if (containsAnyTerms(message, ["news", "current"])) score += 2;
        if (containsAnyTerms(message, ["knowledge", "learn"])) score += 2;
        if (containsAnyTerms(message, ["latest", "recent"])) score += 1;
        if (containsAnyTerms(message, ["verify", "check"])) score += 1;
        break;

      case "huggingface":
        // HuggingFace is good for specific ML tasks and model fine-tuning
        if (containsAnyTerms(message, ["model", "ml"])) score += 3;
        if (containsAnyTerms(message, ["train", "fine-tune"])) score += 3;
        if (containsAnyTerms(message, ["dataset", "data"])) score += 2;
        if (containsAnyTerms(message, ["nlp", "text"])) score += 2;
        if (containsAnyTerms(message, ["transformer", "bert"])) score += 2;
        if (containsAnyTerms(message, ["inference", "predict"])) score += 2;
        break;

      case "cohere":
        // Cohere is good for text classification and similarity
        if (containsAnyTerms(message, ["classify", "category"])) score += 3;
        if (containsAnyTerms(message, ["similar", "match"])) score += 3;
        if (containsAnyTerms(message, ["cluster", "group"])) score += 2;
        if (containsAnyTerms(message, ["embedding", "vector"])) score += 2;
        if (containsAnyTerms(message, ["semantic", "meaning"])) score += 2;
        if (containsAnyTerms(message, ["search", "find"])) score += 2;
        break;

      case "replicate":
        // Replicate is good for specific ML model deployments
        if (containsAnyTerms(message, ["deploy", "host"])) score += 3;
        if (containsAnyTerms(message, ["model", "ml"])) score += 2;
        if (containsAnyTerms(message, ["api", "endpoint"])) score += 2;
        if (containsAnyTerms(message, ["inference", "predict"])) score += 2;
        if (containsAnyTerms(message, ["container", "docker"])) score += 2;
        if (containsAnyTerms(message, ["scale", "production"])) score += 2;
        break;
    }

    // Enhanced message characteristics scoring
    const messageLength = message.length;
    if (messageLength > 1000) score += 1;
    if (messageLength < 100) score += 1;
    if (messageLength > 5000) score += 2;

    // Enhanced complexity-based scoring
    const complexity = assessMessageComplexity(message);
    if (complexity > 0.7) score += 2;
    if (complexity < 0.3) score += 1;
    if (complexity > 0.9) score += 1;

    return score;
  }

  private async rankServices(message: string): Promise<Array<{ name: string; service: BaseAIService; score: number }>> {
    const services = this.repository.getAllServices();
    const scores = await Promise.all(
      services.map(async (service) => ({
        name: service.getName(),
        service,
        score: await this.getServiceScore(service.getName(), message, service),
      }))
    );
    return scores.sort((a, b) => b.score - a.score);
  }

  public async processMessage(message: string): Promise<ProcessMessageResult> {
    const startTime = Date.now();
    const attemptedServices: string[] = [];

    try {
      const rankedServices = await this.rankServices(message);
      
      for (const { service } of rankedServices) {
        attemptedServices.push(service.getName());
        
        try {
          const response = await service.processMessage(message);
          return {
            response,
            serviceName: service.getName(),
            metrics: {
              processingTime: Date.now() - startTime,
              attemptedServices,
            },
          };
        } catch (error) {
          logger.error(`Error processing message with service ${service.getName()}:`, error);
          continue;
        }
      }

      throw new Error("No service was able to process the message");
    } catch (error) {
      logger.error("Error in processMessage:", error);
      throw error;
    }
  }

  public addService(name: string, apiKey: string): void {
    const service = ServiceFactory.createService(name, apiKey);
    this.repository.addService(service);
  }

  public removeService(name: string): void {
    this.repository.removeService(name);
  }

  public async getAvailableServices() {
    const services = this.repository.getAllServices();
    return services.map(service => ({
      name: service.getName(),
      capabilities: service.getCapabilities(),
    }));
  }

  private startHealthChecks() {
    setInterval(async () => {
      const services = this.repository.getAllServices();
      for (const service of services) {
        try {
          const isHealthy = await service.checkHealth();
          if (isHealthy) {
            this.serviceHealthChecks.set(service.getName(), new Date());
          }
        } catch (error) {
          logger.error(`Health check failed for service ${service.getName()}:`, error);
        }
      }
    }, config.services.healthCheckInterval);
  }
} 