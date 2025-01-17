// src/routes/categoryRoutes.ts
import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getCategories, addCategory, deleteCategory, updateSubcategory, deleteSubcategory } from '../controllers/categoryController';
import { ErrorHandler } from '../utils/http/error-handler';

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/categories/{userId}:
 *   get:
 *     summary: Get categories for a user
 *     tags: [Categories]
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
 *         description: List of categories
 *       500:
 *         description: Error fetching categories
 */
router.get('/:userId', async (req, res) => {
  try {
    await getCategories(req, res);
  } catch (error) {
    ErrorHandler.handle(error as Error, res);
  }
});

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Add a new category
 *     tags: [Categories]
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
 *               name:
 *                 type: string
 *               subcategories:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Category added successfully
 *       500:
 *         description: Error adding category
 */
router.post('/', async (req, res) => {
  try {
    await addCategory(req, res);
  } catch (error) {
    ErrorHandler.handle(error as Error, res);
  }
});

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
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
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error deleting category
 */
router.delete('/:id', async (req, res) => {
  try {
    await deleteCategory(req, res);
  } catch (error) {
    ErrorHandler.handle(error as Error, res);
  }
});

/**
 * @swagger
 * /api/categories/{id}/subcategories/{subcategoryIndex}:
 *   put:
 *     summary: Update a subcategory
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: subcategoryIndex
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
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: Subcategory updated successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error updating subcategory
 */
router.put('/:id/subcategories/:subcategoryIndex', async (req, res) => {
  try {
    await updateSubcategory(req, res);
  } catch (error) {
    ErrorHandler.handle(error as Error, res);
  }
});

/**
 * @swagger
 * /api/categories/{id}/subcategories/{subcategoryIndex}:
 *   delete:
 *     summary: Delete a subcategory
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: subcategoryIndex
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subcategory deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error deleting subcategory
 */
router.delete('/:id/subcategories/:subcategoryIndex', async (req, res) => {
  try {
    await deleteSubcategory(req, res);
  } catch (error) {
    ErrorHandler.handle(error as Error, res);
  }
});

export default router;