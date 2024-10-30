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
  relatedLecture: Joi.string().hex().length(24).optional(),
});

export const validateUpdateQuestion = Joi.object({
  qid: Joi.string().hex().length(24).required(),
  id: Joi.string().hex().length(24).required(),
  questionText: Joi.string(),
  options: Joi.array().items(Joi.string()),
  correctAnswer: Joi.string(),
  relatedLecture: Joi.string().hex().length(24).optional(),
});
