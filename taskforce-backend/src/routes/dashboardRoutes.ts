// src/routes/dashboardRoutes.ts
import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getDashboardData } from '../controllers/dashboardController';
import { ErrorHandler } from '../utils/http/error-handler';

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/dashboard/{userId}:
 *   get:
 *     summary: Get dashboard data for a user
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *       500:
 *         description: Error fetching dashboard data
 */
router.get('/:userId', async (req, res) => {
  try {
    await getDashboardData(req, res);
  } catch (error) {
    ErrorHandler.handle(error as Error, res);
  }
});

export default router;