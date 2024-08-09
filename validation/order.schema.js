import Joi from "joi";

export const validateCreatingOrder = Joi.object({
  user: Joi.string().hex().length(24).required(),
  cartItems: Joi.array()
    .items(
      Joi.object({
        course: Joi.string().hex().length(24).required(),
        price: Joi.number().positive().required(),
      })
    )
    .min(1)
    .required(),
  country: Joi.string().required(),
});
