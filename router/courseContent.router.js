import express from "express";

import {
  createCourseContent,
  deleteCourseContent,
  getAllCourseContents,
  getCourseContentById,
  updateCourseContent,
} from "../controller/courseContent.controller.js";
import {
  CreatingCourseContent,
  UpdatingCourseContent,
} from "../validation/courseContent.schema.js";

import { validation } from "../middleware/validation.js";

let router = express.Router();

router
  .route("/")
  .get(getAllCourseContents)
  .post(validation(CreatingCourseContent), createCourseContent);

router
  .route("/:id")
  .get(getCourseContentById)
  .put(validation(UpdatingCourseContent), updateCourseContent)
  .delete(deleteCourseContent);

export default router;
