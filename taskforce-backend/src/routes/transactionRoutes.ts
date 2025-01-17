// src/routes/transactionRoutes.ts
import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getTransactions, addTransaction, deleteTransaction } from '../controllers/transactionController';
import { validateTransaction, handleValidationErrors } from '../middleware/validation';
import { ErrorHandler } from '../utils/http/error-handler';

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/transactions/{userId}:
 *   get:
 *     summary: Get transactions for a user
 *     tags: [Transactions]
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
 *         description: List of transactions
 *       500:
 *         description: Error fetching transactions
 */
router.get('/:userId', async (req, res) => {
  try {
    await getTransactions(req, res);
  } catch (error) {
    ErrorHandler.handle(error as Error, res);
  }
});

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Add a new transaction
 *     tags: [Transactions]
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
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *               category:
 *                 type: string
 *               subcategory:
 *                 type: string
 *               account:
 *                 type: string
 *               date:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaction added successfully
 *       500:
 *         description: Error adding transaction
 */
router.post('/', validateTransaction, handleValidationErrors, async (req: express.Request, res: express.Response) => {
  try {
    await addTransaction(req, res);
  } catch (error) {
    ErrorHandler.handle(error as Error, res);
  }
});

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Error deleting transaction
 */
router.delete('/:id', async (req, res) => {
  try {
    await deleteTransaction(req, res);
  } catch (error) {
    ErrorHandler.handle(error as Error, res);
  }
});

export default router;