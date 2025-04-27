import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/Product/ProductList";
import Footer from "../components/StyledComponents/Footer";
import productService from "../services/productService";

function ShopPage() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      productService.getProducts().then(data => setProducts(data));
    }, []);
  
    const handleProductClick = (id) => {
      navigate(`/product?id=${id}`);
    };
  
    return (
      <div>
      <h1 className='font-bold text-5xl text-center mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16'>
        Products
      </h1>
        <ProductList products={products} onProductClick={handleProductClick} />
        <Footer />
      </div>
    );
}

export default ShopPage;