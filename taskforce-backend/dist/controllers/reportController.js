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
exports.exportReport = exports.generateReport = void 0;
const Transaction_1 = __importDefault(require("../models/Transaction"));
const Budget_1 = __importDefault(require("../models/Budget"));
const csvExport_1 = require("../utils/csvExport");
const error_handler_1 = require("../utils/http/error-handler");
const logger_1 = __importDefault(require("../utils/logger"));
const generateReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;
    try {
        const transactions = yield Transaction_1.default.find({
            userId,
            date: { $gte: new Date(startDate), $lte: new Date(endDate) },
        });
        const budgets = yield Budget_1.default.find({ userId });
        res.json({ transactions, budgets });
    }
    catch (error) {
        logger_1.default.error(`Error generating report: ${error}`);
        error_handler_1.ErrorHandler.handle(new error_handler_1.HttpError(500, 'Error generating report', 'InternalServerError'), res);
    }
});
exports.generateReport = generateReport;
const exportReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;
    try {
        const transactions = yield Transaction_1.default.find({
            userId,
            date: { $gte: new Date(startDate), $lte: new Date(endDate) },
        });
        const csvData = (0, csvExport_1.generateCSV)(transactions);
        res.header('Content-Type', 'text/csv');
        res.attachment('report.csv');
        res.send(csvData);
    }
    catch (error) {
        logger_1.default.error(`Error exporting report: ${error}`);
        error_handler_1.ErrorHandler.handle(new error_handler_1.HttpError(500, 'Error exporting report', 'InternalServerError'), res);
    }
});
exports.exportReport = exportReport;
