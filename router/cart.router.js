import express from "express";
import * as cartController from "../controller/cart.controller.js";
import { protectedRoutes } from "../middleware/authourtization.js";
import { validationCart } from "../validation/cart.schema.js";
import { validation } from "../middleware/validation.js";
const cartRouter = express.Router();

cartRouter
  .route("/")
  .post(
    protectedRoutes,
    validation(validationCart),
    cartController.addCourseToCart
  )
  .put(protectedRoutes, cartController.applyCoupon)
  .get(protectedRoutes, cartController.getLoggedUserCart);

cartRouter
  .route("/:id")
  .delete(protectedRoutes, cartController.removCourseFromCart);

export default cartRouter;
