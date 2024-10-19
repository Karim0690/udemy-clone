import { subcategoryModel } from "../Database/Models/subcategory.model.js";
import asyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";

const createSubcategory = asyncHandler(async (req, res) => {
  let result = new subcategoryModel(req.body);
  await result.save();
  res.status(201).json({ message: "success", result });
});

const getAllSubcategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.query; 

  let query = {};
  if (categoryId) {
    query.category = categoryId; 
  }

  let result = await subcategoryModel.find(query); 
  

  res.status(200).json({ message: "success", result });
});

const getSubcategory = asyncHandler(async (req, res, next) => {
  let result = await subcategoryModel.findById(req.params.id);
  !result && next(new AppError("Category not Found", 404));
  result && res.status(200).json({ message: "success", result });
});

const updateSubcategory = asyncHandler(async (req, res) => {
  let result = await subcategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  !result && next(new AppError("Category not Found", 404));
  result && res.status(200).json({ message: "success", result });
});

const deleteSubcategory = asyncHandler(async (req, res) => {
  let result = await subcategoryModel.findByIdAndDelete(req.params.id);
  !result && next(new AppError("Category not Found", 404));
  result && res.status(204).json({ message: "success", result: null });
});

export {
  createSubcategory,
  getAllSubcategory,
  getSubcategory,
  updateSubcategory,
  deleteSubcategory,
};
