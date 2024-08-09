import express from "express";
import * as userController from "../controller/user.controller.js";

import {
  validateCreatingUser,
  validateupdatingUser,
} from "../validation/user.schema.js";

import { validation } from "../middleware/validation.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .post(validation(validateCreatingUser), userController.createUser)
  .get(userController.getAllUsers);

userRouter
  .route("/:id")
  .get(userController.getUser)
  .put(validation(validateupdatingUser), userController.updateUser)
  .delete(userController.deleteUser)
  .patch(userController.changeUserPassword);

export default userRouter;
