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
const dotenv_1 = require("dotenv");
const resend_1 = require("resend");
const logger_1 = __importDefault(require("../utils/logger"));
(0, dotenv_1.config)();
class EmailService {
    constructor(api_key, from_email) {
        this.resend = new resend_1.Resend(api_key);
        this.email_from = from_email;
    }
    sendOTP(data, Template) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.resend.emails.send({
                    from: this.email_from,
                    to: data.to,
                    subject: data.subject,
                    react: Template,
                });
            }
            catch (error) {
                logger_1.default.error("Error sending email with Resend:", error);
                throw error;
            }
        });
    }
    sendBudgetNotification(email, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.resend.emails.send({
                    from: this.email_from,
                    to: email,
                    subject: 'Budget Exceeded Notification',
                    html: `<p>${message}</p>`,
                });
            }
            catch (error) {
                logger_1.default.error("Error sending budget notification email:", error);
                throw error;
            }
        });
    }
}
exports.default = new EmailService(process.env.RESEND_API_KEY, process.env.EMAIL_FROM);
