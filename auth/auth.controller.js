import { userModel } from '../Database/Models/user.model.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { generateRandomCode, mail_option, randomCode, sendMail, transporter } from '../utils/email.js';

dotenv.config();

var resetCode = 0;
export const signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) return next(new AppError('Email Already Exist', 409));

  const createUser = new userModel({ name, email, password });
  await createUser.save();
  return res.status(201).json({ message: 'success' });
});

export const signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1y' }
    );
    return res.status(200).json({ message: 'success', token });
  }
  return next(new AppError('Incorrect Email or Password!', 401));
});

export const forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  // Check if user exists
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new AppError("We could not find a user with the given email", 404));
  }

  // Generate a random reset code
   resetCode = randomCode;

  // Send the email with the reset code
  await sendMail(transporter, mail_option);

  return res.status(200).json({ message: 'Reset code sent to your email.' });
});

export const change_forget_password = catchAsync(async (req, res, next) => {
  const { email, password, confirm_password, resetPasswordCode } = req.body;

  // Validate reset code
  if (resetPasswordCode !== resetCode) {
    return next(new AppError("Reset code is incorrect.", 401));
  }

  // Check if passwords match
  if (password !== confirm_password) {
    return next(new AppError("Passwords do not match.", 400));
  }

  // Check if user exists
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new AppError("We could not find a user with the given email", 404));
  }
  // Update user's password
  user.password = password; // Password will be hashed in pre-save middleware
  await user.save();

  // Reset the reset code after successful password change
  resetCode = null;

  return res.status(200).json({ message: 'Password has been updated successfully.' });
});

export const resetPassword = catchAsync(async (req, res, next) => {

  const { resetPasswordCode } = req.body;

  if (resetPasswordCode == resetCode) {
    return res.status(200).json({ message: 'Code to Reset Password Has been match' });

  }else{
    return next(new AppError("Code to Reset Password Hasn't been match", 404));
  }


})
