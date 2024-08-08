<<<<<<< HEAD
import { categoryModel } from '../Models/category.model.js';
import catchAsync from './../utils/catchAsync.js';
=======
import { categoryModel } from "../Database/Models/category.model.js";
import catchAsync from "./../utils/catchAsync.js";
>>>>>>> bef81ada8319772aae024ddb8757ee4077e476d5

const createCategory = catchAsync(async (req, res, next) => {
  let result = new categoryModel(req.body);
  await result.save();
  res.status(201).json({ message: "success", result });
});

const getAllCategory = catchAsync(async (req, res, next) => {
  let result = await categoryModel.find();
  res.status(200).json({ message: "success", result });
});

const getCategory = catchAsync(async (req, res, next) => {
  let result = await categoryModel.findById(req.params.id);
  !result && res.status(404).json("Category not Found");
  result && res.status(200).json({ message: "success", result });
});

const updateCategory = catchAsync(async (req, res, next) => {
  let result = await categoryModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  !result && res.status(404).json("Category not Found");
  result && res.status(200).json({ message: "success", result });
});

const deleteCategory = catchAsync(async (req, res, next) => {
  let result = await categoryModel.findByIdAndDelete(req.params.id);
  !result && res.status(404).json("Category not Found");
  result && res.status(200).json({ message: "success", result: null });
});

export {
  createCategory,
  getAllCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
