import Joi from "joi";

export const createSubcategorySchema = Joi.object({
  name: Joi.string().min(2).max(24).required(),
  category: Joi.string().hex().length(24).required(),
});

export const updateSubcategorySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string().min(2).max(24),
  category: Joi.string().hex().length(24).optional(),
});
