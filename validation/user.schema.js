import Joi from "joi";

export const validateCreatingUser = Joi.object({
  name: Joi.string().min(2).max(255).trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(8).required(),
  passwordChangedAt: Joi.date().optional(),
  profilePic: Joi.string().uri().optional(),
  role: Joi.array()
    .items(Joi.string().valid("student", "instructor", "admin"))
    .default(["student"]),
  isActive: Joi.boolean().default(true),
  enrolledCourses: Joi.array().items(Joi.string().hex().length(24)).optional(),
  wishlist: Joi.array().items(Joi.string().hex().length(24)).optional(),
  favorite: Joi.array().items(Joi.string().hex().length(24)).optional(),
  headline: Joi.string().max(255).trim().optional(),
  biography: Joi.string().optional(),
  social: Joi.object({
    website: Joi.string().uri().optional(),
    facebook: Joi.string().uri().optional(),
    linkedin: Joi.string().uri().optional(),
    youtube: Joi.string().uri().optional(),
    twitter: Joi.string().uri().optional(),
  }).optional(),
});

export const validateupdatingUser = Joi.object({
  name: Joi.string().min(2).max(255).trim().optional(),
  email: Joi.string().email().trim().optional(),
  password: Joi.string().min(8).optional(),
  passwordChangedAt: Joi.date().optional(),
  profilePic: Joi.string().uri().optional(),
  role: Joi.array()
    .items(Joi.string().valid("student", "instructor", "admin"))
    .default(["student"]),
  isActive: Joi.boolean().default(true),
  enrolledCourses: Joi.array().items(Joi.string().hex().length(24)).optional(),
  wishlist: Joi.array().items(Joi.string().hex().length(24)).optional(),
  favorite: Joi.array().items(Joi.string().hex().length(24)).optional(),
  headline: Joi.string().max(255).trim().optional(),
  biography: Joi.string().optional(),
  social: Joi.object({
    website: Joi.string().uri().optional(),
    facebook: Joi.string().uri().optional(),
    linkedin: Joi.string().uri().optional(),
    youtube: Joi.string().uri().optional(),
    twitter: Joi.string().uri().optional(),
  }).optional(),
});
