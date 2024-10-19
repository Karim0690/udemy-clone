
import topicModel from '../Database/Models/topic.model.js';
import AppError from '../utils/appError.js';
import asyncHandler from "express-async-handler";

const createTopic = asyncHandler(async (req, res) => {
    let result = new topicModel(req.body);
    await result.save();
    res.status(201).json({ message: "success", result })
})

const getAllTopics = asyncHandler(async (req, res) => {
    const { subcategoryId } = req.query; 


    let query = {};
    if (subcategoryId) {
      query.subcategory = subcategoryId; 
    }
  

    let result = await topicModel.find(query); 
    
    res.status(200).json({ message: "success", result });
  });
  

const getTopic = asyncHandler(async (req, res, next) => {
    let result = await topicModel.findById(req.params.id);
    !result && next(new AppError("Topic not Found", 404));
    result && res.status(200).json({ message: "success", result });
})

const updateTopic = asyncHandler(async (req, res, next) => {
    let result = await topicModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true });
    !result && next(new AppError("Topic not Found", 404));
    result && res.status(200).json({ message: "success", result });
});

const deleteTopic = asyncHandler(async (req,res)=> {
    let result = await topicModel.findByIdAndDelete(req.params.id);
    !result && next(new AppError("Topic not Found", 404));
    result && res.status(204).json({ message: "success", result: null });
}); 

export { 
    createTopic,
    getAllTopics,
    getTopic,
    updateTopic,
    deleteTopic,
 };
