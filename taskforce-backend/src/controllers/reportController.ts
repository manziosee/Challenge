import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import Budget from '../models/Budget';
import { generateCSV } from '../utils/csvExport';
import { HttpError, ErrorHandler } from '../utils/http/error-handler';
import logger from '../utils/logger';

export const generateReport = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { startDate, endDate } = req.query;

  try {
    const transactions = await Transaction.find({
      userId,
      date: { $gte: new Date(startDate as string), $lte: new Date(endDate as string) },
    });

    const budgets = await Budget.find({ userId });

    res.json({ transactions, budgets });
  } catch (error) {
    logger.error(`Error generating report: ${error}`);
    ErrorHandler.handle(new HttpError(500, 'Error generating report', 'InternalServerError'), res);
  }
};

export const exportReport = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { startDate, endDate } = req.query;

  try {
    const transactions = await Transaction.find({
      userId,
      date: { $gte: new Date(startDate as string), $lte: new Date(endDate as string) },
    });

    const csvData = generateCSV(transactions);
    res.header('Content-Type', 'text/csv');
    res.attachment('report.csv');
    res.send(csvData);
  } catch (error) {
    logger.error(`Error exporting report: ${error}`);
    ErrorHandler.handle(new HttpError(500, 'Error exporting report', 'InternalServerError'), res);
  }
};