import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import budgetRoutes from './routes/budgetRoutes';
import categoryRoutes from './routes/categoryRoutes';
import transactionRoutes from './routes/transactionRoutes';
import reportRoutes from './routes/reportRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import { setupSwagger } from './swagger/swagger';
import logger from './utils/logger';
import { apiLimiter } from './middleware/rateLimiter';
import { requestLogger } from './middleware/logger';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Rate Limiting
app.use('/api/auth', apiLimiter, authRoutes);
app.use('/api/budgets', apiLimiter, budgetRoutes);
app.use('/api/categories', apiLimiter, categoryRoutes);
app.use('/api/transactions', apiLimiter, transactionRoutes);
app.use('/api/reports', apiLimiter, reportRoutes);
app.use('/api/dashboard', apiLimiter, dashboardRoutes);

// Swagger
setupSwagger(app);

// Database connection
mongoose.connect(process.env.MONGO_URI!)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((err) => logger.error('MongoDB connection error:', err));

export default app;