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

import { validation } from "../middleware/validation.js";

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(
    protectedRoutes,
    restrictedTo("admin"),
    validation(createCategorySchema),
    categoryController.createCategory
  )
  .get(categoryController.getAllCategory);

categoryRouter
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(validation(updateCategorySchema), categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

categoryRouter
  .route("/:categoryid/subcategories")
  .get(categoryController.getCategorySubCategories);

categoryRouter.route("/slug/:slug").get(categoryController.getCategoryBySlug);

export default categoryRouter;
