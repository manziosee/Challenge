import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import { HttpError, ErrorHandler } from '../utils/http/error-handler';
import { convertCurrency } from '../utils/currency';
import logger from '../utils/logger';

export const addTransaction = async (req: Request, res: Response) => {
  const { userId, amount, type, category, subcategory, account, date, description } = req.body;

  try {
    const transaction = new Transaction({ userId, amount, type, category, subcategory, account, date, description });
    await transaction.save();
    logger.info(`Transaction added for user: ${userId}`);
    res.status(201).json(transaction);
  } catch (error) {
    logger.error(`Error adding transaction: ${error}`);
    ErrorHandler.handle(new HttpError(500, 'Error adding transaction', 'InternalServerError'), res);
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      return ErrorHandler.handle(new HttpError(404, 'Transaction not found', 'NotFoundError'), res);
    }
    logger.info(`Transaction deleted: ${id}`);
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting transaction: ${error}`);
    ErrorHandler.handle(new HttpError(500, 'Error deleting transaction', 'InternalServerError'), res);
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { currency } = req.query;

  try {
    const transactions = await Transaction.find({ userId });
    if (currency) {
      for (const transaction of transactions) {
        transaction.amount = await convertCurrency(transaction.amount, 'RWF', currency as string);
      }
    }
    res.json(transactions);
  } catch (error) {
    logger.error(`Error fetching transactions: ${error}`);
    ErrorHandler.handle(new HttpError(500, 'Error fetching transactions', 'InternalServerError'), res);
  }
};