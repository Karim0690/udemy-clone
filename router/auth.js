<<<<<<< HEAD
import express from "express";
import { signin, signup } from "../auth/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
=======
import express from 'express';
import { signin, signup, forgetPassword, resetPassword, change_forget_password } from '../auth/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.post('/forget-password', forgetPassword);
authRouter.post('/reset-password', resetPassword);
authRouter.patch('/changeForgetPassword', change_forget_password);

>>>>>>> d41aa58ab691162f6c5101af72e518e10d17ca59

export default authRouter;
