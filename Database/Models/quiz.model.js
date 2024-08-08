
import mongoose from 'mongoose';
import Joi from 'joi';

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);

const validateCreatingQuiz = (obj) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    questions: Joi.array().items(Joi.string()).optional()
  });
  return schema.validate(obj);
};

const validateUpdateQuiz = (obj) => {
  const schema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    questions: Joi.array().items(Joi.string())
  });
  return schema.validate(obj);
};

export {
  Quiz,
  validateCreatingQuiz,
  validateUpdateQuiz
};
