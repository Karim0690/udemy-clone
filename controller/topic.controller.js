import topicModel from "../Database/Models/topic.model.js";
import AppError from "../utils/appError.js";
import asyncHandler from "express-async-handler";
import { Featuers } from "../utils/featuers.js";
import { subcategoryModel } from "../Database/Models/subcategory.model.js";

const createTopic = asyncHandler(async (req, res) => {
  const { name, nameAr, subcategoryId } = req.body;
  const existingTopic = await topicModel.findOne({
    $or: [{ name }, { nameAr }],
  });
  if (existingTopic) {
    return res
      .status(400)
      .json({ message: "Topic with this name already exists" });
  }
  const subcategory = await subcategoryModel.findById(subcategoryId);
  if (!subcategory) {
    return res.status(404).json({ message: "Subcategory not found" });
  }

  const topic = new topicModel({
    name,
    nameAr,
    subcategory: subcategoryId,
  });
  await topic.save();
  subcategory.topics.push(topic._id);
  await subcategory.save();
  return res.status(201).json({
    message: "success",
    topic,
  });
});

const getAllTopics = asyncHandler(async (req, res) => {
  const { subcategoryId } = req.query;

  let query = {};
  if (subcategoryId) {
    query.subcategory = subcategoryId;
  }

  let result = await topicModel.find(query).populate("subcategory");

  res.status(200).json({ message: "success", result });
});

const getTopics = asyncHandler(async (req, res, next) => {
  const keyword = req.query.keyword || "";
  const features = new Featuers(
    topicModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { nameAr: { $regex: keyword, $options: "i" } },
        ],
      })
      .populate("subcategory"),
    req.query
  )
    .filter()
    .sort()
    .fields()
    .search();
  let result = await features.mongooseQuery;
  res.status(200).json({ message: "success", result });
});

const getTopic = asyncHandler(async (req, res, next) => {
  let result = await topicModel.findById(req.params.id);
  !result && next(new AppError("Topic not Found", 404));
  result && res.status(200).json({ message: "success", result });
});

const updateTopic = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  let result = await topicModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!result) {
    return next(new AppError("Topic not Found", 404));
  }
  res.status(200).json({ message: "success", result });
});

const deleteTopic = asyncHandler(async (req, res) => {
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
  getTopics,
};
