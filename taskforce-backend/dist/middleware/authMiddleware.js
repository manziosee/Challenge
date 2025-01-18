"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_handler_1 = require("../utils/http/error-handler");
const logger_1 = __importDefault(require("../utils/logger"));
const authController_1 = require("../controllers/authController");
// Authentication middleware
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        logger_1.default.warn('Access denied. No token provided.');
        error_handler_1.ErrorHandler.handle(new error_handler_1.HttpError(401, 'Access denied. No token provided.', 'UnauthenticatedError'), res);
        return;
    }
    // Check if the token is revoked
    (0, authController_1.isTokenRevoked)(req, res, () => {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = { id: decoded.userId, userId: decoded.userId };
            logger_1.default.info(`User authenticated: ${decoded.userId}`);
            next();
        }
        catch (error) {
            logger_1.default.error(`Invalid token: ${error}`);
            error_handler_1.ErrorHandler.handle(new error_handler_1.HttpError(401, 'Invalid token', 'UnauthenticatedError'), res);
        }
    });
};
exports.authMiddleware = authMiddleware;
