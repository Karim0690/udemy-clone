
import asyncHandler from 'express-async-handler';
import { Lecture, validateCreatingLecture, validateUpdateLecture } from '../Database/Models/lecture.model.js';

/**
 * @desc Create a new lecture
 * @route /lectures
 * @method POST
 * @access public
 */
export const createLecture = asyncHandler(async (req, res) => {
    const { error } = validateCreatingLecture(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }


    const lecture = new Lecture(req.body);
    await lecture.save();
    res.status(201).json(lecture);


});

/**
 * @desc Update a lecture
 * @route /api/lectures/:id
 * @method PUT
 * @access public
 */
export const updateLecture = asyncHandler(async (req, res) => {
    const { error } = validateUpdateLecture(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }


    const lecture = await Lecture.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lecture) {
        return res.status(404).json({ message: 'Lecture not found' });
    }
    res.status(200).json(lecture);


});

/**
 * @desc Get a lecture by ID
 * @route /api/lectures/:id
 * @method GET
 * @access public
 */
export const getLectureById = asyncHandler(async (req, res) => {
    const lecture = await Lecture.findById(req.params.id);
    if (!lecture) {
        return res.status(404).json({ message: 'Lecture not found' });
    }
    res.status(200).json(lecture);

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
export const deleteLecture = asyncHandler(async (req, res) => {

    const lecture = await Lecture.findByIdAndDelete(req.params.id);
    if (!lecture) {
        return res.status(404).json({ message: 'Lecture not found' });
    }
    res.status(200).json({ message: 'Lecture deleted successfully' });

});
