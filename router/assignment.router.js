import express from "express";

import {
  createAssignment,
  deleteAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
} from "../controller/assignment.controller.js";

import { validation } from "../middleware/validation.js";
import {
  createAssignmentSchema,
  updatingAssignmetSchema,
} from "../validation/assignments.schema.js";

let router = express.Router();

router
  .route("/")
  .get(getAllAssignments)
  .post(validation(createAssignmentSchema), createAssignment);

router
  .route("/:id")
  .get(getAssignmentById)
  .put(validation(updatingAssignmetSchema), updateAssignment)
  .delete(deleteAssignment);

export default router;
