# AI Tools Aggregator Backend

A Node.js backend service that intelligently routes AI requests between different AI services based on availability, capabilities, and message content. This is the backend version of the AI Tools Aggregator.

## Features

- Dynamic AI service management (add/remove services)
- Intelligent request routing with context-aware service selection
- Support for multiple AI providers (OpenAI, Anthropic, Google, HuggingFace, Cohere, Replicate)
- Advanced scoring system that matches message content to service capabilities
- Automatic fallback to alternative services if primary service fails
- RESTful API endpoints
- TypeScript implementation
- Comprehensive error handling and logging

## Supported AI Providers

- **OpenAI** - Great for creative tasks and general conversation
- **Anthropic (Claude)** - Excels at long-form content, analysis, and coding
- **Google Generative AI** - Strong for factual and search-related tasks
- **HuggingFace** - Specialized for ML tasks and model fine-tuning
- **Cohere** - Optimized for text classification and similarity
- **Replicate** - Ideal for specific ML model deployments

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your API keys:
   ```bash
   cp .env.example .env
   ```
4. Build the project:
   ```bash
   npm run build
   ```
5. Start the server:
   ```bash
   npm start
   ```

For development:

```bash
npm run dev
```

## API Endpoints

- `GET /services` - List available AI services
- `POST /services` - Add a new AI service
  ```json
  {
    "name": "openai",
    "apiKey": "your-api-key"
  }
  ```
- `DELETE /services/:name` - Remove an AI service
- `POST /process` - Process a message using available AI services
  ```json
  {
    "message": "Your message here"
  }
  ```

## Intelligent Routing System

The service uses a sophisticated scoring algorithm to determine the best AI provider for each request:

1. **Base Scoring** - Each service starts with a base score
2. **Capability Matching** - Scores are adjusted based on service capabilities (multimodal, language support)
3. **Specialization Analysis** - Content is analyzed for specific tasks (coding, creative writing, analysis)
4. **Service-Specific Scoring** - Each provider gets bonuses for their strengths
5. **Message Characteristics** - Length and complexity of the message affect scoring
6. **Fallback Mechanism** - If the top-ranked service fails, the system tries the next best option

## Environment Variables

- `PORT` - Server port (default: 3000)
- `OPENAI_API_KEY` - OpenAI API key
- `ANTHROPIC_API_KEY` - Anthropic API key
- `GOOGLE_API_KEY` - Google Generative AI API key
- `HUGGINGFACE_API_KEY` - HuggingFace API key
- `COHERE_API_KEY` - Cohere API key
- `REPLICATE_API_KEY` - Replicate API key
