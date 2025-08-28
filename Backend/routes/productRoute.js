import express from "express";
import { createProduct, deleteProduct, fetchProducts, updateProduct } from "../controllers/ProductsController.js";
import { authMiddleware } from "../middlewares/auth.js";

const route = express.Router();

route.post("/createProduct", authMiddleware, createProduct);
route.delete("/deleteProduct/:id", authMiddleware, deleteProduct);
route.get("/fetchProducts", authMiddleware, fetchProducts);
route.put("/updateProduct/:id", authMiddleware, updateProduct);

export default route;
