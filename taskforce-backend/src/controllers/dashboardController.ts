import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import { HttpError, ErrorHandler } from '../utils/http/error-handler';
import { convertCurrency } from '../utils/currency';
import logger from '../utils/logger';

export const getDashboardData = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { currency } = req.query;

  try {
    const transactions = await Transaction.find({ userId });

    let income = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    let expenses = transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    if (currency) {
      income = await convertCurrency(income, 'RWF', currency as string);
      expenses = await convertCurrency(expenses, 'RWF', currency as string);
    }

    const categories = await Category.find({ userId });
    const categorySpending = await Promise.all(categories.map(async category => {
      const total = transactions
        .filter(transaction => transaction.category === category.name)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      return {
        name: category.name,
        total: currency ? await convertCurrency(total, 'RWF', currency as string) : total,
      };
    }));

    res.json({ income, expenses, categorySpending });
  } catch (error) {
    logger.error(`Error fetching dashboard data: ${error}`);
    ErrorHandler.handle(new HttpError(500, 'Error fetching dashboard data', 'InternalServerError'), res);
  }
};