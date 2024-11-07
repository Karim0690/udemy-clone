import { subcategoryModel } from "../Database/Models/subcategory.model.js";
import asyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";
import { Featuers } from "../utils/featuers.js";
import { categoryModel } from "../Database/Models/category.model.js";

const createSubcategory = asyncHandler(async (req, res) => {
  const { name, nameAr, categoryId } = req.body;
  const existingSubcategory = await subcategoryModel.findOne({
    $or: [{ name }, { nameAr }],
  });
  if (existingSubcategory) {
    return res
      .status(400)
      .json({ message: "Subcategory with this name already exists" });
  }
  const category = await categoryModel.findById(categoryId);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  const subcategory = new subcategoryModel({
    name,
    nameAr,
    category: categoryId,
  });

  await subcategory.save();
  category.subcategories.push(subcategory._id);
  await category.save();
  res.status(201).json({ message: "success", subcategory });
});
const getAllSubcategory = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword || "";

  const features = new Featuers(
    subcategoryModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { nameAr: { $regex: keyword, $options: "i" } },
        ],
      })
      .populate("category").populate("topics"),
    req.query
  )
    .filter()
    .sort()
    .fields();

  let result = await features.mongooseQuery;

  if (!result || result.length === 0) {
    return res.status(404).json({ message: "No subcategories found" });
  }

  res.status(200).json({ message: "success", result });
});

const getSubcategory = asyncHandler(async (req, res, next) => {
  let result = await subcategoryModel.findById(req.params.id);
  !result && next(new AppError("Category not Found", 404));
  result && res.status(200).json({ message: "success", result });
});

const updateSubcategory = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  let result = await subcategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  if (!result) {
    return next(new AppError("Subcategory not Found", 404));
  }

  res.status(200).json({ message: "success", result });
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
