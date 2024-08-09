import express from "express";
import {
  createOrder,
  getOrderById,
  getOrdersByUser,
} from "../controller/order.controller.js";

import { validateCreatingOrder } from "../validation/order.schema.js";

import { validation } from "../middleware/validation.js";

const OrderRouter = express.Router();

OrderRouter.post("/", validation(validateCreatingOrder), createOrder);
OrderRouter.get("/:id", getOrderById);
OrderRouter.get("/user/:userId", getOrdersByUser);

export default OrderRouter;
