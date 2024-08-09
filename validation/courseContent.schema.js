import Joi from "joi";

export const CreatingCourseContent = Joi.object({
  title: Joi.string().required(),
  lectures: Joi.array().items(Joi.string()),
  quizzes: Joi.array().items(Joi.string()),
  assignments: Joi.array().items(Joi.string()),
});

export const UpdatingCourseContent = Joi.object({
  title: Joi.string(),
  lectures: Joi.array().items(Joi.string()),
  quizzes: Joi.array().items(Joi.string()),
  assignments: Joi.array().items(Joi.string()),
});
