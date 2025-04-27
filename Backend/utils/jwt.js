import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET ;

export const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};
