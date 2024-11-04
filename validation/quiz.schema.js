import Joi from "joi";

export const validateCreatingQuiz = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  questions: Joi.array().items(Joi.string()).optional(),
});

export const validateUpdateQuiz = Joi.object({
  id: Joi.string().hex().length(24).required(),
  title: Joi.string(),
  title_ar: Joi.string(),
  description: Joi.string().allow(""),
  description_ar: Joi.string().allow(""),
  questions: Joi.array().items(Joi.string()),
});
