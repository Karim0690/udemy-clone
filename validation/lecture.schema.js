import Joi from "joi";

export const validateCreatingLecture = Joi.object({
  title: Joi.string().min(3).required().trim(),
  content: Joi.string().optional().trim(),
  duration: Joi.number().min(0).optional(),
  resource: Joi.string().optional(),
});

export const validateUpdateLecture = Joi.object({
  title: Joi.string().min(3).optional().trim(),
  content: Joi.string().optional().trim(),
  duration: Joi.number().min(0).optional(),
  resource: Joi.string().optional(),
});
