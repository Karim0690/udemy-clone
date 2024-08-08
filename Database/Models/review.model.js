import mongoose, { model } from "mongoose";

const reviewSchema = new mongoose.Schema({
  course:{
    type: mongoose.Types.ObjectId,
    ref: 'course',// NOTE : need to be update when we finished the collection 
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

function validateCreatingReview(obj)
{
    const schema = obj.object({
        course: joi.string().required(),
        user: joi.string().required(),
        rating:joi.number().min(1).max(5).required(),
        comment:joi.String().trim()
    })
    return schema.validate(obj);
}
function validateUpdateReview(obj)
{
    const schema = obj.object({
        rating:joi.number().min(1).max(5),
        comment:joi.string()
    })
    return schema.validate(obj); 
}

export default reviewModel = mongoose.model("Review",reviewSchema); 
export {
    validateCreatingReview,
    validateUpdateReview

}