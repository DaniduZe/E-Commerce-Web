import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { completePayment } from '../../services/orderService';

const PaymentComponent = ({ orderDetails }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.payhere) {
      // Set up payment callbacks
      window.payhere.onCompleted = function (orderId) {
        console.log("Payment completed. OrderID: " + orderId);

          completePayment(orderId, orderDetails.order.userId);
          navigate('/order-completed');
        };

      window.payhere.onDismissed = function () {
        console.log("Payment dismissed");
        // Handle payment dismissal
      };

      window.payhere.onError = function (error) {
        console.error("Error: " + error);
        // Handle payment error
      };

      // Ensure orderDetails and nested objects are not undefined
      if (orderDetails && orderDetails.order && orderDetails.paymentData) {
        const payment = {
          sandbox: true,
          merchant_id: orderDetails.paymentData.merchantId,
          return_url: 'http://localhost:3000/shop',
          cancel_url: 'http://localhost:3000/shop',
          notify_url: 'http://sample.com/notify',
          order_id: orderDetails.paymentData.orderId,
          items: 'XXX',
          amount: orderDetails.paymentData.amount,
          currency: orderDetails.paymentData.currency,
          hash: orderDetails.paymentData.hash,
          first_name: orderDetails.order.name.split(' ')[0], // Extract first name
          last_name: orderDetails.order.name.split(' ')[1] || '', // Extract last name
          email: orderDetails.order.email,
          phone: orderDetails.order.phone,
          address: orderDetails.order.address,
          city: orderDetails.order.city,
          country: orderDetails.order.country,
          delivery_address: orderDetails.order.address,
          delivery_city: orderDetails.order.city,
          delivery_country: orderDetails.order.country,
          custom_1: '',
          custom_2: ''
        };

        // Start the payment process
        window.payhere.startPayment(payment);
      } else {
        console.error("Invalid order details provided");
      }
    } else {
      console.error('PayHere is not loaded');
    }
  }, [orderDetails]);

  return (
    <Helmet>
      <script type="text/javascript" src="https://www.payhere.lk/lib/payhere.js"></script>
    </Helmet>
  );
};

export default PaymentComponent;
