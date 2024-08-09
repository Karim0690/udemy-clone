import mongoose from "mongoose";
// import joi from "joi"
const reviewSchema = new mongoose.Schema({
  course:{
    type: mongoose.Types.ObjectId,
    ref: 'Course',// NOTE : need to be update when we finished the collection 
    required:true
}  , 
user:{
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required:true
} ,
rating:{
    type:Number,
    min:1,
    max:5,
    required:true
},
comment:{
    type:String,
}



},{timestamps:true})

// function validateCreatingReview(obj)
// {
//     const schema = joi.object({
//         course: joi.string().required(),
//         user: joi.string().required(),
//         rating:joi.number().min(1).max(5).required(),
//         comment:joi.string().trim()
//     })
//     return schema.validate(obj);
// }
// function validateUpdateReview(obj)
// {
//     const schema = joi.object({
//         rating:joi.number().min(1).max(5),
//         comment:joi.string()
//     })
//     return schema.validate(obj); 
// }

let  reviewModel = mongoose.model("Review",reviewSchema); 
export {
    // validateCreatingReview,
    // validateUpdateReview,
    reviewModel
}