import { userModel } from '../Database/Models/user.model.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (user) return next(new AppError('Email Already Exist', 409));
  const createUser = userModel({ name, email, password });
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
      {
        expiresIn: '1y',
      }
    );
    return res.status(200).json({ message: 'success', token });
  }
  return next(new AppError('Incorrect Email or Password!', 401));
});
