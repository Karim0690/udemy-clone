import joi from "joi";

export const validateCreatingReview = joi.object({
  course: joi.string().hex().length(24).required(),
  user: joi.string().hex().length(24).required(),
  rating: joi.number().min(1).max(5).required(),
  comment: joi.string().trim(),
});

export const validateUpdateReview = joi.object({
  rating: joi.number().min(1).max(5),
  comment: joi.string(),
});
