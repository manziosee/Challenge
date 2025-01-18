import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getBudgets, addBudget, updateBudget } from '../controllers/budgetController';
import { ErrorHandler } from '../utils/http/error-handler';

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/budgets/{userId}:
 *   get:
 *     summary: Get budgets for a user
 *     tags: [Budgets]
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
 *         description: List of budgets
 *       500:
 *         description: Error fetching budgets
 */
router.get('/:userId', async (req, res) => {
  try {
    await getBudgets(req, res);
  } catch (error) {
    ErrorHandler.handle(error as Error, res);
  }
});

/**
 * @swagger
 * /api/budgets:
 *   post:
 *     summary: Add a new budget
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               category:
 *                 type: string
 *               limit:
 *                 type: number
 *               period:
 *                 type: string
 *     responses:
 *       201:
 *         description: Budget added successfully
 *       500:
 *         description: Error adding budget
 */
router.post('/', async (req, res) => {
  try {
    await addBudget(req, res);
  } catch (error) {
    ErrorHandler.handle(error as Error, res);
  }
});

/**
 * @swagger
 * /api/budgets/{id}:
 *   put:
 *     summary: Update a budget
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               spent:
 *                 type: number
 *     responses:
 *       200:
 *         description: Budget updated successfully
 *       404:
 *         description: Budget not found
 *       500:
 *         description: Error updating budget
 */
router.put('/:id', async (req, res) => {
  try {
    await updateBudget(req, res);
  } catch (error) {
    ErrorHandler.handle(error as Error, res);
  }
});

export default router;