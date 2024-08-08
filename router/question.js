import express from 'express';

import {createQuestion , updateQuestion ,deleteQuestion,getAllQuestions,getQuestionById} from "../controller/question.controller.js"


let  router = express.Router(); 

router.route("/")
    .get(getAllQuestions).post(createQuestion); 

router.route("/:id")
    .get(getQuestionById)
    .put(updateQuestion)
    .delete(deleteQuestion)

export default router