import cartModel from "../Database/Models/cart.model.js";
import { cousreModel } from "../Database/Models/course.model.js";
import couponModel from "../Database/Models/coupon.model.js";
import asyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";

function calcTotalPrice(cart) {
  let totalPrice = 0;
  cart.items.forEach((elem) => {
    totalPrice += elem.price;
  });
  cart.totalPrice = totalPrice;
}

function calcTotalAfterDis(cart) {
  if (cart.discount > 0) {
    cart.totalPriceAfterDiscount = (
      cart.totalPrice -
      (cart.totalPrice * cart.discount) / 100
    ).toFixed(2);
  } else {
    cart.totalPriceAfterDiscount = cart.totalPrice;
  }
}

const addCourseToCart = asyncHandler(async (req, res, next) => {
  let course = await cousreModel.findById(req.body.course);
  if (!course) return next(new AppError("Course not found", 404));

  req.body.price = course.price;

  let cart = await cartModel.findOne({ user: req.user._id });
  if (!cart) {
    let result = new cartModel({
      user: req.user._id,
      items: [req.body],
    });
    calcTotalPrice(result);
    await result.save();
    return res.status(201).json({ message: "success", result });
  }
  let item = cart.items.find((elem) => elem.course.equals(req.body.course));
  if (item) {
    return next(new AppError("Course already added to cart", 400));
  }
  cart.items.push(req.body);
  calcTotalPrice(cart);
  if (cart.discountValue) {
    calcTotalAfterDis(cart);
  }
  await cart.save();
  res.status(201).json({ message: "success", cart });
});

const removCourseFromCart = asyncHandler(async (req, res, next) => {
  let result = await cartModel.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { items: { _id: req.params.id } } },
    { new: true }
  );
  console.log(result.items);

  if (!result) {
    return next(new AppError(`Course not found in cart`, 404));
  }
  calcTotalPrice(result);

  if (result.discountValue) {
    calcTotalAfterDis(result);
  }

  await result.save();

  res.status(200).json({ message: "success", data: result });
});

const applyCoupon = asyncHandler(async (req, res, next) => {
  let coupon = await couponModel.findOne({
    code: req.body.code,
  });
  let cart = await cartModel.findOne({ user: req.user._id });
  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }
  cart.discount = coupon.discountValue;
  calcTotalPrice(cart);
  calcTotalAfterDis(cart);
  await cart.save();
  res.status(200).json({ message: "success", cart });
});

const getLoggedUserCart = asyncHandler(async (req, res) => {
  let cart = await cartModel
    .findOne({ user: req.user._id })
    .populate("items.course", "_id title price instructor")
    .populate({
      path: "items",
      populate: {
        path: "course",
        select: "title price instructor rating courseImage",

        populate: {
          path: "instructor",
          select: "name",
        },
      },
    });
  res.status(200).json({ message: "success", cart });
});

const removeCoupon = asyncHandler(async (req, res) => {
  let cart = await cartModel.findOne({ user: req.user._id });
  cart.discount = 0;
  cart.totalPriceAfterDiscount = 0;
  calcTotalPrice(cart);
  await cart.save();
  res.status(200).json({ message: "success", cart });
});

export {
  addCourseToCart,
  removCourseFromCart,
  applyCoupon,
  getLoggedUserCart,
  removeCoupon,
};
