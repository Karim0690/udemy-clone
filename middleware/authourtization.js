import catchAsync from "./../utils/catchAsync.js";
import AppError from "./../utils/appError.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { userModel } from "../Database/Models/user.model.js";

export const protectedRoutes = catchAsync(async (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization) {
    return next(new AppError("token is not provided", 401));
  }
  const decoded = await promisify(jwt.verify)(
    authorization,
    process.env.JWT_SECRET
  );
  let user = await userModel.findById(decoded._id);
  if (!user) {
    return next(new AppError("Invalid Token", 401));
  }
  req.user = decoded;
  next();
});

export const restrictedTo = (...role) => {
  return catchAsync(async (req, res, next) => {
    const hasPermission = req.user.role.some((userRole) =>
      role.includes(userRole)
    );
    if (!hasPermission) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  });

  function verifyTokenAndAuthorization(req,res,next)
  {
    protectedRoutes(req,res,()=>{
      
    })
    
  }
};
