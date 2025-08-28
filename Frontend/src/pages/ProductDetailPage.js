import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productService from '../services/productService';

const API_BASE_URL = process.env.REACT_APP_API_URL;

// Function to get the JWT token and user ID from cookies
const getToken = () => Cookies.get('jwt');
const getUserId = () => Cookies.get('id');

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // New state for success popup
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const productId = query.get('id');

    if (productId) {
      productService.getProductById(productId).then(data => setProduct(data));
    }
  }, [location]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const addProductToCart = async () => {
    try {
      const data = {
        userId: getUserId(),
        productId: product._id,
        quantity: 1,
      };
      await axios.post(`${API_BASE_URL}/cart/addProductToCart`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
      });
      setShowSuccessPopup(true); // Show success popup on successful addition
    } catch (err) {
      console.error(err);
      setShowErrorPopup(true);
    }
  };

  const closePopup = () => {
    setShowErrorPopup(false);
    setShowSuccessPopup(false); // Close success popup
  };

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg mb-4">
              <img
                className="w-full h-full object-cover"
                src={product.productImageUrl}
                alt={product.productName}
              />
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-black mb-2">
              {product.productName}
            </h2>
            <p className="text-black text-sm mb-4">
              {product.productDescription}
            </p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-black">Price: </span>
                <span className="text-black">Rs. {product.productPrice}</span>
              </div>
              <div>
                <span className="font-bold text-black">Availability: </span>
                <span className="text-black">
                  {product.productCountInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
            <div>
              <span className="font-bold text-black">Product Description:</span>
              <p className="text-black text-sm mt-2">
                {product.productDescription}
              </p><br />
              <button
                className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                onClick={addProductToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-8 shadow-2xl">
            <h2 className="text-lg font-bold">Product Added Successfully.</h2>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
                onClick={closePopup}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-8 shadow-2xl">
            <h2 className="text-lg font-bold">An error occurred</h2>
            <p className="mt-2 text-sm text-gray-500">
              You are not signed in. Please sign in to continue.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
                onClick={closePopup}
              >
                OK
              </button>
              <button
                type="button"
                className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
                onClick={() => navigate('/login')}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
