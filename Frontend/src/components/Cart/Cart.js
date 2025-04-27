
import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.REACT_APP_API_URL; 

// Function to get the JWT token and user ID from cookies
const getToken = () => Cookies.get('jwt');
const getUserId = () => Cookies.get('id');

export const getCartItems = () => axios.get(`${API_BASE_URL}/cart/fetchCart/${getUserId()}`, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
  },
});
export const updateCartItem = (id, data) => axios.put(`${API_BASE_URL}/cart/${id}`, data);
export const deleteCartItem = (id) => axios.delete(`${API_BASE_URL}/cart/${id}`);
