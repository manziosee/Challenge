"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = exports.validateTransaction = void 0;
const express_validator_1 = require("express-validator");
exports.validateTransaction = [
    (0, express_validator_1.body)('amount').isNumeric().withMessage('Amount must be a number'),
    (0, express_validator_1.body)('type').isIn(['income', 'expense']).withMessage('Type must be income or expense'),
    (0, express_validator_1.body)('category').notEmpty().withMessage('Category is required'),
    (0, express_validator_1.body)('date').isDate().withMessage('Invalid date'),
];
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
