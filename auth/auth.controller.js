import { userModel } from "../Database/Models/user.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "./../utils/appError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import {
  generateRandomCode,
  mail_option,
  randomCode,
  sendMail,
  transporter,
} from "../utils/email.js";

dotenv.config();

var resetCode = 0;
export const signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) return next(new AppError("Email Already Exist", 409));

  const createUser = new userModel({ name, email, password });
  await createUser.save();
  return res.status(201).json({ message: "success" });
});

export const signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // Find user by email
  const user = await userModel.findOne({ email });

  // If user doesn't exist or password is incorrect
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Incorrect Email or Password!", 401));
  }

  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      enrolledCourses: user.enrolledCourses,
      profilePic: user.profilePic,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1y" }
  );
  res.status(200).json({
    message: "success",
    token,
  });
});

export const forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return next(
      new AppError("We could not find a user with the given email", 404)
    );
  }

  // Store user ID in session
  req.session.userId = user._id;

  // Generate and store reset code
  const resetCode = randomCode;
  user.resetCode = resetCode;
  await user.save();

  // Send email
  mail_option.to = [email];
  mail_option.html = mail_option.html.replace("${randomCode}", resetCode);
  await sendMail(transporter, mail_option);

  return res.status(200).json({ message: "Reset code sent to your email." });
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const { resetPasswordCode } = req.body;

  // Fetch user from session
  const user = await userModel.findById(req.session.userId);
  if (!user || resetPasswordCode !== user.resetCode) {
    return next(new AppError(`Code to reset password doesn't match`, 401));
  }

  return res
    .status(200)
    .json({ message: "Code to reset password has matched" });
});

export const change_forget_password = catchAsync(async (req, res, next) => {
  const { password, confirm_password } = req.body;

  // Fetch user from session
  const user = await userModel.findById(req.session.userId);
  if (!user) {
    return next(new AppError("User not found.", 404));
  }

  if (password !== confirm_password) {
    return next(new AppError("Passwords do not match.", 400));
  }

  user.password = password;
  await user.save();

  // Clear the reset code after successful password change
  user.resetCode = undefined;
  await user.save();

  // Clear the session
  req.session.destroy();

  return res
    .status(200)
    .json({ message: "Password has been updated successfully." });
});
