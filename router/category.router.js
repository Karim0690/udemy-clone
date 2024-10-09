import express from "express";
import * as categoryController from "../controller/category.controller.js";
import {
  protectedRoutes,
  restrictedTo,
} from "../middleware/authourtization.js";

import {
  createCategorySchema,
  updateCategorySchema,
} from "../validation/category.schema.js";

import {validation} from "../middleware/validation.js";

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(validation(createCategorySchema), categoryController.createCategory)
  .get(
    categoryController.getAllCategory
  );

categoryRouter
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(validation(updateCategorySchema), categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

export default categoryRouter;
