import express from 'express';
import { register, login, changePassword } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';
import { ErrorHandler } from '../utils/http/error-handler';

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       500:
 *         description: Error registering user
 */
router.post('/register', async (req, res) => {
  try {
    await register(req, res);
  } catch (error) {
    ErrorHandler.handle(error as Error, res);
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Error logging in
 */
router.post('/login', async (req, res) => {
  try {
    await login(req, res);
  } catch (error) {
    ErrorHandler.handle(error as Error, res);
  }
});

/**
 * @swagger
 * /api/auth/change-password:
 *   put:
 *     summary: Change user password
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid current password
 *       500:
 *         description: Error changing password
 */
router.put('/change-password', authMiddleware, async (req, res) => {
  try {
    await changePassword(req, res);
  } catch (error) {
    ErrorHandler.handle(error as Error, res);
  }
});

export default router;