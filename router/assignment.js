import express from 'express';

import {createAssignment,deleteAssignment,getAllAssignments,getAssignmentById,updateAssignment} from "../controller/assignment.controller.js"


let  router = express.Router(); 

router.route("/")
    .get(getAllAssignments).post(createAssignment); 

router.route("/:id")
    .get(getAssignmentById)
    .put(updateAssignment)
    .delete(deleteAssignment)

export default router