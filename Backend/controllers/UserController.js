import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import express from 'express';
import pool from '../middlewares/db.js';

export const register = async (req, res) => {
    try {
        const { name, email, address, password, phone } = req.body;
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertQuery = `
            INSERT INTO users (name, email, address, password, phone)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, name, email, address, phone
        `;
        const values = [name, email, address, hashedPassword, phone];
        const result = await pool.query(insertQuery, values);
        const savedUser = result.rows[0];

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
        const userQuery = 'SELECT * FROM users WHERE email = $1';
        const userResult = await pool.query(userQuery, [email]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        const user = userResult.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = generateToken(user);
        const id = user.id;

        res.status(200).json({ token, id });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err);
    }
};

export const fetch = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name, email, address, phone FROM users');
        const users = result.rows;
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found." });
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err);
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, address, phone } = req.body;

        // Check if user exists
        const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        // Update user
        const updateQuery = `
            UPDATE users
            SET name = $1, email = $2, address = $3, phone = $4
            WHERE id = $5
            RETURNING id, name, email, address, phone
        `;
        const values = [name, email, address, phone, id];
        const result = await pool.query(updateQuery, values);

        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        // Check if user exists
        const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }
        // Delete user
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.status(200).json({ message: "User deleted successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err);
    }
};
