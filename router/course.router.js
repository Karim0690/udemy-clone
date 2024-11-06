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
import { uploadFile, uploadManyFile } from "../middleware/fileUpload.js";

const courseRouter = express.Router();

courseRouter.route("/").get(courseController.getCourses).post(
  // protectedRoutes,
  // restrictedTo("instructor"),
  // uploadManyFile(
  //   [
  //     { name: "courseImage", maxCount: 1 },
  //     { name: "promotionalVideo", maxCount: 1 },
  //   ],
  //   "Course"
  // ),
  validation(createCourseSchema),
  courseController.createCourse
);

courseRouter
  .route("/:id")
  .get(courseController.getCourse)
  .patch(validation(updateCourseSchema), courseController.updateCourse)
  .delete(courseController.deleteCourse);

courseRouter.route("/courseTitle/:slug").get(courseController.getCourseByTitle);

courseRouter
  .route("/:id/course_sections")
  .get(courseController.findCourseContentByCourseId);

courseRouter
  .route("/:instructorId/instructor")
  .get(
    protectedRoutes,
    restrictedTo("instructor"),
    courseController.findUserCourses
  );

courseRouter
  .route("/:courseId/basics")
  .patch(courseController.uploadCourseBasics);

courseRouter.route("/public/courses").get(courseController.getPublicCourses);
courseRouter.route("/public/:courseId").patch(courseController.publishCourse);

export default courseRouter;

// رائعععععععععع
