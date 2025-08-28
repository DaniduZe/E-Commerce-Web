import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const getProducts = async () => {
  const response = await fetch(`${API_URL}/home/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/home/fetchProduct/${id}`);
  return response.data;
};

const getTrendingProducts = async () =>{
  const response = await fetch(`${API_URL}/home/fetchTrendingProduct`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

const productService = {
  getProducts,
  getProductById,
  getTrendingProducts,

};

export default productService;

