// src/routes/reportRoutes.ts
import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { generateReport, exportReport } from '../controllers/reportController';
import { ErrorHandler } from '../utils/http/error-handler';

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/reports/{userId}:
 *   get:
 *     summary: Generate a financial report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Financial report generated successfully
 *       500:
 *         description: Error generating report
 */
router.get('/:userId', async (req, res) => {
  try {
    await generateReport(req, res);
  } catch (error) {
    ErrorHandler.handle(error as Error, res);
  }
});

/**
 * @swagger
 * /api/reports/{userId}/export:
 *   get:
 *     summary: Export a financial report as CSV
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Financial report exported successfully
 *       500:
 *         description: Error exporting report
 */
router.get('/:userId/export', async (req, res) => {
  try {
    await exportReport(req, res);
  } catch (error) {
    ErrorHandler.handle(error as Error, res);
  }
});

export default router;