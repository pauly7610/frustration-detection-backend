import express from 'express';
import connectDatabase from './config/database';
import { connectRedis } from './config/redis';
import validateEnv from './config/env';
import { errorHandler } from './middleware/errorHandler';

// Import routes
import authRoutes from './routes/authRoutes';
import sessionRoutes from './routes/sessionRoutes';
import alertRoutes from './routes/alertRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/alerts', alertRoutes);

// Error handling middleware (should be last)
app.use(errorHandler);

// Initialize dependencies
const startServer = async () => {
  try {
    // Validate environment variables
    validateEnv();

    // Connect to databases
    await connectDatabase();
    await connectRedis();

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app; 