"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = exports.HttpError = void 0;
const httpCode = __importStar(require("./httpCode"));
const Errors = __importStar(require("./error"));
const logger_1 = __importDefault(require("../logger"));
class HttpError extends Error {
    constructor(status, message, name) {
        super(message);
        this.status = status;
        this.name = name;
    }
}
exports.HttpError = HttpError;
class ErrorHandler {
    static handle(error, res) {
        logger_1.default.error(error);
        switch (error.name) {
            case Errors.ValidationError:
                return res.status(httpCode.BAD_REQUEST).json({
                    success: false,
                    message: error.message,
                });
            case Errors.UnauthenticatedError:
                return res.status(httpCode.UNAUTHORIZED).json({
                    success: false,
                    message: "Unauthenticated",
                });
            case Errors.UnauthorizedError:
                return res.status(httpCode.UNAUTHORIZED).json({
                    success: false,
                    message: "Unauthorized",
                });
            case Errors.BadRequestError:
                return res.status(httpCode.BAD_REQUEST).json({
                    success: false,
                    message: error.message,
                });
            case Errors.NotFoundError:
                return res.status(httpCode.NOT_FOUND).json({
                    success: false,
                    message: error.message,
                });
            default:
                return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: "Internal Server Error",
                });
        }
    }
}
exports.ErrorHandler = ErrorHandler;
