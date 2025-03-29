export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  status: 'sending' | 'sent' | 'error';
  serviceName?: string;
  attachment?: string;
  metrics?: {
    processingTime: number;
    attemptedServices: string[];
  };
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatResponse {
  message: string;
  error?: string;
  status: 'success' | 'error';
  serviceName?: string;
  metrics?: {
    processingTime: number;
    attemptedServices: string[];
  };
}

export interface AIService {
  name: string;
  capabilities?: {
    multimodal?: boolean;
    supportedLanguages?: string[];
    specializations?: string[];
  };
}