import { cousreModel } from "../Database/Models/course.model.js";
import asyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";
import { Featuers } from "../utils/featuers.js";

//create____________________________________
export const createCourse = asyncHandler(async (req, res) => {
  console.log(req.files);
  // const courseImage = req.files.courseImage
  //   ? req.files.courseImage[0].filename
  //   : null;
  // const promotionalVideo = req.files.promotionalVideo
  //   ? req.files.promotionalVideo[0].filename
  //   : null;
  const newCourse = await cousreModel.create({
    ...req.body,
    // courseImage,
    // promotionalVideo,
  });
  res.status(201).json({
    status: "success",
    data: {
      course: newCourse,
    },
  });
});

//read Courses_________________________________________
export const getCourses = asyncHandler(async (req, res) => {
  const totalPages = Math.ceil((await cousreModel.countDocuments()) / 3);
  let featuers = new Featuers(
    cousreModel.find().populate("category", "name"),
    req.query
  )
    .pagination()
    .filter()
    .sort()
    .fields()
    .search();

  let courses = await featuers.mongooseQuery;
  // const courses = await cousreModel.find();
  let hasNextPage = courses.length === 3;
  if (hasNextPage) {
    return res.status(200).json({
      status: "success",
      data: {
        page: featuers.page,
        nextPage: featuers.page + 1,
        totalPages,
        courses,
      },
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      page: featuers.page,
      totalPages,
      courses,
    },
  });
});

//read course by id__________________________________
export const getCourse = asyncHandler(async (req, res, next) => {
  const course = await cousreModel.findOne({ title: req.params.title }).populate('instructor');;

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

  return res.status(201).json({
    status: "course deleted success",
  });
});
