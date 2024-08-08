import express from 'express';

import { createCourseContent, deleteCourseContent, getAllCourseContents, getCourseContentById, updateCourseContent } from "../controller/courseContent.controller.js"


let router = express.Router();

router.route("/")
    .get(getAllCourseContents).post(createCourseContent);

router.route("/:id")
    .get(getCourseContentById)
    .put(updateCourseContent)
    .delete(deleteCourseContent)

export default router