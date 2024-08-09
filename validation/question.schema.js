import Joi from "joi";

export const validateCreatingQuestion = Joi.object({
  questionText: Joi.string().required(),
  options: Joi.array().items(Joi.string()).required(),
  correctAnswer: Joi.string().required(),
});

export const validateUpdateQuestion = Joi.object({
  questionText: Joi.string(),
  options: Joi.array().items(Joi.string()),
  correctAnswer: Joi.string(),
});
