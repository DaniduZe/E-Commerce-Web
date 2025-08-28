import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token." });
    }
};
