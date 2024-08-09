import asyncHandler from "express-async-handler";
import { Assignment } from "../Database/Models/assignment.model.js";
import AppError from "../utils/appError.js";

/**
 * @desc Create a new assignment
 * @route /assignments
 * @method POST
 * @access public
 */
export const createAssignment = asyncHandler(async (req, res) => {
  const assignment = new Assignment(req.body);
  await assignment.save();
  res.status(201).json(assignment);
});

/**
 * @desc Update an assignment
 * @route /assignments/:id
 * @method PUT
 * @access public
 */
export const updateAssignment = asyncHandler(async (req, res, next) => {
  const assignment = await Assignment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!assignment) return next(new AppError("Assignment not found", 404));
  res.status(200).json(assignment);
});

/**
 * @desc Get an assignment by ID
 * @route /assignments/:id
 * @method GET
 * @access public
 */
export const getAssignmentById = asyncHandler(async (req, res, next) => {
  const assignment = await Assignment.findById(req.params.id);
  if (!assignment) return next(new AppError("Assignment not found", 404));
  res.status(200).json(assignment);
});

/**
 * @desc Get all assignments
 * @route /assignments
 * @method GET
 * @access public
 */
export const getAllAssignments = asyncHandler(async (req, res) => {
  const assignments = await Assignment.find();
  res.status(200).json({ data: assignments });
});

/**
 * @desc Delete an assignment by ID
 * @route /assignments/:id
 * @method DELETE
 * @access public
 */
export const deleteAssignment = asyncHandler(async (req, res, next) => {
  const assignment = await Assignment.findByIdAndDelete(req.params.id);
  if (!assignment) return next(new AppError("Assignment not found", 404));
  res.status(200).json({ message: "Assignment deleted successfully" });
});
