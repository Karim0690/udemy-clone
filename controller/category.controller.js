import { categoryModel } from "../Database/Models/category.model.js";
import asyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";
import { Featuers } from "../utils/featuers.js";
import topicModel from "../Database/Models/topic.model.js";

const createCategory = asyncHandler(async (req, res, next) => {
  let result = new categoryModel(req.body);
  await result.save();
  res.status(201).json({ message: "success", result });
});

// const getAllCategory = asyncHandler(async (req, res, next) => {
//   const features = new Featuers(
//     categoryModel.find().populate({
//       path: "subcategories",
//       populate: {
//         path: "topics",
//       },
//     }),
//     req.query
//   )
//     .filter()
//     .sort()
//     .fields()
//     .search();

//   const result = await features.mongooseQuery;

//   res.status(200).json({
//     message: "success",
//     result,
//   });
// });

const getAllCategory = asyncHandler(async (req, res, next) => {
  const keyword = req.query.keyword || "";

  const features = new Featuers(
    categoryModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { nameAr: { $regex: keyword, $options: "i" } },
        ],
      })
      .populate({
        path: "subcategories",
        populate: {
          path: "topics",
        },
      }),
    req.query
  )
    .filter()
    .sort()
    .fields()
    .search();

  const result = await features.mongooseQuery;

  res.status(200).json({
    message: "success",
    result,
  });
});

const getCategory = asyncHandler(async (req, res, next) => {
  let result = await categoryModel.findById(req.params.id);
  !result && res.status(404).json("Category not Found");
  result && res.status(200).json({ message: "success", result });
});

const updateCategory = asyncHandler(async (req, res, next) => {
  console.log("Request Body:", req.body);
  let result = await categoryModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  !result && res.status(404).json("Category not Found");
  result && res.status(200).json({ message: "success", result });
});

const deleteCategory = asyncHandler(async (req, res, next) => {
  let result = await categoryModel.findByIdAndDelete(req.params.id);
  !result && res.status(404).json("Category not Found");
  result && res.status(204).json({ message: "success", result: null });
});

const getCategorySubCategories = asyncHandler(async (req, res, next) => {
  let result = await categoryModel
    .findById(req.params.categoryid)
    .select("subcategories")
    .populate("subcategories");
  if (!result) next(new AppError("Category not found", 404));
  res.status(200).json({ message: "success", result: result.subcategories });
});

export {
  createCategory,
  getAllCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategorySubCategories,
};
