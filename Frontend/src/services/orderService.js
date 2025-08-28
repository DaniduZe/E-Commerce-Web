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

// Function to create an order
export const createOrder = async (first_name, last_name, address, city, country, province, postal_code, phone) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/order/createOrder`,
            {
                first_name,
                last_name,
                address,
                city,
                country,
                province,
                postal_code,
                userId: getUserId(),
                phone,
            },
            {
                headers: getHeaders(),
            }
        );

        // Return the order details needed for payment
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};


export const completePayment = async (orderId, userId) =>{
    try {
        const response = await axios.post(
            `${API_BASE_URL}/order/completePayment`,
            {
                orderId,
                userId,
            },
            {
                headers: getHeaders(),
            }
        );

        // Return the order details needed for payment
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
} 

export const getOrder = async (orderId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/order/orderView`, {
        orderId: orderId,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };