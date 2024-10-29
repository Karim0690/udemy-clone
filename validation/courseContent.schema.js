import Joi from "joi";

export const CreatingCourseContent = Joi.object({
  title: Joi.string().min(3).max(80).required(),
  objective: Joi.string().max(200),
  items: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().valid("lecture", "quiz").required(),
        item: Joi.string().required(),
      })
    )
    .optional(),
});

export const UpdatingCourseContent = Joi.object({
  id: Joi.string().hex().length(24).required(),
  title: Joi.string().min(3).max(80),
  objective: Joi.string().max(200),
  items: Joi.array()
  // .items(
  //   Joi.object({
  //     type: Joi.string().valid("lecture", "quiz"),
  //     item: Joi.string(),
  //   })
  // ),
});
