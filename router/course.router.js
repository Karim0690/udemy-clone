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
  .delete(
    courseController.deleteCourse
  );

<<<<<<< HEAD
=======

>>>>>>> d41aa58ab691162f6c5101af72e518e10d17ca59
  courseRouter
  .route("/courseTitle/:slug")
  .get(courseController.getCourseByTitle)


courseRouter
  .route("/:id/course_sections")
  .get(courseController.findCourseContentByCourseId);

courseRouter
  .route("/:instructorId/instructor")
  .get(courseController.findUserCourses);

courseRouter.route("/:courseId/basics").patch(
  courseController.uploadCourseBasics
);

// courseRouter
//   .route("/imageUpload")
//   .post(
//     uploadFile("courseImage", "Course"),
//     courseController.uploadCourseImage
//   );
// courseRouter
//   .route("/videoUpload")
//   .post(
//     uploadFile("promotionalVideo", "Course"),
//     courseController.uploadCourseVideo
//   );

export default courseRouter;

// رائعععععععععع
