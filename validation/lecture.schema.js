import Joi from "joi";

export const validateCreatingLecture = Joi.object({
  title: Joi.string().min(3).required().trim(),
  content: Joi.string().optional().trim(),
  duration: Joi.number().min(0).optional(),
  resource: Joi.string().optional(),
});

export const validateUpdateLecture = Joi.object({
  id: Joi.string().hex().length(24).required(),
  courseId: Joi.string().hex().length(24).required(),
  title: Joi.string().min(3).optional().trim(),
  content: Joi.string().optional().trim(),
  duration: Joi.number().optional(),
  resource: Joi.string().optional(),
  resourceTitle: Joi.string().optional(),
  description: Joi.string().optional(),
});
