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
exports.sendBudgetNotificationEmail = exports.sendEmail = void 0;
const resend_1 = require("resend");
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const BudgetNotificationEmail_1 = __importDefault(require("../emails/BudgetNotificationEmail"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
const sendEmail = (to, subject, message) => __awaiter(void 0, void 0, void 0, function* () {
    const emailHtml = server_1.default.renderToStaticMarkup(react_1.default.createElement(BudgetNotificationEmail_1.default, { message }));
    try {
        yield resend.emails.send({
            from: process.env.EMAIL_FROM || 'default@example.com',
            to,
            subject,
            html: emailHtml,
        });
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
});
exports.sendEmail = sendEmail;
const sendBudgetNotificationEmail = (to, message) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.sendEmail)(to, 'Budget Exceeded Notification', message);
});
exports.sendBudgetNotificationEmail = sendBudgetNotificationEmail;
