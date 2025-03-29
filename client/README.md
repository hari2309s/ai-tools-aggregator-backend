# AI Tools Aggregator Frontend

A modern web application that intelligently leverages multiple AI services to provide the best possible AI experience. Built with Angular and featuring a beautiful Material Design interface, this frontend connects to a sophisticated API that dynamically routes requests to the most appropriate AI service based on the task at hand.

## Features

- Intelligent AI service selection based on task requirements and capabilities
- Dynamic routing of requests to the most suitable AI provider
- Real-time service status monitoring and automatic fallback
- Modern, responsive UI built with Angular Material
- Mobile-friendly design
- Seamless integration with multiple AI providers (OpenAI, Anthropic, Google, HuggingFace, Cohere, Replicate)
- Advanced scoring system that matches your needs to the best available AI service
- Dynamic service management (add/remove AI services)

## Tech Stack

- **Frontend Framework**: Angular 19
- **UI Components**: Angular Material
- **Styling**: Tailwind CSS
- **Testing**: Jasmine & Karma
- **API Integration**: RESTful AI Tools Aggregator API

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v19.2.5)
- AI Tools Aggregator API running locally or deployed

## Installation

1. Clone the repository:
```bash
git clone https://github.com/hari2309s/ai-tools-aggregator-backend.git
cd ai-tools-aggregator-backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure the API URL:
   - Create a `.env` file in the client directory
   - Add the API URL:
     ```
     VITE_API_URL=http://localhost:3000
     ```

## Development

1. Start the API server (refer to the [API README](https://github.com/hari2309s/ai-tools-aggregator-backend/blob/main/README.md) for setup instructions)

2. Start the frontend development server:
```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## API Integration

This frontend application is designed to work with the AI Tools Aggregator API, which provides intelligent AI service orchestration. The API is available at [https://github.com/hari2309s/ai-tools-aggregator-backend](https://github.com/hari2309s/ai-tools-aggregator-backend).

The API provides:

- Dynamically selects the most appropriate AI service for each request
- Routes requests based on:
  - Task type and complexity
  - Service capabilities and specializations
  - Current service availability and performance
  - Cost and efficiency considerations
- Provides automatic fallback to alternative services if needed
- Supports multiple AI providers with their unique strengths:
  - OpenAI for creative tasks and general conversation
  - Anthropic (Claude) for long-form content and analysis
  - Google Generative AI for factual and search-related tasks
  - HuggingFace for specialized ML tasks
  - Cohere for text classification and similarity
  - Replicate for specific ML model deployments

For detailed API information, including setup and endpoints, please refer to the [API README](https://github.com/hari2309s/ai-tools-aggregator-backend/blob/main/README.md).

## Building for Production

To build the project for production:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. The production build optimizes your application for performance and speed.

## Testing

### Unit Tests

To execute unit tests with the Karma test runner:

```bash
npm test
```

### End-to-End Tests

For end-to-end testing:

```bash
ng e2e
```

## Project Structure

- `src/app/` - Main application code
  - `components/` - Reusable UI components
  - `services/` - Application services and API integration
  - `models/` - TypeScript interfaces and types
  - `app.component.ts` - Root component
  - `app.module.ts` - Main application module

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Angular](https://angular.io/) - The web framework used
- [Angular Material](https://material.angular.io/) - UI component library
- [AI Tools Aggregator API](https://github.com/hari2309s/ai-tools-aggregator-backend) - The intelligent API service that powers this frontend
