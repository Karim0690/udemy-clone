import express from "express";
import * as categoryController from "../controller/category.controller.js";
import {
  protectedRoutes,
  restrictedTo,
} from "../middleware/authourtization.js";

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(categoryController.createCategory)
  .get(
    protectedRoutes,
    restrictedTo("instructor"),
    categoryController.getAllCategory
  );

categoryRouter
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

export default categoryRouter;
