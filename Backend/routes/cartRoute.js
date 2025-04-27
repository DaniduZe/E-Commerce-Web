import express from "express";
import { addProductToCart, fetchCart, removeProductFromCart, updateProductFromCart } from "../controllers/CartController.js";
import { authMiddleware } from "../middlewares/auth.js";

const route = express.Router();

route.post("/addProductToCart", authMiddleware, addProductToCart);
route.get("/fetchCart/:userId", authMiddleware, fetchCart);
route.delete("/removeProductFromCart", authMiddleware, removeProductFromCart);
route.put("/updateProductFromCart", authMiddleware, updateProductFromCart);

export default route;