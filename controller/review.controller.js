import asyncHandler from 'express-async-handler'
import Review, { validateCreatingReview, validateUpdateReview } from '../Database/Models/review.model'

/**
* @desc Get All Reviews
* @route /api/reviews
* @method GET
* @access public (user) 
*/
const getAllReview = asyncHandler( async(req,res)=>{
    let reviews = await Review.find().populate("user").populate("course");

    res.status(201).json({data:reviews})
    
})
/**
* @desc Get Reviews By Id 
* @route /api/reviews/:id
* @method GET
* @access protected (user) 
*/
const getReviewById = asyncHandler( async(req,res)=>{
    let review = await Review.findById(req.params.id).populate("user").populate("course");

    res.status(201).json({data:review})
    
})

/**
* @desc create Review  
* @route /api/reviews
* @method POST
* @access protected (user) 
*/
const createReview = asyncHandler( async(req,res)=>{
    
    const {error} = validateCreatingReview(req.body)
    if (error){
        return res.status(400).json({message:error.details[0].message});
    }

    let review = new Review({
        course: req.body.course,
        user: req.body.user,
        rating: req.body.rating,
        comment: req.body.comment
    });
    const result = await review.save();

    
    res.status(201).json(result)
    
})

/**
* @desc Update Review  
* @route /api/reviews/:id
* @method PUT
* @access protected (user) 
*/
const updateReviewById = asyncHandler( async(req,res)=>{
    
    const {error} = validateUpdateReview(req.body)
    if (error){
        return res.status(400).json({message:error.details[0].message});
    }

    const updateReview = await Review.findByIdAndUpdate(req.params.id,
        {$set:{
            rating: req.body.rating,
            comment: req.body.comment 
        }},{new:true});
    
    res.status(201).json(updateReview)
    
})

/**
* @desc delete Review  
* @route /api/reviews/:id
* @method DELETE
* @access protected (user) 
*/
const deleteReviewById = asyncHandler( async(req,res)=>{
    
    const review = await Review.find(req.params.id)
    if(review)
    {
        await Review.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"review has been successfully revomed" , data:review});
    }
    else{
        res.status(404).json({ message: "review not found !!!" });
    }
    
})

export {
    getAllReview,
    getReviewById,
    createReview,
    updateReviewById,
    deleteReviewById
}