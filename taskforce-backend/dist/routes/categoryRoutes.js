"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/categoryRoutes.ts
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const categoryController_1 = require("../controllers/categoryController");
const error_handler_1 = require("../utils/http/error-handler");
const router = express_1.default.Router();
router.use(authMiddleware_1.authMiddleware);
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
router.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, categoryController_1.getCategories)(req, res);
    }
    catch (error) {
        error_handler_1.ErrorHandler.handle(error, res);
    }
}));
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
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, categoryController_1.addCategory)(req, res);
    }
    catch (error) {
        error_handler_1.ErrorHandler.handle(error, res);
    }
}));
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
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, categoryController_1.deleteCategory)(req, res);
    }
    catch (error) {
        error_handler_1.ErrorHandler.handle(error, res);
    }
}));
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
router.put('/:id/subcategories/:subcategoryIndex', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, categoryController_1.updateSubcategory)(req, res);
    }
    catch (error) {
        error_handler_1.ErrorHandler.handle(error, res);
    }
}));
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
router.delete('/:id/subcategories/:subcategoryIndex', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, categoryController_1.deleteSubcategory)(req, res);
    }
    catch (error) {
        error_handler_1.ErrorHandler.handle(error, res);
    }
}));
exports.default = router;
