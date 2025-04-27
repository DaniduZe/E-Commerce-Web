import Product from "../models/productSchema.js";

export const createProduct = async (req, res) => {
  try {
    const { productName, productPrice, productDescription, productCountInStock, productImageUrl, productCatagory } = req.body;
    const existingProduct = await Product.findOne({ productName });

    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists." });
    }

    const newProduct = new Product({
      productName,
      productPrice,
      productDescription,
      productCountInStock,
      productImageUrl,
      productCatagory
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
};

export const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productExist = await Product.findOne({ _id: id });
    if (!productExist) {
      return res.status(404).json({ message: "Product not found." });
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json( {message:"Succesfully Updated"});
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productExist = await Product.findOne({ _id: id });
    if (!productExist) {
      return res.status(404).json({ message: "Product not found." });
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (err) {
    res.status(500).json(err);
  }
};


export const fetchProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Product ID is required." });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: "An error occurred while fetching the product." });
  }
};

export const fetchTrendingProduct = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(4);
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};
