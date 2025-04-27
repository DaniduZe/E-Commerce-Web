import bcrypt from "bcryptjs";
import User from "../models/userSchema.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
    try {
        const { name, email, address, password, phone } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            address,
            password: hashedPassword,
            phone
        });

        const savedUser = await newUser.save();
        const token = generateToken(savedUser);

        res.status(201).json({ user: savedUser, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = generateToken(user);
        const id = user._id;

        res.status(200).json({ token, id });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err);
    }
};

export const fetch = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found." });
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({ _id: id });
        if (!userExist) {
            return res.status(404).json({ message: "User not found." });
        }
        const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updateUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({ _id: id });
        if (!userExist) {
            return res.status(404).json({ message: "User not found." });
        }
        await User.findByIdAndDelete(id);
        res.status(201).json({ message: "User deleted successfully." });
    } catch (err) {
        res.status(500).json(err);
    }
};
