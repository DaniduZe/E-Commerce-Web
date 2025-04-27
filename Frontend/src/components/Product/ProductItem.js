
import React from 'react';

function ProductItem({ product, onClick }) {
  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={product.productImageUrl}
          alt={product.productName}
          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
        />
      </div>

      {/* Product Name */}
      <h3 className="mt-4 text-sm font-semibold text-gray-700">{product.productName}</h3>

      {/* Product Price */}
      <p className="mt-1 text-lg font-bold text-gray-900">Rs.{product.productPrice}</p>

      {/* Stock Information */}
      <p className={`mt-1 text-sm ${product.productCountInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {product.productCountInStock > 0
          ? `In Stock: ${product.productCountInStock}`
          : 'Out of Stock'}
      </p>

      {/* Action Button */}
      <button
  className="mt-4 w-full py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-900 transition-colors"
  onClick={onClick}
> View Details
</button>
    </div>
  );
}

export default ProductItem;

