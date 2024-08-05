import express from "express";
import {
  createOrder,
  getOrderById,
  getOrdersByUser,
} from "../controller/order.controller.js";

const OrderRouter = express.Router();

OrderRouter.post("/", createOrder);
OrderRouter.get("/:id", getOrderById);
OrderRouter.get("/user/:userId", getOrdersByUser);

export default OrderRouter;
