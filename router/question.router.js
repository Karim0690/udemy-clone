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

router.route("/").get(getAllQuestions);

router
  .route("/:quizId")
  .post(validation(validateCreatingQuestion), createQuestion);

router.route("/:id").get(getQuestionById).delete(deleteQuestion);

router.route("/:qid").put(updateQuestion);
export default router;
