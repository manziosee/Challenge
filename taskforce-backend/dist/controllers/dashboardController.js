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
exports.getDashboardData = void 0;
const Transaction_1 = __importDefault(require("../models/Transaction"));
const Category_1 = __importDefault(require("../models/Category"));
const error_handler_1 = require("../utils/http/error-handler");
const currency_1 = require("../utils/currency");
const logger_1 = __importDefault(require("../utils/logger"));
const getDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { currency } = req.query;
    try {
        const transactions = yield Transaction_1.default.find({ userId });
        let income = transactions
            .filter(transaction => transaction.type === 'income')
            .reduce((sum, transaction) => sum + transaction.amount, 0);
        let expenses = transactions
            .filter(transaction => transaction.type === 'expense')
            .reduce((sum, transaction) => sum + transaction.amount, 0);
        if (currency) {
            income = yield (0, currency_1.convertCurrency)(income, 'RWF', currency);
            expenses = yield (0, currency_1.convertCurrency)(expenses, 'RWF', currency);
        }
        const categories = yield Category_1.default.find({ userId });
        const categorySpending = yield Promise.all(categories.map((category) => __awaiter(void 0, void 0, void 0, function* () {
            const total = transactions
                .filter(transaction => transaction.category === category.name)
                .reduce((sum, transaction) => sum + transaction.amount, 0);
            return {
                name: category.name,
                total: currency ? yield (0, currency_1.convertCurrency)(total, 'RWF', currency) : total,
            };
        })));
        res.json({ income, expenses, categorySpending });
    }
    catch (error) {
        logger_1.default.error(`Error fetching dashboard data: ${error}`);
        error_handler_1.ErrorHandler.handle(new error_handler_1.HttpError(500, 'Error fetching dashboard data', 'InternalServerError'), res);
    }
});
exports.getDashboardData = getDashboardData;
