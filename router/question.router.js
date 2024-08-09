import express from "express";

import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getAllQuestions,
  getQuestionById,
} from "../controller/question.controller.js";
import {
  validateCreatingQuestion,
  validateUpdateQuestion,
} from "../validation/question.schema.js";

import { validation } from "../middleware/validation.js";

let router = express.Router();

router
  .route("/")
  .get(getAllQuestions)
  .post(validation(validateCreatingQuestion), createQuestion);

router
  .route("/:id")
  .get(getQuestionById)
  .put(validation(validateUpdateQuestion), updateQuestion)
  .delete(deleteQuestion);

export default router;
