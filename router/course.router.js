import express from "express";
import * as courseController from "../controller/course.controller.js";
import {
  createCourseSchema,
  updateCourseSchema,
} from "../validation/course.schema.js";

import { validation } from "../middleware/validation.js";

const courseRouter = express.Router();

courseRouter
  .route("/")
  .get(courseController.getCourses)
  .post(validation(createCourseSchema), courseController.createCourse);

courseRouter
  .route("/:id")
  .get(courseController.getCourse)
  .patch(validation(updateCourseSchema), courseController.updateCourse)
  .delete(courseController.deleteCourse);

export default courseRouter;

// رائعععععععععع
