import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateTransaction = [
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('type').isIn(['income', 'expense']).withMessage('Type must be income or expense'),
  body('category').notEmpty().withMessage('Category is required'),
  body('date').isDate().withMessage('Invalid date'),
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Send a response and stop further processing
    res.status(400).json({ errors: errors.array() });
    return; 
  }
  
  next();
};