import dotenv from 'dotenv';

dotenv.config();

const validateEnv = () => {
  const requiredEnvVars = [
    'MONGODB_URI',
    'REDIS_URL',
    'JWT_SECRET',
    'NODE_ENV',
    'PORT'
  ];

  requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
      console.error(`Missing required environment variable: ${envVar}`);
      process.exit(1);
    }
  });
};

export default validateEnv; 