import express from "express";
import * as courseController from "../controller/course.controller.js";

const courseRouter = express.Router();

courseRouter
  .route("/")
  .get(courseController.getCourses)
  .post(courseController.createCourse);

courseRouter
  .route("/:id")
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse);

export default courseRouter

// رائعععععععععع