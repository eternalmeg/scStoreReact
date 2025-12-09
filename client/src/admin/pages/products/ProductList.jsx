import React from "react";
import { Link } from "react-router-dom";
import * as productService from "../../../services/productService";
import useFetch from "../../../hooks/useFetch";

export default function ProductList() {
    const {
        data: products,
        setData: setProducts,
        loading,
        error
    } = useFetch(() => productService.getAll(), []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            await productService.deleteProduct(id);
            setProducts(prev => prev.filter(p => p._id !== id));
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <h3>Loading products...</h3>;
    if (error) return <p>Error loading products</p>;

    return (
        <div className="admin-product-list container">
            <div className="d-flex justify-content-between align-items-center my-3">
                <h2>Products</h2>
                <Link to="/admin/products/create" className="btn btn-primary">
                    + Create Product
                </Link>
            </div>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>SKU</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {products?.map((p, index) => (
                    <tr key={p._id}>
                        <td>{index + 1}</td>
                        <td>{p.brand}</td>
                        <td>{p.model}</td>
                        <td>{p.sku}</td>
                        <td>{p.price} $</td>
                        <td>{p.quantity}</td>
                        <td>
                            <Link
                                to={`/admin/products/${p._id}`}
                                className="btn btn-warning btn-sm me-2"
                            >
                                Edit
                            </Link>

                            <button
                                onClick={() => handleDelete(p._id)}
                                className="btn btn-danger btn-sm"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {products?.length === 0 && <p>No products found.</p>}
        </div>
    );
}
