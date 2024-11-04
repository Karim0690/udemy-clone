import bcrypt from "bcrypt";
import { userModel } from "../Database/Models/user.model.js";
import asyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";
// import { validateUpdatingUser } from "../validation/user.schema.js";

const createUser = asyncHandler(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user) return next(new AppError("Email Already Exist", 409));
  let result = new userModel(req.body);
  await result.save();
  res.status(201).json({ message: "success", result });
});

const getAllUsers = asyncHandler(async (req, res) => {
  let users = await userModel.find();
  res.status(200).json({ message: "success", users });
});

const getUser = asyncHandler(async (req, res, next) => {
  let user = await userModel.findById(req.params.id);
  !user && next(new AppError("User not Found", 404));
  user && res.status(200).json({ message: "success", user });
});

const updateUser = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  let user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!user) {
    return next(new AppError("User not Found", 404));
  }
  res.status(200).json({ message: "success", user });
});

const deleteUser = asyncHandler(async (req, res, next) => {
  let user = await userModel.findByIdAndDelete(req.params.id);
  !user && next(new AppError("User not Found", 404));
  user && res.status(200).json({ message: "success" });
});

const changeUserPassword = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return next(
      new AppError("New password and confirm password do not match", 400)
    );
  }

  const user = await userModel.findById(id);
  if (!user) {
    return next(new AppError("User not Found", 404));
  }
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return next(new AppError("Old password is incorrect", 400));
  }
  user.password = newPassword;
  user.passwordChangedAt = Date.now();
  await user.save();
  res.status(200).json({ message: "success" });
});

const updateEmail = asyncHandler(async (req, res, next) => {
  let user = await userModel.findById(req.params.id);
  if (!user) {
    return next(new AppError("User not Found", 404));
  }
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return next(new AppError("Incorrect Password", 400));
  }
  user.email = req.body.email;
  await user.save();
  res.status(200).json({ message: "success" });
});

const closeAccount = asyncHandler(async (req, res, next) => {
  let user = await userModel.findById(req.params.id);
  if (!user) {
    return next(new AppError("User not Found", 404));
  }
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return next(new AppError("Incorrect Password", 400));
  }
  user.isActive = false;
  await user.save();
  res.status(200).json({ message: "success" });
});

const getUserCourses = asyncHandler(async (req, res, next) => {
  let user = await userModel
    .findById(req.params.id)
    .select("enrolledCourses")
    .populate({
      path: "enrolledCourses",
      populate: {
        path: "instructor",
      },
    });
  if (!user) {
    return next(new AppError("User not Found", 404));
  }
  res.status(200).json({ message: "success", user });
});

export {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  changeUserPassword,
  updateEmail,
  closeAccount,
  getUserCourses,
};
