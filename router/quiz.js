import express from 'express';

import {createQuiz,updateQuiz,getQuizById,getAllQuizzes,deleteQuiz} from "../controller/quiz.controller.js"



let  router = express.Router(); 

router.route("/")
    .get(getAllQuizzes).post(createQuiz); 

router.route("/:id")
    .get(getQuizById)
    .put(updateQuiz)
    .delete(deleteQuiz)

export default router