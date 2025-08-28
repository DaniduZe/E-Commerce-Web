import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.REACT_APP_API_URL;

// Function to get the JWT token and user ID from cookies
const getToken = () => Cookies.get('jwt');
const getUserId = () => Cookies.get('id');

// Function to get the common headers for API requests
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`,
});

// Function to fetch the cart details
export const fetchCart = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cart/fetchCart/${getUserId()}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to update the quantity of a product in the cart
export const updateProductQuantity = async (userId, productId, quantity) => {
  try {
    const data = {
      userId,
      productId,
      quantity,
    };
    await axios.put(`${API_BASE_URL}/cart/updateProductFromCart`, data, {
      headers: getHeaders(),
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to remove a product from the cart
export const removeProductFromCart = async (userId, productId) => {
  try {
    const data = {
      userId,
      productId,
    };
    await axios.delete(`${API_BASE_URL}/cart/removeProductFromCart`, {
      headers: getHeaders(),
      data: data,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
