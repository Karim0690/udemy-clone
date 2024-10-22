import express from "express";

import {
  createCourseContent,
  deleteCourseContent,
  getAllCourseContents,
  getCourseContentById,
  updateCourseContent,
  addSectionToCourse,
  addLectureToSection,
  deleteSectionItem,
  addQuizToSection,
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

router.post("/:courseId", addSectionToCourse);
router.post("/:sectionId/lecture", addLectureToSection);
router.post("/:sectionId/quiz", addQuizToSection);
router.delete("/:sectionId/items/:itemId", deleteSectionItem);
export default router;
