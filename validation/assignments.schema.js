import Joi from "joi";

export const createAssignmentSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  deadline: Joi.date(),
  instructions: Joi.string(),
});

export const updatingAssignmetSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  deadline: Joi.date(),
  instructions: Joi.string(),
});
