"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./utils/logger"));
const PORT = process.env.PORT || 5000;
// Database connection
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => logger_1.default.info('Connected to MongoDB'))
    .catch((err) => logger_1.default.error('MongoDB connection error:', err));
// Start the server
app_1.default.listen(PORT, () => {
    logger_1.default.info(`Server running on http://localhost:${PORT}`);
});
