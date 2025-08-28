import React, { useState, useEffect } from "react";

export default function Dashboard() {
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [product, setProduct] = useState({
        id: null,
        name: "",
        price: "",
        stock: "",
        category: "",
        description: "",
    });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/api/home/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle add or edit API call here
        setShowModal(false);
        setIsEdit(false);
        setProduct({ id: null, name: "", price: "", stock: "", category: "", description: "" });
        alert(isEdit ? "Product updated!" : "Product added!");
    };

    const handleEdit = (prod) => {
        setProduct({
            id: prod.id,
            name: prod.productname,
            price: prod.productprice,
            stock: prod.productcountinstock,
            category: prod.productcatagory,
            description: prod.productdescription,
        });
        setIsEdit(true);
        setShowModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <header className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    onClick={() => {
                        setShowModal(true);
                        setIsEdit(false);
                        setProduct({ id: null, name: "", price: "", stock: "", category: "", description: "" });
                    }}
                >
                    Add Product
                </button>
            </header>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">{isEdit ? "Edit Product" : "Add Product"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={product.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={product.price}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Stock</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={product.stock}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={product.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={product.description}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                                    onClick={() => {
                                        setShowModal(false);
                                        setIsEdit(false);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    {isEdit ? "Update" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Products Table */}
            <section className="bg-white rounded-lg shadow p-6 mt-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Products</h2>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">ID</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Price</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Stock</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Category</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Description</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((prod) => (
                                    <tr key={prod.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 text-sm text-gray-700">{prod.id}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{prod.productname}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{prod.productprice}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{prod.productcountinstock}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{prod.productcatagory}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{prod.productdescription}</td>
                                        <td className="px-4 py-2 text-sm">
                                            <button
                                                className="px-3 py-1 rounded bg-yellow-400 text-white hover:bg-yellow-500"
                                                onClick={() => handleEdit(prod)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}