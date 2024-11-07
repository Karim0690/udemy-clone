import express from "express";
import {
  getAllReview,
  getReviewById,
  createReview,
  updateReviewById,
  deleteReviewById,
  getAllReviewsWithCommentsByCourseId
} from "../controller/review.controller.js";

import {
  validateCreatingReview,
  validateUpdateReview,
} from "../validation/review.schema.js";

import { validation } from "../middleware/validation.js";

let router = express.Router();

router.route("/")
  .get(getAllReview)
  .post(createReview);

router
  .route("/:id")
  .get(getReviewById)
  .put(validation(validateUpdateReview), updateReviewById)
  .delete(deleteReviewById);

router.route("/courseReview/:courseId").get(getAllReviewsWithCommentsByCourseId)

export default router;
