import express from "express";

import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
} from "../controller/coupon.controller.js";

import { validation } from "../middleware/validation.js";
import { validateCoupon } from "../validation/coupon.schema.js";

const couponRouter = express.Router();

couponRouter
  .route("/")
  .post(validation(validateCoupon), createCoupon)
  .get(getAllCoupons);
couponRouter
  .route("/:id")
  .get(getCoupon)
  .delete(deleteCoupon)
  .put(validation(validateCoupon), updateCoupon);

export default couponRouter;
