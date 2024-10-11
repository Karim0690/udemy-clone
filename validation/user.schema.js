import Joi from "joi";

export const validateCreatingUser = Joi.object({
  name: Joi.string().min(2).max(255).trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(8).required(),
  passwordChangedAt: Joi.date().optional(),
  profilePic: Joi.string().uri().allow("").optional(),
  role: Joi.array()
    .items(Joi.string().valid("student", "instructor", "admin"))
    .default(["student"]),
  isActive: Joi.boolean().default(true),
  enrolledCourses: Joi.array().items(Joi.string().hex().length(24)).optional(),
  wishlist: Joi.array().items(Joi.string().hex().length(24)).optional(),
  favorite: Joi.array()
    .items(Joi.string().hex().length(24))
    .allow("")
    .optional(),
  headline: Joi.string().max(255).trim().allow("").optional(),
  biography: Joi.string().allow("").optional(),
  social: Joi.object({
    website: Joi.string().uri().allow("").optional(),
    facebook: Joi.string().uri().allow("").optional(),
    linkedin: Joi.string().uri().allow("").optional(),
    youtube: Joi.string().uri().allow("").optional(),
    twitter: Joi.string().uri().allow("").optional(),
  }).optional(),
});

export const validateUpdatingUser = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string().min(2).max(255).trim().optional(),
  email: Joi.string().email().trim().optional(),
  password: Joi.string().min(8).optional(),
  passwordChangedAt: Joi.date().optional(),
  profilePic: Joi.string().uri().allow("").optional(),
  role: Joi.array()
    .items(Joi.string().valid("student", "instructor", "admin"))
    .default(["student"]),
  isActive: Joi.boolean().default(true),
  enrolledCourses: Joi.array().items(Joi.string().hex().length(24)).optional(),
  wishlist: Joi.array().items(Joi.string().hex().length(24)).optional(),
  favorite: Joi.array()
    .items(Joi.string().hex().length(24))
    .allow("")
    .optional(),
  headline: Joi.string().max(255).trim().allow("").optional(),
  biography: Joi.string().allow("").optional(),
  social: Joi.object({
    website: Joi.string().allow("").optional(),
    facebook: Joi.string().allow("").optional(),
    linkedin: Joi.string().allow("").optional(),
    youtube: Joi.string().allow("").optional(),
    twitter: Joi.string().allow("").optional(),
  }).optional(),
});
