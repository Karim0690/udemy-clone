import asyncHandler from "express-async-handler";
import { CourseSections } from "../Database/Models/courseContent.model.js";
import AppError from "../utils/appError.js";
import { Lecture } from "../Database/Models/lecture.model.js";
import { Quiz } from "../Database/Models/quiz.model.js";
import { cousreModel } from "../Database/Models/course.model.js";

/**
 * @desc Create new course content
 * @route /course-content
 * @method POST
 * @access public
 */
export const createCourseContent = asyncHandler(async (req, res) => {
  //   const { error } = validateCreatingCourseContent(req.body);
  //   if (error) {
  //     return res.status(400).json({ error: error.details[0].message });
  //   }

  const courseContent = new CourseSections(req.body);
  await courseContent.save();
  res.status(201).json(courseContent);
});

/**
 * @desc Update course content
 * @route /course-content/:id
 * @method PUT
 * @access public
 */
export const updateCourseContent = asyncHandler(async (req, res, next) => {
<<<<<<< HEAD
  //   const { error } = validateUpdateCourseContent(req.body);
  //   if (error) {
  //     return res.status(400).json({ error: error.details[0].message });
  //   }

=======
>>>>>>> d41aa58ab691162f6c5101af72e518e10d17ca59
  const courseContent = await CourseSections.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!courseContent)
    return next(new AppError("Course content not found", 404));
  res.status(200).json(courseContent);
});

/**
 * @desc Get course content by ID
 * @route /course-content/:id
 * @method GET
 * @access public
 */
export const getCourseContentById = asyncHandler(async (req, res, next) => {
  const courseContent = await CourseSections.findById(req.params.id).populate({
    path: "items.item",
  });
  if (!courseContent)
    return next(new AppError("Course content not found", 404));
  res.status(200).json(courseContent);
});

/**
 * @desc Get all course content
 * @route /course-content
 * @method GET
 * @access public
 */
export const getAllCourseContents = asyncHandler(async (req, res) => {
  const courseContents = await CourseSections.find().populate({
    path: "items.item",
  });

  res.status(200).json({ data: courseContents });
});

/**
 * @desc Delete course content by ID
 * @route /course-content/:id
 * @method DELETE
 * @access public
 */
export const deleteCourseContent = asyncHandler(async (req, res, next) => {
  const courseContent = await CourseSections.findByIdAndDelete(req.params.id);
  if (!courseContent)
    return next(new AppError("Course content not found", 404));

  res.status(200).json({ message: "Course content deleted successfully" });
});

export const addSectionToCourse = asyncHandler(async (req, res, next) => {
  const newSection = new CourseSections(req.body);
  const courseSection = await newSection.save();

  const { courseId } = req.params;
  await cousreModel.findByIdAndUpdate(
    courseId,
    { $push: { sections: courseSection._id } },
    { new: true }
  );
  res.status(201).json({
<<<<<<< HEAD
    message: "Section added and course updated successfully",
=======
    message: "success",
>>>>>>> d41aa58ab691162f6c5101af72e518e10d17ca59
    section: courseSection,
  });
});

export const addLectureToSection = asyncHandler(async (req, res, next) => {
  const { sectionId } = req.params;
  const lecture = new Lecture(req.body);
  await lecture.save();
  const updatedSection = await CourseSections.findByIdAndUpdate(
    sectionId,
    {
      $push: {
        items: {
          type: "Lecture",
          item: lecture._id,
        },
      },
    },
    { new: true }
  );
  if (!updatedSection) {
    return next(new AppError("Section not found", 404));
  }

  res.status(201).json({
<<<<<<< HEAD
    message: "Lecture added to section successfully",
=======
    message: "success",
>>>>>>> d41aa58ab691162f6c5101af72e518e10d17ca59
    lecture,
  });
});
export const addQuizToSection = asyncHandler(async (req, res, next) => {
  const { sectionId } = req.params;
  const quiz = new Quiz(req.body);
  await quiz.save();
  const updatedSection = await CourseSections.findByIdAndUpdate(
    sectionId,
    {
      $push: {
        items: {
          type: "Quiz",
          item: quiz._id,
        },
      },
    },
    { new: true }
  );
  if (!updatedSection) {
    return next(new AppError("Section not found", 404));
  }

  res.status(201).json({
<<<<<<< HEAD
    message: "Lecture added to section successfully",
=======
    message: "success",
>>>>>>> d41aa58ab691162f6c5101af72e518e10d17ca59
    quiz,
  });
});

export const deleteSectionItem = asyncHandler(async (req, res, next) => {
  const { sectionId, itemId } = req.params;
  const updatedSection = await CourseSections.findByIdAndUpdate(
    sectionId,
    {
      $pull: {
        items: { _id: itemId },
      },
    },
    { new: true }
  );
  if (!updatedSection) {
    return next(new AppError("Section not found", 404));
  }
  res.status(200).json({
<<<<<<< HEAD
    message: "Item deleted from section successfully",
=======
    message: "success",
>>>>>>> d41aa58ab691162f6c5101af72e518e10d17ca59
  });
});
