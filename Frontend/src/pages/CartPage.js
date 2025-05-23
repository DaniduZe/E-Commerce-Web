import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCart, removeProductFromCart, updateProductQuantity } from '../services/cartService';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await fetchCart();
        setCart(cartData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  const handleQuantityChange = async (productId, quantity) => {
    const updatedQuantity = quantity || 0;
  
    try {
      await updateProductQuantity(cart.userId, productId, updatedQuantity);

      const updatedItems = cart.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: updatedQuantity, totalItemPrice: item.price * updatedQuantity }
          : item
      );
      const updatedCart = {
        ...cart,
        items: updatedItems,
        totalAmount: updatedItems.reduce((acc, item) => acc + item.totalItemPrice, 0),
      };
  
      setCart(updatedCart);
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleRemoveItem = async (productId) => {
    try {
      await removeProductFromCart(cart.userId, productId);

      const updatedItems = cart.items.filter((item) => item.productId !== productId);
      const updatedCart = {
        ...cart,
        items: updatedItems,
        totalAmount: updatedItems.reduce((acc, item) => acc + item.totalItemPrice, 0),
      };

      setCart(updatedCart);
    } catch (err) {
      setError(err.message);
    }
  };

  const closePopup = () => {
    setError(null);
    navigate('/');
  };

  const checkoutHandle = () =>{
    navigate('/checkout');
  } 

  if (loading) return <div>Loading...</div>;
  if (error) {
    return (
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
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <header className="text-center">
          <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
        </header>

        <div className="mt-8">
          <ul className="space-y-4">
            {cart.items.map((item) => (
              <li key={item.productId} className="flex items-center gap-4">
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  className="size-16 rounded object-cover"
                />

                <div>
                  <h3 className="text-sm text-gray-900">{item.name}</h3>
                  <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                      <dt className="inline">Price:</dt>
                      <dd className="inline">{item.price}</dd>
                    </div>
                    <div>
                      <dt className="inline">Availability:</dt>
                      <dd className="inline">{item.availability}</dd>
                    </div>
                  </dl>
                </div>

                <div className="flex flex-1 items-center justify-end gap-2">
                  <label htmlFor={`LineQty-${item.productId}`} className="sr-only">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    max={item.availability}
                    value={item.quantity}
                    id={`LineQty-${item.productId}`}
                    className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                    onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                  />

                  <button
                    className="text-gray-600 transition hover:text-red-600"
                    onClick={() => handleRemoveItem(item.productId)}
                  >
                    <span className="sr-only">Remove item</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
            <div className="w-screen max-w-lg space-y-4">
              <dl className="space-y-0.5 text-sm text-gray-700">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd>Rs.{cart.totalAmount}</dd>
                </div>

                <div className="flex justify-between">
                  <dt>Discount</dt>
                  <dd>Rs.0</dd>
                </div>

                <div className="flex justify-between !text-base font-medium">
                  <dt>Total</dt>
                  <dd>Rs.{cart.totalAmount}</dd>
                </div>
              </dl>
              <div className="flex justify-end">
                <a
                  onClick={checkoutHandle}
                  className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                >
                  Checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
