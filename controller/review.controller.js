import asyncHandler from "express-async-handler";
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
 * @desc create Review
 * @route /api/reviews
 * @method POST
 * @access protected (user)
 */
const createReview = asyncHandler(async (req, res) => {
  console.log("Received request body:", req.body);
  const { course, user, rating, comment } = req.body;
  if (!course || !user || !rating) {
    return res
      .status(400)
      .json({ message: "Course, user, and rating are required." });
  }
  let review = new reviewModel({
    course,
    user,
    rating,
    comment,
  });

  const result = await review.save();

  res.status(201).json({ message: "success", data: result });
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
};
