import pool from '../middlewares/db.js';
import Product from "../models/productSchema.js";

export const createProduct = async (req, res) => {
  try {
    const { productName, productPrice, productDescription, productCountInStock, productImageUrl, productCatagory } = req.body;

    // Check if product already exists
    const existingProductQuery = `
      SELECT * FROM products WHERE productname = $1
    `;
    const existingProductResult = await pool.query(existingProductQuery, [productName]);
    if (existingProductResult.rows.length > 0) {
      return res.status(400).json({ message: "Product already exists." });
    }

    // Insert new product
    const insertProductQuery = `
      INSERT INTO products (productname, productprice, productdescription, productcountinstock, productimageurl, productcatagory)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [
      productName,
      productPrice,
      productDescription,
      productCountInStock,
      productImageUrl,
      productCatagory
    ];
    const newProductResult = await pool.query(insertProductQuery, values);

    res.status(201).json(newProductResult.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
};

export const fetchProducts = async (req, res) => {
  try {
    const productsQuery = `SELECT * FROM products`;
    const productsResult = await pool.query(productsQuery);
    if (productsResult.rows.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }
    res.status(200).json(productsResult.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { productCountInStock } = req.body;

    // Validate input
    if (productCountInStock === undefined) {
      return res.status(400).json({ message: "Product count in stock is required." });
    }

    // Check if product exists
    const productExistQuery = `SELECT * FROM products WHERE id = $1`;
    const productExistResult = await pool.query(productExistQuery, [id]);
    if (productExistResult.rows.length === 0) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Update quantity
    const updateQuantityQuery = `
      UPDATE products
      SET productcountinstock = $1
      WHERE id = $2
      RETURNING *
    `;
    const values = [productCountInStock, id];
    const updatedProductResult = await pool.query(updateQuantityQuery, values);

    res.status(200).json({ message: "Product quantity updated successfully.", product: updatedProductResult.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    // Check if product exists
    const productExistQuery = `SELECT * FROM products WHERE id = $1`;
    const productExistResult = await pool.query(productExistQuery, [id]);
    if (productExistResult.rows.length === 0) {
      return res.status(404).json({ message: "Product not found." });
    }
    // Delete product
    const deleteProductQuery = `DELETE FROM products WHERE id = $1`;
    await pool.query(deleteProductQuery, [id]);
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Product ID is required." });
    }
    const productQuery = `SELECT * FROM products WHERE id = $1`;
    const productResult = await pool.query(productQuery, [id]);
    if (productResult.rows.length === 0) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(productResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching the product." });
  }
};

export const fetchTrendingProduct = async (req, res) => {
  try {
    const trendingQuery = `SELECT * FROM products ORDER BY createdat DESC LIMIT 4`;
    const trendingResult = await pool.query(trendingQuery);
    if (trendingResult.rows.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }
    res.status(200).json(trendingResult.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
