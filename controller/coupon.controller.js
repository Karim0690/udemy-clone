import couponModel from "../Database/Models/coupon.model.js";
import asyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";

const createCoupon = asyncHandler(async (req, res, next) => {
  let result = new couponModel(req.body);
  await result.save();
  res.status(201).json({ message: "success", result });
});

const getAllCoupons = asyncHandler(async (req, res) => {
  let result = await couponModel.find();
  res.status(200).json({ message: "success", data: result });
});

const getCoupon = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let result = await couponModel.findById(id);
  !result && next(new AppError(`Coupon not found`, 404));
  result && res.status(200).json({ message: "success", data: result });
});

const deleteCoupon = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let result = await couponModel.findByIdAndDelete(id);
  !result && next(new AppError(`Coupon not found`, 404));
  result && res.status(200).json({ message: "success", result });
});

const updateCoupon = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let result = await couponModel.findOneAndUpdate(id, req.body, { new: true });
  !result && next(new AppError(`Coupon not found`, 404));
  result && res.status(200).json({ message: "success", result });
});

export { createCoupon, getAllCoupons, getCoupon, deleteCoupon, updateCoupon };
