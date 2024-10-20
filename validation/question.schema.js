import Joi from "joi";

export const validateCreatingQuestion = Joi.object({
  quizId: Joi.string().hex().length(24).required(),
  question: Joi.string().required(),
  answers: Joi.array()
    .items(
      Joi.object({
        answer: Joi.string().required(),
        explanation: Joi.string().allow("").optional(),
        isCorrect: Joi.boolean().default(false),
      })
    )
    .min(1)
    .required(),
});

export const validateUpdateQuestion = Joi.object({
  questionText: Joi.string(),
  options: Joi.array().items(Joi.string()),
  correctAnswer: Joi.string(),
});
