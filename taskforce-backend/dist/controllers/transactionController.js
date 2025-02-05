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
exports.getTransactions = exports.deleteTransaction = exports.addTransaction = void 0;
const Transaction_1 = __importDefault(require("../models/Transaction"));
const error_handler_1 = require("../utils/http/error-handler");
const currency_1 = require("../utils/currency");
const logger_1 = __importDefault(require("../utils/logger"));
const addTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, amount, type, category, subcategory, account, date, description } = req.body;
    try {
        const transaction = new Transaction_1.default({ userId, amount, type, category, subcategory, account, date, description });
        yield transaction.save();
        logger_1.default.info(`Transaction added for user: ${userId}`);
        res.status(201).json(transaction);
    }
    catch (error) {
        logger_1.default.error(`Error adding transaction: ${error}`);
        error_handler_1.ErrorHandler.handle(new error_handler_1.HttpError(500, 'Error adding transaction', 'InternalServerError'), res);
    }
});
exports.addTransaction = addTransaction;
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const transaction = yield Transaction_1.default.findByIdAndDelete(id);
        if (!transaction) {
            return error_handler_1.ErrorHandler.handle(new error_handler_1.HttpError(404, 'Transaction not found', 'NotFoundError'), res);
        }
        logger_1.default.info(`Transaction deleted: ${id}`);
        res.json({ message: 'Transaction deleted successfully' });
    }
    catch (error) {
        logger_1.default.error(`Error deleting transaction: ${error}`);
        error_handler_1.ErrorHandler.handle(new error_handler_1.HttpError(500, 'Error deleting transaction', 'InternalServerError'), res);
    }
});
exports.deleteTransaction = deleteTransaction;
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { currency } = req.query;
    try {
        const transactions = yield Transaction_1.default.find({ userId });
        if (currency) {
            for (const transaction of transactions) {
                transaction.amount = yield (0, currency_1.convertCurrency)(transaction.amount, 'RWF', currency);
            }
        }
        res.json(transactions);
    }
    catch (error) {
        logger_1.default.error(`Error fetching transactions: ${error}`);
        error_handler_1.ErrorHandler.handle(new error_handler_1.HttpError(500, 'Error fetching transactions', 'InternalServerError'), res);
    }
});
exports.getTransactions = getTransactions;
