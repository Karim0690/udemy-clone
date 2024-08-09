import express from "express";

import {
  createQuiz,
  updateQuiz,
  getQuizById,
  getAllQuizzes,
  deleteQuiz,
} from "../controller/quiz.controller.js";

import {
  validateCreatingQuiz,
  validateUpdateQuiz,
} from "../validation/quiz.schema.js";

import { validation } from "../middleware/validation.js";

let router = express.Router();

router
  .route("/")
  .get(getAllQuizzes)
  .post(validation(validateCreatingQuiz), createQuiz);

router
  .route("/:id")
  .get(getQuizById)
  .put(validation(validateUpdateQuiz), updateQuiz)
  .delete(deleteQuiz);

export default router;
