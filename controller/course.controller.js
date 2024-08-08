import { cousreModel } from "../Database/Models/course.model.js";
import catchAsync from "../utils/catchAsync.js";

//create____________________________________
export const createCourse = catchAsync(async (req, res) => {
  const newCourse = await cousreModel.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      course: newCourse,
    },
  });
});

//read Courses_________________________________________
export const getCourses = catchAsync(async (req, res) => {
  const courses = await cousreModel.find({});
  res.status(200).json({
    status: "success",
    // results: courses.length,
    data: {
      courses,
    },
  });
});

//read course by id__________________________________
export const getCourse = catchAsync(async (req, res) => {
  const course = await cousreModel.findById(req.params.id);

  if (!course) {
    return res.status(404).json({
      status: "fail",
      message: "Course not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      course,
    },
  });
});

//update________________________________________
export const updateCourse = catchAsync(async (req, res) => {
  const course = await cousreModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!course) {
    return res.status(404).json({
      status: "fail",
      message: "Course not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      course,
    },
  });
});

//delete________________________________________
export const deleteCourse = catchAsync(async (req, res) => {
  const course = await cousreModel.findByIdAndDelete(req.params.id);

  if (!course) {
    return res.status(404).json({
      status: "fail",
      message: "Course not found",
    });
  }
  return res.status(204).json({
    status: "success",
  });
});
