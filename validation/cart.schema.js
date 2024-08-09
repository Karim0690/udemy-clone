import Joi from "joi";

export const validationCart = Joi.object({
  user: Joi.string().length(24).hex().required(),
  items: Joi.array()
    .items(
      Joi.object({
        course: Joi.string().length(24).hex().required(),
        price: Joi.number().positive().required(),
      })
    )
    .required(),
  totalPrice: Joi.number().default(0),
  totalPriceAfterDiscount: Joi.number().default(0),
  discountValue: Joi.number().default(0),
});
