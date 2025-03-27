import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  apiKeys: {
    anthropic: process.env.ANTHROPIC_API_KEY,
    openai: process.env.OPENAI_API_KEY,
    google: process.env.GOOGLE_API_KEY,
    huggingface: process.env.HUGGINGFACE_API_KEY,
    cohere: process.env.COHERE_API_KEY,
    replicate: process.env.REPLICATE_API_KEY,
  },
  defaultModel: process.env.DEFAULT_MODEL || "gpt-3.5-turbo",
  services: {
    scoring: {
      baseScore: 1,
      bonusScore: {
        multimodal: 2,
        coding: 2,
      },
    },
    healthCheckInterval: 5 * 60 * 1000, // 5 minutes
  },
  rateLimit: {
    tokenThreshold: 100,
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }
};
