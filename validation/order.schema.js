import Joi from "joi";

export const validateCreatingOrder = Joi.object({
  // user: Joi.string().length(24).hex().required(),
  // cartItems: Joi.array()
  //   .items(
  //     Joi.object({
  //       course: Joi.string().hex().length(24).required(),
  //       price: Joi.number().positive().required(),
  //     })
  //   )
  //   .min(1)
  //   .required(),
  country: Joi.string().required(),
  paymentMethod: Joi.string().valid("Credit/Debit Card", "PayPal").required(),
  cartId: Joi.string().length(24).hex().required(),
  // summary: Joi.object({
  //   originalPrice: Joi.number().positive().required(),
  //   discount: Joi.number().min(0).required(),
  //   total: Joi.number().positive().required(),
  // }).required(),
});
