import Order from "../Database/Models/order.model.js";
import cartModel from "../Database/Models/cart.model.js";
import AppError from "../utils/appError.js";
import asyncHandler from "express-async-handler";

export const createOrder = asyncHandler(async (req, res,next) => {
  const cart = await cartModel.findById(req.params.cartId);
  if (!cart) return next(new AppError("Cart not found", 404));

  const totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;

  const order = new Order({
    user: req.user._id,
    cartItems: cart.items,
    country: req.body.country,
    paymentMethod: req.body.paymentMethod,
    summary: {
      originalPrice: cart.totalPrice,
      discount: cart.discount,
      total: totalOrderPrice,
    },
  });

  await order.save();
  await cartModel.findByIdAndDelete(req.params.cartId);
  res.status(201).json({
    message: "success",
    data: order,
  });
});

export const getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "_id name email role")
    .populate("cartItems.course", "_id title description instructor price");

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
