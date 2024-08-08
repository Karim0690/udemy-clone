

import asyncHandler from 'express-async-handler';
import { CourseContent, validateCreatingCourseContent, validateUpdateCourseContent } from '../Database/Models/courseContent.model.js';

/**
 * @desc Create new course content
 * @route /course-content
 * @method POST
 * @access public
 */
export const createCourseContent = asyncHandler(async (req, res) => {
    const { error } = validateCreatingCourseContent(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }


    const courseContent = new CourseContent(req.body);
    await courseContent.save();
    res.status(201).json(courseContent);

});

/**
 * @desc Update course content
 * @route /course-content/:id
 * @method PUT
 * @access public
 */
export const updateCourseContent = asyncHandler(async (req, res) => {
    const { error } = validateUpdateCourseContent(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }


    const courseContent = await CourseContent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!courseContent) {
        return res.status(404).json({ message: 'Course content not found' });
    }
    res.status(200).json(courseContent);


});

/**
 * @desc Get course content by ID
 * @route /course-content/:id
 * @method GET
 * @access public
 */
export const getCourseContentById = asyncHandler(async (req, res) => {

    const courseContent = await CourseContent.findById(req.params.id).populate('lectures quizzes assignments');
    if (!courseContent) {
        return res.status(404).json({ message: 'Course content not found' });
    }
    res.status(200).json(courseContent);

});

/**
 * @desc Get all course content
 * @route /course-content
 * @method GET
 * @access public
 */
export const getAllCourseContents = asyncHandler(async (req, res) => {

    const courseContents = await CourseContent.find().populate('lectures quizzes assignments');
    res.status(200).json({ data: courseContents });


});

/**
 * @desc Delete course content by ID
 * @route /course-content/:id
 * @method DELETE
 * @access public
 */
export const deleteCourseContent = asyncHandler(async (req, res) => {

    const courseContent = await CourseContent.findByIdAndDelete(req.params.id);
    if (!courseContent) {
        return res.status(404).json({ message: 'Course content not found' });
    }
    res.status(200).json({ message: 'Course content deleted successfully' });

});
