// controllers/quizController.js
import asyncHandler from "express-async-handler";
import {
  Quiz,
  // validateCreatingQuiz,
  // validateUpdateQuiz,
} from "../Database/Models/quiz.model.js";
import AppError from "../utils/appError.js";

/**
 * @desc Create a new quiz
 * @route /quizzes
 * @method POST
 * @access public
 */
export const createQuiz = asyncHandler(async (req, res) => {
  // const { error } = validateCreatingQuiz(req.body);
  // if (error) {
  //   return res.status(400).json({ error: error.details[0].message });
  // }

  const quiz = new Quiz(req.body);
  await quiz.save();
  res.status(201).json({ message: "success", data: quiz });
});

/**
 * @desc Update a quiz
 * @route /quizzes/:id
 * @method PUT
 * @access public
 */
export const updateQuiz = asyncHandler(async (req, res, next) => {
  // const { error } = validateUpdateQuiz(req.body);
  // if (error) {
  //   return res.status(400).json({ error: error.details[0].message });
  // }

  const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!quiz) return next(new AppError("Quiz not found", 404));
  res.status(200).json({ message: "success", data: quiz });
});

/**
 * @desc Get a quiz by ID
 * @route /quizzes/:id
 * @method GET
 * @access public
 */
export const getQuizById = asyncHandler(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id).populate("questions");
  if (!quiz) return next(new AppError("Quiz not found", 404));
  res.status(200).json({ message: "success", data: quiz });
});

/**
 * @desc Get all quizzes
 * @route /quizzes
 * @method GET
 * @access public
 */
export const getAllQuizzes = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find().populate("questions");
  res.status(200).json({ message: "success", data: quizzes });
});

/**
 * @desc Delete a quiz by ID
 * @route /quizzes/:id
 * @method DELETE
 * @access public
 */
export const deleteQuiz = asyncHandler(async (req, res, next) => {
  const quiz = await Quiz.findByIdAndDelete(req.params.id);
  if (!quiz) return next(new AppError("Quiz not found", 404));
  res.status(200).json({ message: "Quiz deleted successfully" });
});
