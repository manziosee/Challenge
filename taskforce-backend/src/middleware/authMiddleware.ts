import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpError, ErrorHandler } from '../utils/http/error-handler';
import logger from '../utils/logger';

// Extend the Request type to include the `user` property
declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      userId?: string; // Add userId to the type definition
    };
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    logger.warn('Access denied. No token provided.');
    ErrorHandler.handle(new HttpError(401, 'Access denied. No token provided.', 'UnauthenticatedError'), res);
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.user = { id: decoded.userId, userId: decoded.userId }; // Set userId in the user object
    logger.info(`User authenticated: ${decoded.userId}`);
    next();
  } catch (error) {
    logger.error(`Invalid token: ${error}`);
    ErrorHandler.handle(new HttpError(401, 'Invalid token', 'UnauthenticatedError'), res);
  }
};
