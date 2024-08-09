import { cousreModel } from "../Database/Models/course.model.js";
import asyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";

//create____________________________________
export const createCourse = asyncHandler(async (req, res) => {
  const newCourse = await cousreModel.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      course: newCourse,
    },
  });
});

//read Courses_________________________________________
export const getCourses = asyncHandler(async (req, res) => {
  const courses = await cousreModel.find();
  res.status(200).json({
    status: "success",
    data: {
      courses,
    },
  });
});

//read course by id__________________________________
export const getCourse = asyncHandler(async (req, res, next) => {
  const course = await cousreModel.findById(req.params.id);

  if (!course) {
    return next(new AppError("Course not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      course,
    },
  });
});

//update________________________________________
export const updateCourse = asyncHandler(async (req, res, next) => {
  const course = await cousreModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      course,
    },
  });
});

//delete________________________________________
export const deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await cousreModel.findByIdAndDelete(req.params.id);

  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  return res.status(204).json({
    status: "success",
  });
});
