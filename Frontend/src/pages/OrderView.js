import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getOrder } from '../services/orderService';

const OrderView = () => {
  const location = useLocation();
  const query = location.search.substring(1); 
  const orderId = query.startsWith('ODR-') ? query : null;

  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (orderId) {
        try {
          const orderData = await getOrder(orderId);
          setOrderDetails(orderData.order); // Assuming the order data is nested under `order`
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500 text-xl">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      {orderDetails ? (
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Order Details</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-gray-600"><strong>Order ID:</strong> {orderDetails.orderId}</p>
              <p className="text-gray-600"><strong>Name:</strong> {orderDetails.name}</p>
              <p className="text-gray-600"><strong>Email:</strong> {orderDetails.email}</p>
              <p className="text-gray-600"><strong>Address:</strong> {orderDetails.address}, {orderDetails.city}, {orderDetails.country}</p>
              <p className="text-gray-600"><strong>Total Amount:</strong> ${orderDetails.totalAmount}</p>
            </div>

            <div className="flex justify-end">
              <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow-md w-1/2 text-center">
                <strong>Status:</strong>
                <p className="text-lg">{orderDetails.status}</p>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-4">Items</h2>
          <div className="space-y-4">
            {orderDetails.items.map((item) => (
              <div key={item.productId} className="border p-4 rounded-lg shadow-sm bg-gray-50">
                <p className="text-gray-700"><strong>Product Name:</strong> {item.name}</p>
                <p className="text-gray-700"><strong>Quantity:</strong> {item.quantity}</p>
                <p className="text-gray-700"><strong>Price:</strong> ${item.price}</p>
                <p className="text-gray-700"><strong>Total Item Price:</strong> ${item.totalItemPrice}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-gray-700 text-center">No order details found.</div>
      )}
    </div>
  );
};

export default OrderView;
