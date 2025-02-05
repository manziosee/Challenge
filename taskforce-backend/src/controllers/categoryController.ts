import { Request, Response } from 'express';
import Category from '../models/Category';
import { HttpError, ErrorHandler } from '../utils/http/error-handler';
import logger from '../utils/logger';

export const getCategories = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const categories = await Category.find({ userId });
    logger.info(`Categories fetched for user: ${userId}`);
    res.json(categories);
  } catch (error) {
    logger.error(`Error fetching categories: ${error}`);
    ErrorHandler.handle(new HttpError(500, 'Error fetching categories', 'InternalServerError'), res);
  }
};

export const addCategory = async (req: Request, res: Response) => {
  const { userId, name, subcategories } = req.body;

  try {
    const category = new Category({ userId, name, subcategories });
    await category.save();
    logger.info(`Category added for user: ${userId}`);
    res.status(201).json(category);
  } catch (error) {
    logger.error(`Error adding category: ${error}`);
    ErrorHandler.handle(new HttpError(500, 'Error adding category', 'InternalServerError'), res);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return ErrorHandler.handle(new HttpError(404, 'Category not found', 'NotFoundError'), res);
    }
    logger.info(`Category deleted: ${id}`);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting category: ${error}`);
    ErrorHandler.handle(new HttpError(500, 'Error deleting category', 'InternalServerError'), res);
  }
};

export const updateSubcategory = async (req: Request, res: Response) => {
  const { id, subcategoryIndex } = req.params;
  const { value } = req.body;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return ErrorHandler.handle(new HttpError(404, 'Category not found', 'NotFoundError'), res);
    }

    const index = parseInt(subcategoryIndex, 10); // Parse subcategoryIndex to a number
    if (isNaN(index) || index < 0 || index >= category.subcategories.length) {
      return ErrorHandler.handle(new HttpError(400, 'Invalid subcategory index', 'BadRequestError'), res);
    }

    category.subcategories[index] = value;
    await category.save();

    res.json(category);
  } catch (error) {
    logger.error(`Error updating subcategory: ${error}`);
    ErrorHandler.handle(new HttpError(500, 'Error updating subcategory', 'InternalServerError'), res);
  }
};

export const deleteSubcategory = async (req: Request, res: Response) => {
  const { id, subcategoryIndex } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return ErrorHandler.handle(new HttpError(404, 'Category not found', 'NotFoundError'), res);
    }

    const index = parseInt(subcategoryIndex, 10); // Parse subcategoryIndex to a number
    if (isNaN(index) || index < 0 || index >= category.subcategories.length) {
      return ErrorHandler.handle(new HttpError(400, 'Invalid subcategory index', 'BadRequestError'), res);
    }

    category.subcategories.splice(index, 1); // Use the parsed index
    await category.save();

    res.json(category);
  } catch (error) {
    logger.error(`Error deleting subcategory: ${error}`);
    ErrorHandler.handle(new HttpError(500, 'Error deleting subcategory', 'InternalServerError'), res);
  }
};