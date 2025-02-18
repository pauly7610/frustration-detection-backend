# Frustration Detection Backend

This project is the backend for a frustration detection system. It tracks user interactions and analyzes them to detect frustration levels.

## Features

- **Interaction Tracking**: Captures various user interactions such as clicks, movements, and errors.
- **Frustration Analysis**: Analyzes interaction patterns to determine frustration levels.
- **API Endpoints**: Provides endpoints for tracking and retrieving interactions.

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express**: Web framework for Node.js
- **TypeScript**: Typed JavaScript
- **MongoDB**: NoSQL database
- **Redis**: In-memory data structure store
- **Kafka**: Distributed event streaming platform

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB
- Redis
- Kafka

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/frustration-detection-backend.git
   cd frustration-detection-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` and fill in the required values.

4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

- **POST /interactions/track**: Track user interactions.
- **GET /interactions/session/:sessionId**: Retrieve interactions for a session.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact [your-email@example.com](mailto:your-email@example.com).