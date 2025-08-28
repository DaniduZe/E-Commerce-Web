import express from "express";
import { deleteUser, fetch, login, register, update } from "../controllers/UserController.js";
import { authMiddleware } from "../middlewares/auth.js";

const route = express.Router();

route.post("/register", register); // Route to register a new user
route.post("/login", login); // Route to login a user

route.get("/getallusers", authMiddleware, fetch); // Route to fetch all users
route.put("/update/:id", authMiddleware, update); // Route to update a user by ID
route.delete("/delete/:id", authMiddleware, deleteUser); // Route to delete a user by ID

export default route;