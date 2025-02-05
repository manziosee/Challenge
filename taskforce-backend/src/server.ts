import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import app from './app';
import mongoose from 'mongoose';
import logger from './utils/logger';

const PORT = process.env.PORT || 5000;

// Database connection
mongoose.connect(process.env.MONGO_URI!)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((err) => logger.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});