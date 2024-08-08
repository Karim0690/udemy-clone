import express from 'express';
import {
    getAllReview,
    getReviewById,
    createReview,
    updateReviewById,
    deleteReviewById
} from "../controller/review.controller.js"

let  router = express.Router(); 

router.route("/")
    .get(getAllReview).post(createReview); 

router.route("/:id")
    .get(getReviewById)
    .put(updateReviewById)
    .delete(deleteReviewById)

export default router