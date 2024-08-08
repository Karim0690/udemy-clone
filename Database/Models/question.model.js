
import mongoose from 'mongoose';
import Joi from 'joi';

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true }
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);

const validateCreatingQuestion = (obj) => {
  const schema = Joi.object({
    questionText: Joi.string().required(),
    options: Joi.array().items(Joi.string()).required(),
    correctAnswer: Joi.string().required()
  });
  return schema.validate(obj);
};

const validateUpdateQuestion = (obj) => {
  const schema = Joi.object({
    questionText: Joi.string(),
    options: Joi.array().items(Joi.string()),
    correctAnswer: Joi.string()
  });
  return schema.validate(obj);
};

export {
  Question,
  validateCreatingQuestion,
  validateUpdateQuestion
};
