
import mongoose from 'mongoose';
import Joi from 'joi';

const lectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  duration: { type: Number }, // in minutes
  resources: [{ type: String }] // e.g., URLs to videos or documents
}, { timestamps: true });

const Lecture = mongoose.model('Lecture', lectureSchema);

const validateCreatingLecture = (obj) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string(),
    duration: Joi.number().min(0),
    resources: Joi.array().items(Joi.string())
  });
  return schema.validate(obj);
};

const validateUpdateLecture = (obj) => {
  const schema = Joi.object({
    title: Joi.string(),
    content: Joi.string(),
    duration: Joi.number().min(0),
    resources: Joi.array().items(Joi.string())
  });
  return schema.validate(obj);
};

export {
  Lecture,
  validateCreatingLecture,
  validateUpdateLecture
};
