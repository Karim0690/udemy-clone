import express from 'express';
import { signin, signup, forgetPassword, resetPassword, change_forget_password } from '../auth/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.post('/forget-password', forgetPassword);
authRouter.post('/reset-password', resetPassword);
authRouter.post('/changeForgetPassword', change_forget_password);


export default authRouter;
