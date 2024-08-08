
import asyncHandler from 'express-async-handler';
import { Assignment, validateCreatingAssignment, validateUpdateAssignment } from '../Database/Models/assignment.model.js';

/**
 * @desc Create a new assignment
 * @route /assignments
 * @method POST
 * @access public
 */
export const createAssignment = asyncHandler(async (req, res) => {
  const { error } = validateCreatingAssignment(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  
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
export const updateAssignment = asyncHandler(async (req, res) => {
  const { error } = validateUpdateAssignment(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.status(200).json(assignment);
  
    
});

/**
 * @desc Get an assignment by ID
 * @route /assignments/:id
 * @method GET
 * @access public
 */
export const getAssignmentById = asyncHandler(async (req, res) => {
  
    
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
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
export const deleteAssignment = asyncHandler(async (req, res) => {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.status(200).json({ message: 'Assignment deleted successfully' });
  
    
});
