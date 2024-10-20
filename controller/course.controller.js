import { cousreModel } from "../Database/Models/course.model.js";
import asyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";
import { Featuers } from "../utils/featuers.js";
import {
  cloudinaryDeleteImage,
  cloudinaryUploadImage,
} from "../utils/cloudinary.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  const course = await cousreModel
    .findById(req.params.id)
    .populate("sections")
    .populate("topics")
    .populate("relatedTopic")
    .populate("instructor")
    .populate("category")
    .populate("subcategory"); 

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

//read course by title__________________________________
export const getCourseByTitle = asyncHandler(async (req, res, next) => {
  console.log(req.params.slug);
  
  const course = await cousreModel
    .findOne({ slug: req.params.slug })
    .populate("sections")
    .populate("topics")
    .populate("relatedTopic")
    .populate("instructor");

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

//_______________________________________________
export const findCourseContentByCourseId = asyncHandler(
  async (req, res, next) => {
    const courseContent = await cousreModel
      .find({
        _id: req.params.id,
      })
      .select("sections")
      .populate({
        path: "sections",
        populate: {
          path: "items.item",
        },
      });

    if (!courseContent)
      return next(new AppError("Course content not found", 404));
    res.status(200).json(courseContent);
  }
);
//_______________________________________________

export const findUserCourses = asyncHandler(async (req, res, next) => {
  const { instructorId } = req.params;

  let featuers = new Featuers(
    cousreModel.find({ instructor: instructorId }),
    req.query
  )
    .filter()
    .sort()
    .fields()
    .search();

  const courses = await featuers.mongooseQuery;

  if (!courses || courses.length === 0) {
    return next(new AppError("Courses not found", 404));
  }

  res.status(200).json({
    message: "success",
    data: courses,
  });
});

//Upload Course Basics_______________________________________________

export const uploadCourseBasics = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;

  const course = await cousreModel.findById(courseId);
  if (!course) return next(new AppError("course not found", 404));

  const basics = await cousreModel.findByIdAndUpdate(course._id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "success",
    data: basics,
  });
});

// //upload course image_______________________________________________
// export const uploadCourseImage = asyncHandler(async (req, res, next) => {
//   if (!req.file) return next(new AppError("File not Provided", 404));
//   const imagePath = path.join(
//     __dirname,
//     `../uploads/Course/${req.file.filename}`
//   );

//   const result = await cloudinaryUploadImage(imagePath);

//   res.status(200).json({
//     message: "success",
//     data: result,
//   });
// });

// //upload course Video_______________________________________________
// export const uploadCourseVideo = asyncHandler(async (req, res, next) => {
//   if (!req.file) return next(new AppError("File not Provided", 404));
//   const imagePath = path.join(
//     __dirname,
//     `../uploads/Course/${req.file.filename}`
//   );

//   const result = await cloudinaryUploadImage(imagePath);

//   res.status(200).json({
//     message: "success",
//     data: result,
//   });
// });
