import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/Product/ProductList';
import Banner from '../components/StyledComponents/Banner';
import Cards from '../components/StyledComponents/Cards';
import Footer from '../components/StyledComponents/Footer';
import Reviews from '../components/StyledComponents/Reviews';
import productService from '../services/productService';

function HomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    productService.getTrendingProducts().then(data => setProducts(data));
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product?id=${id}`);
  };

  return (
    <div>
      <Banner />
      <br />
      <Cards />
      <br />
      <h1 className='font-bold text-5xl text-center mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16'>
        Trending Products
      </h1>

      <ProductList products={products} onProductClick={handleProductClick} />
      <Reviews />
      <br></br>
      <Footer />
    </div>
  );
}

export default HomePage;
