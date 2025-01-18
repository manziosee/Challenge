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
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const budgetController_1 = require("../controllers/budgetController");
const error_handler_1 = require("../utils/http/error-handler");
const router = express_1.default.Router();
router.use(authMiddleware_1.authMiddleware);
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
router.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, budgetController_1.getBudgets)(req, res);
    }
    catch (error) {
        error_handler_1.ErrorHandler.handle(error, res);
    }
}));
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
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, budgetController_1.addBudget)(req, res);
    }
    catch (error) {
        error_handler_1.ErrorHandler.handle(error, res);
    }
}));
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
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, budgetController_1.updateBudget)(req, res);
    }
    catch (error) {
        error_handler_1.ErrorHandler.handle(error, res);
    }
}));
exports.default = router;
