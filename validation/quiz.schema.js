import Joi from "joi";

export const validateCreatingQuiz = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  questions: Joi.array().items(Joi.string()).optional(),
});

export const validateUpdateQuiz = Joi.object({
  id: Joi.string().hex().length(24).required(),
  title: Joi.string(),
  description: Joi.string(),
  questions: Joi.array().items(Joi.string()),
});
