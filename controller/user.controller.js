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

<<<<<<< HEAD
const verifyPassword = (userPassword, oldPassword) => {
  //   const user = await userModel.findById(id);
  //   if (!user) {
  //     throw new AppError("User not found", 404);
  //   }

  if (!oldPassword) {
    throw new AppError("Input password is required", 400);
  }

  const isMatch = bcrypt.compare(oldPassword, userPassword);
  if (!isMatch) {
    return false;
  }
  return true;
};
const verifyUserPassword = async (req, res, next) => {
  const { password } = req.body;
  await verifyPassword(id, password);
  if (!verifyPassword) return next(new AppError("Password is incorrect", 400));
  return res.status(200).json({ message: "success" });
};

const changeUserPassword = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const user = await userModel.findById(id);

  if (newPassword !== confirmPassword) {
    return next(
      new AppError("New password and confirm password do not match", 400)
    );
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch) {
    return next(new AppError("Password is incorrect", 400));
  } else {
    // const salt = await bcrypt.genSalt(10);
    user.password = newPassword;
    user.passwordChangedAt = Date.now();
    await user.save();
    res.status(200).json({ message: "Password updated successfully!" });
  }
=======
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
>>>>>>> d41aa58ab691162f6c5101af72e518e10d17ca59
});

export {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  changeUserPassword,
<<<<<<< HEAD
=======
  updateEmail,
  closeAccount,
>>>>>>> d41aa58ab691162f6c5101af72e518e10d17ca59
};
