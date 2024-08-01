import { subcategoryModel } from '../Database/Models/subcategory.model.js';

const createSubcategory = async (req, res) => {
  let result = new subcategoryModel(req.body);
  await result.save();
  res.status(201).json({ message: 'success', result });
};

const getAllSubcategory = async (req, res) => {
  let result = await subcategoryModel.find();
  res.status(200).json({ message: 'success', result });
};

const getSubcategory = async (req, res) => {
  let result = await subcategoryModel.findById(req.params.id);
  !result && res.status(404).json('Category not Found');
  result && res.status(200).json({ message: 'success', result });
};

const updateSubcategory = async (req, res) => {
  let result = await subcategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  !result && res.status(404).json('Category not Found');
  result && res.status(200).json({ message: 'success', result });
};

const deleteSubcategory = async (req, res) => {
  let result = await subcategoryModel.findByIdAndDelete(req.params.id);
  !result && res.status(404).json('Category not Found');
  result && res.status(200).json({ message: 'success', result: null });
};

export {
  createSubcategory,
  getAllSubcategory,
  getSubcategory,
  updateSubcategory,
  deleteSubcategory,
};
