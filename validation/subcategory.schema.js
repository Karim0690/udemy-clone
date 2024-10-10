import Joi from "joi";


export const createSubcategorySchema = Joi.object({
  name: Joi.string().min(2).max(24).required(),
  category: Joi.string().hex().length(24).required(),
  topics: Joi.array().items(Joi.string().hex().length(24)).optional(),
});



export const updateSubcategorySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string().min(2).max(24),
  topics: Joi.array().items(Joi.string().hex().length(24)).optional(),
});
