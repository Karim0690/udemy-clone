import Joi from "joi";

export const createCourseSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  description: Joi.string().min(50).max(500).required(),
  instructor: Joi.string().hex().length(24).required(),
  price: Joi.number(),
  category: Joi.string().hex().length(24).required(),
  subcategory: Joi.string().hex().length(24).required(),
  enrollments: Joi.number(),
});

export const updateCourseSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  description: Joi.string().min(50).max(500).required(),
  price: Joi.number(),
  category: Joi.string().hex().length(24).required(),
  subcategory: Joi.string().hex().length(24).required(),
  id:Joi.string().hex().length(24).required(),
});
