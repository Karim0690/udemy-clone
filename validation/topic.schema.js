import Joi from "joi";


export const createTopicSchema = Joi.object({
    name: Joi.string().min(2).max(25).required(),
    subcategory:Joi.string().hex().length(24).required(), 
})
export const updateTopicSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
    name: Joi.string().min(2).max(25),
    subcategory: Joi.string().hex().length(24).optional(),  // Optional field
});