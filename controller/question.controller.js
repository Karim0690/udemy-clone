import asyncHandler from 'express-async-handler';
import { Question, validateCreatingQuestion, validateUpdateQuestion } from '../Database/Models/question.model.js';

/**
 * @desc Create a new question
 * @route /questions
 * @method POST
 * @access public
 */
export const createQuestion = asyncHandler(async (req, res) => {
  const { error } = validateCreatingQuestion(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
});

/**
 * @desc Update a question
 * @route /questions/:id
 * @method PUT
 * @access public
 */
export const updateQuestion = asyncHandler(async (req, res) => {
  const { error } = validateUpdateQuestion(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json(question);
 
});

/**
 * @desc Get a question by ID
 * @route /questions/:id
 * @method GET
 * @access public
 */
export const getQuestionById = asyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json(question);
});

/**
 * @desc Get all questions
 * @route /questions
 * @method GET
 * @access public
 */
export const getAllQuestions = asyncHandler(async (req, res) => {
    const questions = await Question.find();
    res.status(200).json({ data: questions });
});

/**
 * @desc Delete a question by ID
 * @route /questions/:id
 * @method DELETE
 * @access public
 */
export const deleteQuestion = asyncHandler(async (req, res) => {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json({ message: 'Question deleted successfully' });
});
