import express from "express";

import {
  createLecture,
  deleteLecture,
  getAllLectures,
  getLectureById,
  updateLecture,
} from "../controller/lecture.controller.js";
import {
  validateCreatingLecture,
  validateUpdateLecture,
} from "../validation/lecture.schema.js";

import { validation } from "../middleware/validation.js";

let router = express.Router();

router
  .route("/")
  .get(getAllLectures)
  .post(validation(validateCreatingLecture), createLecture);

router
  .route("/:id")
  .get(getLectureById)
  .put(validation(validateUpdateLecture), updateLecture)
  .delete(deleteLecture);

export default router;
