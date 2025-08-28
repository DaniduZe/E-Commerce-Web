import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/CheckoutPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrderCompleted from './pages/OrderCompletedPage';
import OrderView from './pages/OrderView';
import ProductDetailPage from './pages/ProductDetailPage';
import ShopPage from './pages/ShopPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div
      className="App min-h-screen flex flex-col"
      style={{
      }}
    >
      <Navbar />
      <div className="flex-grow"> 
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-completed" element={<OrderCompleted />} />
          <Route path="/order-view" element={<OrderView />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
