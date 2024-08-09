import Order from "../Database/Models/order.model.js";
import AppError from "../utils/appError.js";
import asyncHandler from "express-async-handler";


export const createOrder = asyncHandler(async (req, res) => {
  const { user, cartItems, country, paymentMethod, summary } = req.body;

  const order = new Order({
    user,
    cartItems,
    country,
    paymentMethod,
    summary,
  });

  await order.save();

  res.status(201).json({
    message: "success",
    data: order,
  });
});

export const getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate("user")
    .populate("cartItems.course");

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  res.status(200).json({
    message: "success",
    data: order,
  });
});

export const getOrdersByUser = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.params.userId }).populate(
    "cartItems.course"
  );

  if (!orders || orders.length === 0) {
    return next(new AppError("No orders found for this user", 404));
  }

  res.status(200).json({
    message: "success",
    data: orders,
  });
});
