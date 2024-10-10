import Joi from "joi";


export const createTopicSchema = Joi.object({
    name: Joi.string().min(2).max(25).required(),
})
export const updateTopicSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
    name: Joi.string().min(2).max(25),
});