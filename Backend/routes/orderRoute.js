import express from "express";
import { completePayment, createOrder, orderView } from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/auth.js";

const route = express.Router();
route.post("/createOrder", authMiddleware, createOrder);
route.post("/completePayment", authMiddleware, completePayment);
route.post("/orderView", orderView);
export default route;