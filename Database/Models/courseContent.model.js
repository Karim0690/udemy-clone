import mongoose from 'mongoose';
// import Joi from 'joi';


const courseContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }],
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }]
}, { timestamps: true });

const CourseContent = mongoose.model('CourseContent', courseContentSchema);


// const validateCreatingCourseContent = (obj) => {
//   const schema = Joi.object({
//     title: Joi.string().required(),
//     lectures: Joi.array().items(Joi.string()), 
//     quizzes: Joi.array().items(Joi.string()), 
//     assignments: Joi.array().items(Joi.string())
//   });
//   return schema.validate(obj);
// };


// const validateUpdateCourseContent = (obj) => {
//   const schema = Joi.object({
//     title: Joi.string(),
//     lectures: Joi.array().items(Joi.string()),
//     quizzes: Joi.array().items(Joi.string()), 
//     assignments: Joi.array().items(Joi.string())
//   });
//   return schema.validate(obj);
// };

export {
  CourseContent,
  // validateCreatingCourseContent,
  // validateUpdateCourseContent
};
