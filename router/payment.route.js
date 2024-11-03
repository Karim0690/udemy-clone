import express from "express";
import * as payment from "../controller/payment.controller.js";
const paymentRouter = express.Router();

paymentRouter.post("/pay/:cartId", payment.createPayment);
paymentRouter.post("/cheakout", payment.capturePayment);

export default paymentRouter;
