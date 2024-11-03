import express from "express";
import * as cartController from "../controller/cart.controller.js";
import { protectedRoutes } from "../middleware/authourtization.js";
const cartRouter = express.Router();

cartRouter
  .route("/")
  .post(protectedRoutes, cartController.addCourseToCart)
  .put(protectedRoutes, cartController.applyCoupon)
  .get(protectedRoutes, cartController.getLoggedUserCart)
  .patch(protectedRoutes, cartController.removeCoupon);

cartRouter
  .route("/:id")
  .delete(protectedRoutes, cartController.removCourseFromCart);

export default cartRouter;
