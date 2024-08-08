import express from 'express';
import {
    getAllReview,
    getReviewById,
    createReview,
    updateReviewById,
    deleteReviewById
} from "../controller/review.controller.js"

export default router =express.Router(); 

router.route("/")
    .get(getAllReview).post(createReview); 

router.route("/:id")
    .get(getReviewById)
    .put(updateReviewById)
    .delete(deleteReviewById)

    