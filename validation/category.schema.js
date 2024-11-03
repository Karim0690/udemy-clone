import Joi from "joi";

// Create Category Schema
export const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(40).required(),
  nameAr: Joi.string().min(2).max(40).required(),
  subcategories: Joi.array().items(Joi.string().hex().length(24)).optional(), // Adding subcategories as an optional array
});

// Update Category Schema
export const updateCategorySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string().min(2).max(40).optional(),
  nameAr: Joi.string().min(2).max(40).optional(),
  subcategories: Joi.array().items(Joi.string().hex().length(24)).optional(), // Allow updating subcategories as well
});
