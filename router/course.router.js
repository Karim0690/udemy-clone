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

courseRouter
  .route("/")
  .get(courseController.getCourses)
  .post(
    protectedRoutes,
    restrictedTo("instructor"),
    uploadManyFile(
      [
        { name: "courseImage", maxCount: 1 },
        { name: "promotionalVideo", maxCount: 1 },
      ],
      "Course"
    ),
    validation(createCourseSchema),
    courseController.createCourse
  );
  
  
  courseRouter
  .route("/:title")
  .get(courseController.getCourse)
  .patch(
    validation(updateCourseSchema),
    courseController.updateCourse
  )
  .delete(
    courseController.deleteCourse
  );

// courseRouter
//   .route("/:id")
//   .get(courseController.getCourse)
//   .patch(
//     validation(updateCourseSchema),
//     courseController.updateCourse
//   )
//   .delete(
//     courseController.deleteCourse
//   );

export default courseRouter;

// رائعععععععععع
