"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const budgetRoutes_1 = __importDefault(require("./routes/budgetRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const reportRoutes_1 = __importDefault(require("./routes/reportRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const swagger_1 = require("./swagger/swagger");
const logger_1 = __importDefault(require("./utils/logger"));
const rateLimiter_1 = require("./middleware/rateLimiter");
const logger_2 = require("./middleware/logger");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(logger_2.requestLogger);
// Rate Limiting
app.use('/api/auth', rateLimiter_1.apiLimiter, authRoutes_1.default);
app.use('/api/budgets', rateLimiter_1.apiLimiter, budgetRoutes_1.default);
app.use('/api/categories', rateLimiter_1.apiLimiter, categoryRoutes_1.default);
app.use('/api/transactions', rateLimiter_1.apiLimiter, transactionRoutes_1.default);
app.use('/api/reports', rateLimiter_1.apiLimiter, reportRoutes_1.default);
app.use('/api/dashboard', rateLimiter_1.apiLimiter, dashboardRoutes_1.default);
// Swagger
(0, swagger_1.setupSwagger)(app);
// Database connection
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => logger_1.default.info('Connected to MongoDB'))
    .catch((err) => logger_1.default.error('MongoDB connection error:', err));
exports.default = app;
