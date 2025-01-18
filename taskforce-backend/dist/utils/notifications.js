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
exports.sendBudgetNotification = void 0;
const logger_1 = __importDefault(require("./logger"));
const User_1 = __importDefault(require("../models/User"));
const sendBudgetNotification = (userId, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(userId);
        if (user) {
            // Example: Send an email or in-app notification
            logger_1.default.info(`Notification sent to user ${userId}: ${message}`);
            // Integrate with an email service like SendGrid or an in-app notification system
        }
    }
    catch (error) {
        logger_1.default.error(`Error sending notification: ${error}`);
    }
});
exports.sendBudgetNotification = sendBudgetNotification;
