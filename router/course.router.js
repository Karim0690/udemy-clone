import express from "express";
import * as courseController from "../controller/course.controller.js";
import {
  createCourseSchema,
  updateCourseSchema,
} from "../validation/course.schema.js";

import { validation } from "../middleware/validation.js";
import {
  protectedRoutes,
  restrictedTo,
} from "../middleware/authourtization.js";

const courseRouter = express.Router();

courseRouter
  .route("/")
  .get(courseController.getCourses)
  .post(protectedRoutes,restrictedTo("instructor"),validation(createCourseSchema), courseController.createCourse);
  
courseRouter
  .route("/:id")
  .get(courseController.getCourse)
  .patch(protectedRoutes,restrictedTo("instructor"),validation(updateCourseSchema), courseController.updateCourse)
  .delete(protectedRoutes,restrictedTo("instructor","admin"),courseController.deleteCourse);

export default courseRouter;

// رائعععععععععع
