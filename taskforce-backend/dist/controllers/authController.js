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
exports.isTokenRevoked = exports.logout = exports.changePassword = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const email_1 = require("../utils/email");
const logger_1 = __importDefault(require("../utils/logger"));
const utils_1 = require("../utils");
// In-memory token blacklist
const revokedTokens = new Set();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new User_1.default({ name, email, password: hashedPassword });
        yield user.save();
        // Generate a random code for the email
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        // Send registration confirmation email with the code
        yield (0, email_1.sendEmail)(email, 'Welcome to TaskForce Wallet', code);
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (_a) {
        res.status(500).json({ error: 'Error registering user' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ error: 'Invalid credentials' });
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ error: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (_a) {
        res.status(500).json({ error: 'Error logging in' });
    }
});
exports.login = login;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const { currentPassword, newPassword } = req.body;
    try {
        const user = yield User_1.default.findById(userId);
        if (!user)
            return res.status(400).json({ error: 'User not found' });
        const isMatch = yield bcryptjs_1.default.compare(currentPassword, user.password);
        if (!isMatch)
            return res.status(400).json({ error: 'Current password is incorrect' });
        const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
        user.password = hashedPassword;
        yield user.save();
        res.json({ message: 'Password changed successfully' });
    }
    catch (_a) {
        res.status(500).json({ error: 'Error changing password' });
    }
});
exports.changePassword = changePassword;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return res.status(400).json({ error: 'No token provided' });
    }
    try {
        // Add the token to the in-memory blacklist
        revokedTokens.add(token);
        logger_1.default.info(`User logged out. Token revoked: ${token}`);
        res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        logger_1.default.error(`Error during logout: ${error}`);
        utils_1.ErrorHandler.handle(new utils_1.HttpError(500, 'Error during logout', 'InternalServerError'), res);
    }
});
exports.logout = logout;
// Middleware to check if a token is revoked
const isTokenRevoked = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (token && revokedTokens.has(token)) {
        utils_1.ErrorHandler.handle(new utils_1.HttpError(401, 'Token revoked', 'UnauthenticatedError'), res);
        return;
    }
    next();
};
exports.isTokenRevoked = isTokenRevoked;
