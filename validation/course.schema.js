import Joi from "joi";

export const createCourseSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  description: Joi.string().min(50).max(500).required(),
  instructor: Joi.string().hex().length(24).required(),
  price: Joi.number(),
  category: Joi.string().hex().length(24).required(),
  subcategory: Joi.string().hex().length(24).required(),
  enrollments: Joi.number(),
});

export const updateCourseSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  title: Joi.string().min(3).max(60).optional(),
  subtitle: Joi.string().max(120).allow("").optional(),
  description: Joi.string().min(50).max(500).allow("").optional(),
  price: Joi.string().min(0).optional(),
  category: Joi.string().hex().length(24),
  subcategory: Joi.string().hex().length(24),
  sections: Joi.array()
    .items(Joi.string().hex().length(24).required())
    .optional(),
  learningObjective: Joi.array().items(Joi.string()).optional(),
  requirements: Joi.array().items(Joi.string()).optional(),
  courseFor: Joi.array().items(Joi.string()).optional(),
  language: Joi.string().allow(""),
  topics: Joi.array().items(Joi.string().hex().length(24)).optional(),
  courseImage: Joi.string().allow("").optional(),
  promotionalVideo: Joi.string().allow("").optional(),
  courseStructure: Joi.boolean().optional(),
  setupAndTest: Joi.boolean().optional(),
  filmAndEdite: Joi.boolean().optional(),
  captions: Joi.boolean().optional(),
  accessibility: Joi.boolean().optional(),
  promotions: Joi.boolean().optional(),
  progress: Joi.number().min(0).max(100).optional(),
  level: Joi.string()
    .valid("Beginner Level", "Intermediate Level", "Expert Level", "All Levels")
    .optional(),
  welcomeMessage: Joi.string().min(3).max(1000).optional(),
  congratesMessage: Joi.string().min(3).max(1000).optional(),
});
