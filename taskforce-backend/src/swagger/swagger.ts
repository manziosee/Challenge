// src/swagger/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import logger from '../utils/logger'; // Import logger

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Force Wallet API',
      version: '1.0.0',
      description: 'API for managing personal finances',
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Development server' },
      { url: 'https://taskforce-challenge.onrender.com', description: 'Render server' }, // Add your Render URL here
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  logger.info('Setting up Swagger documentation'); // Add log
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  logger.info('Swagger documentation setup complete'); // Add log
};