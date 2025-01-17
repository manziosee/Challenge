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
exports.deleteSubcategory = exports.updateSubcategory = exports.deleteCategory = exports.addCategory = exports.getCategories = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const error_handler_1 = require("../utils/http/error-handler");
const logger_1 = __importDefault(require("../utils/logger"));
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const categories = yield Category_1.default.find({ userId });
        logger_1.default.info(`Categories fetched for user: ${userId}`);
        res.json(categories);
    }
    catch (error) {
        logger_1.default.error(`Error fetching categories: ${error}`);
        error_handler_1.ErrorHandler.handle(new error_handler_1.HttpError(500, 'Error fetching categories', 'InternalServerError'), res);
    }
});
exports.getCategories = getCategories;
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, name, subcategories } = req.body;
    try {
        const category = new Category_1.default({ userId, name, subcategories });
        yield category.save();
        logger_1.default.info(`Category added for user: ${userId}`);
        res.status(201).json(category);
    }
    catch (error) {
        logger_1.default.error(`Error adding category: ${error}`);
        error_handler_1.ErrorHandler.handle(new error_handler_1.HttpError(500, 'Error adding category', 'InternalServerError'), res);
    }
});
exports.addCategory = addCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const category = yield Category_1.default.findByIdAndDelete(id);
        if (!category) {
            return error_handler_1.ErrorHandler.handle(new error_handler_1.HttpError(404, 'Category not found', 'NotFoundError'), res);
        }
        logger_1.default.info(`Category deleted: ${id}`);
        res.json({ message: 'Category deleted successfully' });
    }
    catch (error) {
        logger_1.default.error(`Error deleting category: ${error}`);
        error_handler_1.ErrorHandler.handle(new error_handler_1.HttpError(500, 'Error deleting category', 'InternalServerError'), res);
    }
});
exports.deleteCategory = deleteCategory;
const updateSubcategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, subcategoryIndex } = req.params;
    const { value } = req.body;
    try {
        const category = yield Category_1.default.findById(id);
        if (!category) {
            return error_handler_1.ErrorHandler.handle(new error_handler_1.HttpError(404, 'Category not found', 'NotFoundError'), res);
        }
        const index = parseInt(subcategoryIndex, 10); // Parse subcategoryIndex to a number
        if (isNaN(index) || index < 0 || index >= category.subcategories.length) {
            return error_handler_1.ErrorHandler.handle(new error_handler_1.HttpError(400, 'Invalid subcategory index', 'BadRequestError'), res);
        }
        category.subcategories[index] = value;
        yield category.save();
        res.json(category);
    }
    catch (error) {
        logger_1.default.error(`Error updating subcategory: ${error}`);
        error_handler_1.ErrorHandler.handle(new error_handler_1.HttpError(500, 'Error updating subcategory', 'InternalServerError'), res);
    }
});
exports.updateSubcategory = updateSubcategory;
const deleteSubcategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, subcategoryIndex } = req.params;
    try {
        const category = yield Category_1.default.findById(id);
        if (!category) {
            return error_handler_1.ErrorHandler.handle(new error_handler_1.HttpError(404, 'Category not found', 'NotFoundError'), res);
        }
        const index = parseInt(subcategoryIndex, 10); // Parse subcategoryIndex to a number
        if (isNaN(index) || index < 0 || index >= category.subcategories.length) {
            return error_handler_1.ErrorHandler.handle(new error_handler_1.HttpError(400, 'Invalid subcategory index', 'BadRequestError'), res);
        }
        category.subcategories.splice(index, 1); // Use the parsed index
        yield category.save();
        res.json(category);
    }
    catch (error) {
        logger_1.default.error(`Error deleting subcategory: ${error}`);
        error_handler_1.ErrorHandler.handle(new error_handler_1.HttpError(500, 'Error deleting subcategory', 'InternalServerError'), res);
    }
});
exports.deleteSubcategory = deleteSubcategory;
