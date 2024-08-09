import Joi from "joi";

export const validateCoupon = Joi.object({
  code: Joi.string().required(),
  discountValue: Joi.number().positive().required(),
  expiryDate: Joi.date().greater("now").required(),
});
