import { BaseAIService } from './types';
import { TestAIService } from '../implementations/TestAIService';

export class ServiceFactory {
  static createService(name: string, apiKey: string): BaseAIService {
    // For now, we'll just use the test service
    return new TestAIService(name, apiKey);
  }
}
