import md5 from 'crypto-js/md5.js';
import dotenv from "dotenv";
import nodemailer from 'nodemailer';
import Cart from "../models/cartSchema.js";
import Order from "../models/orderSchema.js";
import User from "../models/userSchema.js";
import { fetchCart } from "./CartController.js";

dotenv.config();

// Set up the email transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.smtpUser,
      pass: process.env.smtpPass,
    },
});

// Modified mailer function to accept 'email' as a parameter
async function mailer(email,orderId) {
    const trackOrderUrl = `${process.env.domain}:3000/order-view?${orderId}`;
    try {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: `"E-commerce" <${process.env.smtpUser}>`, // sender address
            to: email, // recipient's email address from the parameter
            subject: "Order Confirmation ✔", // Subject line
            text: "Your order has been confirmed!", // plain text body
            html: `
            <div style="font-family: Arial, sans-serif; text-align: center;">
                <h2>Your order has been confirmed!</h2>
                <p>Thank you for shopping with us. You can track your order using the link below.</p>
                <a href="${trackOrderUrl}" 
                   style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">
                   Track Order
                </a>
                <p>If the button doesn't work, you can manually track your order by visiting the following link: <br/>
                <a href="${trackOrderUrl}">${trackOrderUrl}</a>
                </p>
            </div>
        `
        });
    
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Failed to send email:", error);
    }
}

// Create Order Function
export const createOrder = async (req, res) => {
    const { first_name, last_name, address, city, country, province, postal_code, phone, userId } = req.body;

    try {
        // Fetch user details
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Create a mock response object for fetchCart to capture the data it sends via res.json
        let cartData;
        const mockRes = {
            status: (code) => ({
                json: (data) => {
                    cartData = data; // Capture the response data from fetchCart
                }
            })
        };

        // Fetch the cart data by calling fetchCart with mock res
        await fetchCart({ params: { userId } }, mockRes);

        if (!cartData || cartData.items.length === 0) {
            return res.status(400).json({ error: "Cart is empty." });
        }

        const { items, totalAmount } = cartData;

        // Email of the user
        const email = existingUser.email;

        // Generate order ID
        const generateOrderId = () => {
            const randomNum = Math.floor(10000 + Math.random() * 90000); 
            return `ODR-${randomNum}`;
        };

        const orderId = generateOrderId();
        const name = `${first_name} ${last_name}`;

        // Create a new order
        const newOrder = new Order({
            name,
            orderId,
            userId,
            email,
            totalAmount,
            address,
            city,
            country,
            province,
            postal_code,
            phone,
            items 
        });

        // Save the order to the database
        await newOrder.save();

        // Payment gateway integration
        const merchantSecret = process.env.merchantSecret;
        const merchantId = process.env.merchantId;

        // Validate environment variables
        if (!merchantSecret || !merchantId) {
            return res.status(500).json({ error: "Missing merchant credentials." });
        }

        const hashedSecret = md5(merchantSecret).toString().toUpperCase();
        const amountFormatted = parseFloat(totalAmount).toLocaleString('en-us', { minimumFractionDigits: 2 }).replace(/,/g, '');
        const currency = 'LKR';

        // Generate the payment hash
        const hash = md5(merchantId + orderId + amountFormatted + currency + hashedSecret).toString().toUpperCase();

        const paymentData = {
            merchantId: merchantId,
            orderId: orderId,
            amount: amountFormatted,
            currency: currency,
            hash: hash
        };

        res.status(201).json({ order: newOrder, paymentData });
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
};

// Complete Payment Function
export const completePayment = async (req, res) => {
    const { userId, orderId } = req.body;

    try {
        // Find the cart for the user
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        // Delete the cart after payment completion
        await Cart.findOneAndDelete({ userId });

        // Find the order by its ID
        const order = await Order.findOne({ orderId });
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Update the order status to "paid"
        order.status = "paid";
        await order.save();

        // Send confirmation email to the user's email
        const email = order.email;
        mailer(email,orderId);  // Pass the email to the mailer function

        res.status(200).json({ message: "Payment completed, order placed, and cart deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Order View Function
export const orderView = async (req, res) => {
    const { orderId } = req.body;
    try {
        const order = await Order.findOne({ orderId });
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
