import express from 'express';
import * as userController from '../controller/user.controller.js';

const userRouter = express.Router();

userRouter
  .route('/')
  .post(userController.createUser)
  .get(userController.getAllUsers);

userRouter
  .route('/:id')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser)
  .patch(userController.changeUserPassword);

export default userRouter;
