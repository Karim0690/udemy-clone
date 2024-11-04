import asyncHandler from "express-async-handler";
import { Lecture } from "../Database/Models/lecture.model.js";
import AppError from "../utils/appError.js";
import { cousreModel } from "../Database/Models/course.model.js";
import { CourseSections } from "../Database/Models/courseContent.model.js";

const calculateTotalDuration = (sections) => {
  return sections.reduce((total, section) => {
    return (
      total +
      section.items.reduce((sum, item) => {
        // Check if the item is a lecture and has a duration
        if (item.type === "Lecture" && item.item.duration) {
          return sum + item.item.duration; // Add lecture duration
        }
        return sum; // If not a lecture or no duration, return sum unchanged
      }, 0)
    );
  }, 0);
};

/**
 * @desc Create a new lecture
 * @route /lectures
 * @method POST
 * @access public
 */
export const createLecture = asyncHandler(async (req, res) => {
  // const { error } = validateCreatingLecture(req.body);
  // if (error) {
  //     return res.status(400).json({ error: error.details[0].message });
  // }
  const lecture = new Lecture(req.body);
  await lecture.save();
  res.status(201).json({ message: "success", data: lecture });
});

export const updateOneLecture = asyncHandler(async (req, res) => {
  const lecture = await Lecture.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!lecture) return next(new AppError("Lecture not found", 404));
  res.status(200).json({ message: "success", data: lecture });
});

/**
 * @desc Update a lecture
 * @route /api/lectures/:id
 * @method PUT
 * @access public
 */
export const updateLecture = asyncHandler(async (req, res, next) => {
  const lecture = await Lecture.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!lecture) return next(new AppError("Lecture not found", 404));
  const course = await cousreModel.findById(req.params.courseId);
  if (!course) return next(new AppError("Course not found", 404));
  const sections = await CourseSections.find({
    _id: { $in: course.sections },
  }).populate({
    path: "items.item",
  });
  const totalDuration = calculateTotalDuration(sections);

  // Update course duration
  course.duration = totalDuration;
  await course.save();
  res.status(200).json({ message: "success", data: lecture });
});

/**
 * @desc Get a lecture by ID
 * @route /api/lectures/:id
 * @method GET
 * @access public
 */
export const getLectureById = asyncHandler(async (req, res, next) => {
  const lecture = await Lecture.findById(req.params.id);
  if (!lecture) return next(new AppError("Lecture not found", 404));
  res.status(200).json({ message: "success", data: lecture });
});

/**
 * @desc Get all lectures
 * @route /api/lectures
 * @method GET
 * @access public
 */
export const getAllLectures = asyncHandler(async (req, res) => {
  const lectures = await Lecture.find();
  res.status(200).json({ data: lectures });
});

/**
 * @desc Delete a lecture by ID
 * @route /api/lectures/:id
 * @method DELETE
 * @access public
 */
export const deleteLecture = asyncHandler(async (req, res, next) => {
  const lecture = await Lecture.findByIdAndDelete(req.params.id);
  if (!lecture) return next(new AppError("Lecture not found", 404));

  const course = await cousreModel.findById(req.params.courseId);
  if (!course) return next(new AppError("Course not found", 404));

  const sections = await CourseSections.find({
    _id: { $in: course.sections },
  }).populate({
    path: "items.item",
  });

  // Calculate total duration after deletion
  const totalDuration = calculateTotalDuration(sections);

  // Update course duration
  course.duration = totalDuration;
  await course.save();

  res.status(200).json({ message: "success" });
});
