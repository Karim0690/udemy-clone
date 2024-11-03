import Joi from "joi";

export const createCourseSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  instructor: Joi.string().hex().length(24).required(),
  category: Joi.string().hex().length(24).required(),
});

export const updateCourseSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  title: Joi.string().min(5).max(100),
  subtitle: Joi.string().min(7),
  instructor: Joi.string().hex().length(24).optional(),
  description: Joi.string().min(500),
  price: Joi.number(),
  instructionsLevel: Joi.string().valid(
    "Beginner Level",
    "Intermediate Level",
    "Expert Level",
    "All Levels"
  ),
  courseImage: Joi.string().allow("").optional(), // Allow empty string
  promotionalVideo: Joi.string().allow("").optional(), // Allow empty string
  bestSaller: Joi.boolean(),
  highestRated: Joi.boolean(),
  category: Joi.string().hex().length(24),
  subcategory: Joi.string().hex().length(24),
  sections: Joi.array(),
  learningObjective: Joi.array().items(Joi.string()).optional(),
  requirements: Joi.array().items(Joi.string()).optional(),
  courseFor: Joi.array().items(Joi.string()).optional(),
  learningObjective_Ar: Joi.array().items(Joi.string()).optional(),
  requirements_Ar: Joi.array().items(Joi.string().allow("")).optional(),
  courseFor_Ar: Joi.array().items(Joi.string().allow("")).optional(),
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
  duration: Joi.number().min(0).optional(),
});
