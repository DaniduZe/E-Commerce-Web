import express from "express";
import { fetchProduct, fetchProducts, fetchTrendingProduct } from "../controllers/ProductsController.js";

const route = express.Router();
route.get("/products", fetchProducts);
route.get("/fetchProduct/:id", fetchProduct);
route.get("/fetchTrendingProduct", fetchTrendingProduct);
export default route;