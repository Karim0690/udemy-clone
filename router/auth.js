import express from "express";
import { signin, signup } from "../auth/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);

export default authRouter;
