import Joi from "joi";

export const validateCreatingLecture = Joi.object({
  title: Joi.string().required(),
  content: Joi.string(),
  duration: Joi.number().min(0),
  resources: Joi.array().items(Joi.string()),
});

export const validateUpdateLecture = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
  duration: Joi.number().min(0),
  resources: Joi.array().items(Joi.string()),
});
