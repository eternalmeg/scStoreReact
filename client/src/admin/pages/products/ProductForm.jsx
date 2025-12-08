import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

import { uploadToCloudinary } from "../../../services/cloudinaryService";
import { createProduct } from "../../../services/productService";

const ProductForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        sku: "",
        price: "",
        category: "Laptop",
        quantity: "",
        shortDescription: "",
        description: "",
        images: [] // FILE OBJECTS!!!
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };


    const handleImages = (e) => {
        setFormData(prev => ({
            ...prev,
            images: [...e.target.files]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Upload all images to Cloudinary
            const uploadedUrls = [];

            for (const img of formData.images) {
                const url = await uploadToCloudinary(img);
                uploadedUrls.push(url);
            }

            const newProduct = {
                brand: formData.brand,
                model: formData.model,
                sku: formData.sku,
                price: Number(formData.price),
                category: formData.category,
                quantity: Number(formData.quantity),
                shortDescription: formData.shortDescription,
                description: formData.description,
                images: uploadedUrls,
            };

            await createProduct(newProduct);

            toast.success("Product created successfully!");
            navigate("/admin/products");

        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    };

    return (
        <div>
            <div className="fz-inner-page-breadcrumb">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-12">
                            <div className="breadcrumb-txt">
                                <h1>Admin</h1>
                                <ul className="fz-inner-page-breadcrumb-nav">
                                    <li><Link to="/">Home</Link></li>
                                    <li className="current-page">Create</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="fz-inner-contact-details">
                    <div className="fz-inner-contact-details__left">
                        <div className="fz-blog-details__comment-form">
                            <h4 className="fz-comment-form__title fz-inner-contact-details__title">
                                Create Product
                            </h4>

                            <form onSubmit={handleSubmit}>
                                <div className="row g-xl-4 g-3">

                                    <div className="col-6">
                                        <input
                                            type="text"
                                            name="brand"
                                            placeholder="Brand"
                                            value={formData.brand}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-6">
                                        <input
                                            type="text"
                                            name="model"
                                            placeholder="Model"
                                            value={formData.model}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-6">
                                        <input
                                            type="text"
                                            name="sku"
                                            placeholder="SKU"
                                            value={formData.sku}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-6">
                                        <input
                                            type="number"
                                            name="price"
                                            placeholder="Price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-6">
                                        <Form.Select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                        >
                                            <option value="Laptop">Laptop</option>
                                            <option value="Desktop">Desktop</option>
                                            <option value="Server">Server</option>
                                            <option value="Tablet">Tablet</option>
                                            <option value="Phone">Phone</option>
                                        </Form.Select>
                                    </div>

                                    <div className="col-6">
                                        <input
                                            type="number"
                                            name="quantity"
                                            placeholder="Quantity"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <textarea
                                            name="shortDescription"
                                            placeholder="Short description"
                                            value={formData.shortDescription}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="col-12">
                                        <textarea
                                            name="description"
                                            placeholder="Description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>

                                    {/* Images Upload */}
                                    <div className="col-12">
                                        <label>Product Images (max 5)</label>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImages}
                                        />
                                    </div>

                                    {/* Images Preview */}
                                    {formData.images.length > 0 && (
                                        <div className="col-12">
                                            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                                {Array.from(formData.images).map((img, i) => (
                                                    <img
                                                        key={i}
                                                        src={URL.createObjectURL(img)}
                                                        alt="preview"
                                                        width="100"
                                                        style={{ borderRadius: "8px" }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </div>

                                <button type="submit" className="fz-1-banner-btn fz-comment-form__btn">
                                    Create Product
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductForm;
