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
<<<<<<< HEAD
import logger from "./middleware/logger.js"
import {review} from "./router/review.router.js"
=======
import courseRouter from "./router/course.router.js"

>>>>>>> bef81ada8319772aae024ddb8757ee4077e476d5
const app = express();
dotenv.config();

app.use(express.json());
app.use(logger)

app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/subcategory", subcategoryRouter);
app.use("/auth", authRouter);
app.use("/orders", OrderRouter);
<<<<<<< HEAD
app.use("/reviews",review);



=======
app.use("/course",courseRouter);
>>>>>>> bef81ada8319772aae024ddb8757ee4077e476d5
app.all("*", (req, res, next) => {
  next(new AppError(`can't find this route : ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

dbconnection();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
