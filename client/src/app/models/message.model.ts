export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
  serviceName?: string;
  metrics?: {
    tokenCount?: number;
    responseTime?: number;
  };
}
