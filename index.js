import express from "express";
import dotenv from "dotenv";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controller/error.controller.js";
import { dbconnection } from "./Database/DBConnection.js";
import userRouter from "./router/user.router.js";
import categoryRouter from "./router/category.router.js";
import subcategoryRouter from "./router/subcategory.router.js";
import authRouter from "./router/auth.js";
import OrderRouter from "./router/order.router.js";
import {logger} from "./middleware/logger.js"
import courseRouter from "./router/course.router.js"
import review from "./router/review.router.js"
import question from "./router/question.js"
import quiz from "./router/quiz.js"
import lecture from "./router/lecture.js"
import assignment from "./router/assignment.js"
import courseContent from "./router/courseContent.js"

const app = express();
dotenv.config();

app.use(express.json());
app.use(logger);

app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/subcategory", subcategoryRouter);
app.use("/auth", authRouter);
app.use("/orders", OrderRouter);
app.use("/course",courseRouter);

app.use("/reviews",review);
app.use("/questions",question);
app.use("/quizzes",quiz);
app.use("/lectures",lecture);
app.use("/assignments",assignment);
app.use("/course-content",courseContent);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find this route : ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

dbconnection();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
