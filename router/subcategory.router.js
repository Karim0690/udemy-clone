import express from "express";
import * as subcategoryController from "../controller/subcategory.controller.js";
import {
  protectedRoutes,
  restrictedTo,
} from "../middleware/authourtization.js";
import {
  createSubcategorySchema,
  updateSubcategorySchema,
} from "../validation/subcategory.schema.js";

import { validation } from "../middleware/validation.js";

const subcategoryRouter = express.Router();

subcategoryRouter
  .route("/")
  .post(
    protectedRoutes,
    restrictedTo("admin"),
    validation(createSubcategorySchema),
    subcategoryController.createSubcategory
  )
  .get(subcategoryController.getAllSubcategory);

subcategoryRouter
  .route("/:id")
  .get(subcategoryController.getSubcategory)
  .patch(
    validation(updateSubcategorySchema),
    subcategoryController.updateSubcategory
  )
  .delete(subcategoryController.deleteSubcategory);

export default subcategoryRouter;
