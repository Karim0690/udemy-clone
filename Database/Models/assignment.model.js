import mongoose from 'mongoose';
// import Joi from 'joi';


const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date },
  instructions: { type: String }
}, { timestamps: true });

const Assignment = mongoose.model('Assignment', assignmentSchema);


// const validateCreatingAssignment = (obj) => {
//   const schema = Joi.object({
//     title: Joi.string().required(),
//     description: Joi.string(),
//     deadline: Joi.date(),
//     instructions: Joi.string()
//   });
//   return schema.validate(obj);
// };


// const validateUpdateAssignment = (obj) => {
//   const schema = Joi.object({
//     title: Joi.string(),
//     description: Joi.string(),
//     deadline: Joi.date(),
//     instructions: Joi.string()
//   });
//   return schema.validate(obj);
// };

export {
  Assignment,
  // validateCreatingAssignment,
  // validateUpdateAssignment
};
