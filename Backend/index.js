import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

// Import routes separately
import cartRoute from "./routes/cartRoute.js";
import homeRoute from "./routes/homeRoute.js";
import orderRoute from "./routes/orderRoute.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import testRoute from "./routes/testRoute.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

// Use routes with appropriate paths
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/home", homeRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/test", testRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error message:", err.message);
  console.error("Stack trace:", err.stack);
  res.status(500).json({ error: err.message });
});
