import express from 'express';

import {createLecture,deleteLecture,getAllLectures,getLectureById,updateLecture} from "../controller/lecture.controller.js"


let  router = express.Router(); 

router.route("/")
    .get(getAllLectures).post(createLecture); 

router.route("/:id")
    .get(getLectureById)
    .put(updateLecture)
    .delete(deleteLecture)

export default router