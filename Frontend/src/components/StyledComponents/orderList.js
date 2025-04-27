import React, { useEffect, useState } from "react";
import { fetchCart } from "../../services/cartService";

function OrderList() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderList;
