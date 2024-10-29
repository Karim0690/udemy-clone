import asyncHandler from "express-async-handler";
import { Question } from "../Database/Models/question.model.js";
import AppError from "../utils/appError.js";
import { Quiz } from "../Database/Models/quiz.model.js";

/**
 * @desc Create a new question
 * @route /questions
 * @method POST
 * @access public
 */
export const createQuestion = asyncHandler(async (req, res, next) => {
  const { quizId } = req.params;
  const question = new Question(req.body);
  await question.save();
  const quiz = await Quiz.findByIdAndUpdate(
    quizId,
    { $push: { questions: question._id } },
    { new: true }
  );

  if (!quiz) return next(new AppError("Quiz not found", 404));
  res.status(201).json({ message: "success", data: question });
});

/**
 * @desc Update a question
 * @route /questions/:id
 * @method PUT
 * @access public
 */
export const updateQuestion = asyncHandler(async (req, res, next) => {
  // const { error } = validateUpdateQuestion(req.body);
  // if (error) {
  //   return res.status(400).json({ error: error.details[0].message });
  // }

  const question = await Question.findByIdAndUpdate(req.params.qid, req.body, {
    new: true,
  });
  if (!question) return next(new AppError("Question not found", 404));
  res.status(200).json({ message: "success", data: question });
});

/**
 * @desc Get a question by ID
 * @route /questions/:id
 * @method GET
 * @access public
 */
export const getQuestionById = asyncHandler(async (req, res, next) => {
  const question = await Question.findById(req.params.id);
  if (!question) return next(new AppError("Question not found", 404));
  res.status(200).json({ message: "success", data: question });
});

/**
 * @desc Get all questions
 * @route /questions
 * @method GET
 * @access public
 */
export const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find();
  res.status(200).json({ message: "success", data: questions });
});

/**
 * @desc Delete a question by ID
 * @route /questions/:id
 * @method DELETE
 * @access public
 */
export const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findByIdAndDelete(req.params.id);
  if (!question) return next(new AppError("Question not found", 404));
  res.status(200).json({ message: "Question deleted successfully" });
});
