import React, { useState } from 'react';
import PaymentComponent from '../components/Payment/PayHere';
import OrderList from '../components/StyledComponents/orderList';
import { createOrder } from '../services/orderService';

function Checkout() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        address: '',
        city: '',
        country: '',
        province: '',
        postal_code: '',
        phone: '',
    });

    const [orderDetails, setOrderDetails] = useState(null); // State to hold order details

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createOrder(
                formData.first_name,
                formData.last_name,
                formData.address,
                formData.city,
                formData.country,
                formData.province,
                formData.postal_code,
                formData.phone
            );
            setOrderDetails(response); // Set order details for payment
        } catch (error) {
            console.error('Error placing order:', error.message);
            alert(error.message);
        }
    };

    return (
        <section className="bg-gray-100">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                    <div className="lg:col-span-2 lg:py-12">
                        <OrderList />
                    </div>

                    <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <header className="text-center">
                                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Delivery Details</h1>
                            </header>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="sr-only" htmlFor="first_name">First Name</label>
                                    <input
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="First Name"
                                        type="text"
                                        id="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="sr-only" htmlFor="last_name">Last Name</label>
                                    <input
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="Last Name"
                                        type="text"
                                        id="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="sr-only" htmlFor="address">Address</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Address"
                                    type="text"
                                    id="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="sr-only" htmlFor="city">City</label>
                                    <input
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="City"
                                        type="text"
                                        id="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="sr-only" htmlFor="country">Country</label>
                                    <input
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="Country"
                                        type="text"
                                        id="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="sr-only" htmlFor="province">State / Province</label>
                                    <input
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="State / Province"
                                        type="text"
                                        id="province"
                                        value={formData.province}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="sr-only" htmlFor="postal_code">Postal Code</label>
                                    <input
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="Postal Code"
                                        type="number"
                                        id="postal_code"
                                        value={formData.postal_code}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="sr-only" htmlFor="phone">Phone</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Phone Number"
                                    type="tel"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                                >
                                    Place Order
                                </button>
                            </div>
                        </form>
                        {orderDetails && <PaymentComponent orderDetails={orderDetails} />}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Checkout;
