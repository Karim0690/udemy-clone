import asyncHandler from "express-async-handler";
import { cousreModel } from "../Database/Models/course.model.js";

import {
  reviewModel,
  //   validateCreatingReview,
  //   validateUpdateReview,
} from "../Database/Models/review.model.js";
import AppError from "../utils/appError.js";

/**
 * @desc Get All Reviews
 * @route /api/reviews
 * @method GET
 * @access public (user)
 */
const getAllReview = asyncHandler(async (req, res) => {
  let reviews = await reviewModel
    .find()
    .populate({
      path: "user",
      select: "name email",
    })
    .populate({
      path: "course",
      select: "title _id",
    });

  res.status(200).json({ message: "success", data: reviews });
});

/**
 * @desc Get all reviews with comments for a specific course
 * @route GET /api/reviews/:courseId
 * @method GET
 * @access public
 */
const getAllReviewsWithCommentsByCourseId = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  // Check if courseId is provided
  if (!courseId) {
    return res.status(400).json({ message: "Course ID is required." });
  }

  try {
    // Find all reviews for the given course ID that have a non-empty comment
    const reviews = await reviewModel.find({
      course: courseId,
      comment: { $ne: "" }, // Ensures comment is not empty
    }).populate('user', 'name photo'); // Populate the user field with just the name

    res.status(200).json({ message: "success", data: reviews });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});




/**
 * @desc Get Reviews By Id
 * @route /api/reviews/:id
 * @method GET
 * @access protected (user)
 */
const getReviewById = asyncHandler(async (req, res) => {
  let review = await reviewModel
    .findById(req.params.id)
    .populate({
      path: "user",
      select: "name email",
    })
    .populate({
      path: "course",
      select: "title _id",
    });

  res.status(200).json({ message: "success", data: review });
});

/**
 * @desc Create Review
 * @route POST /api/reviews
 * @access protected (user)
 */
const createReview = asyncHandler(async (req, res) => {
  const { course, user, rating, comment } = req.body;

  // Validate required fields
  if (!course || !user || !rating) {
    return res.status(400).json({ message: "Course, user, and rating are required." });
  }
// Create a new review
const review = new reviewModel({
  course,
  user,
  rating: { average: rating, count: 1 }, // Ensure rating is wrapped in the correct structure
  comment,
});

// Save the review
const result = await review.save();

// Fetch all reviews for this course
const reviews = await reviewModel.find({ course });

// Calculate the new average rating without using reduce
let totalPercentage = 0;
for (let i = 0; i < reviews.length; i++) {
  // Convert the rating to a percentage (1-5 scale to 0-100 scale)
  const percentageRating = (reviews[i].rating.average - 1) * 25;
  totalPercentage += percentageRating;
}

// Calculate the average percentage
let averagePercentage = reviews.length > 0 ? totalPercentage / reviews.length : 0;

// Convert the average percentage back to a 1-5 scale
let averageRating = (averagePercentage / 25) + 1;

// Ensure the average rating is between 1 and 5
averageRating = Math.min(Math.max(averageRating, 1), 5);

// Update the course with the new average rating and increment the review count
const updatedCourse = await courseModel.findByIdAndUpdate(
  course,
  {
    $set: { "rating.average": averageRating }, // Update the average rating
    $inc: { "rating.count": 1 },               // Increment the review count
  },
  { new: true }
);

res.status(201).json({ message: "success", data: result, updatedCourse });

});



/**
 * @desc Update Review
 * @route /api/reviews/:id
 * @method PUT
 * @access protected (user)
 */
const updateReviewById = asyncHandler(async (req, res) => {
  //   const { error } = validateUpdateReview(req.body);
  //   if (error) {
  //     return res.status(400).json({ message: error.details[0].message });
  //   }

  const updateReview = await reviewModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        rating: req.body.rating,
        comment: req.body.comment,
      },
    },
    { new: true }
  );

  res.status(200).json({ message: "success", data: updateReview });
});

/**
 * @desc delete Review
 * @route /api/reviews/:id
 * @method DELETE
 * @access protected (user)
 */
const deleteReviewById = asyncHandler(async (req, res, next) => {
  const review = await reviewModel.findById(req.params.id);
  if (review) {
    await reviewModel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "review has been successfully revomed", data: review });
  } else return next(new AppError("review not found !!!", 404));
});

export {
  getAllReview,
  getReviewById,
  createReview,
  updateReviewById,
  deleteReviewById,
  getAllReviewsWithCommentsByCourseId
};
