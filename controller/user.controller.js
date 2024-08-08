import { userModel } from '../Models/user.model.js';

const createUser = async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user) return res.status(409).json('Email Already Exist');
  let result = new userModel(req.body);
  await result.save();
  res.status(201).json({ message: 'success', result });
};

const getAllUsers = async (req, res) => {
  let users = await userModel.find();
  res.status(200).json({ message: 'success', users });
};

const getUser = async (req, res) => {
  let user = await userModel.findById(req.params.id);
  !user && res.status(404).json({ message: 'User not Found' });
  user && res.status(200).json({ message: 'success', user });
};

const updateUser = async (req, res) => {
  let user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  !user && res.status(404).json({ message: 'User not Found' });
  user && res.status(200).json({ message: 'success', user });
};

const deleteUser = async (req, res) => {
  let user = await userModel.findByIdAndDelete(req.params.id);
  !user && res.status(404).json({ message: 'User not Found' });
  user && res.status(200).json({ message: 'success', NULL });
};

const changeUserPassword = async (req, res) => {
  const { id } = req.params;
  req.body.passwordChangedAt = Date.now();
  let result = await userModel.findByIdAndUpdate(id, req.body, { new: true });
  !user && res.status(404).json({ message: 'User not Found' });
  result && res.status(200).json({ message: 'success', result });
};

export {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  changeUserPassword,
};
