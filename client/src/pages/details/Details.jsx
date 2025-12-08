import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Nav, Tab } from "react-bootstrap";
import ProductDetailsSlider from "../../layout/productDetailsSlider/ProductDetailsSlider.jsx";
import { getOne, deleteProduct } from "../../services/productService";
import UserContext from "../../context/UserContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAdmin } = useContext(UserContext);

    const [product, setProduct] = useState(null);
    const [activeTab, setActiveTab] = useState("description");

    useEffect(() => {
        getOne(id)
            .then(setProduct)
            .catch(err => toast.error(err.message));
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await deleteProduct(id);
            toast.success("Product deleted");
            navigate("/catalog");
        } catch (err) {
            toast.error(err.message);
        }
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div>
            {/* Breadcrumb */}
            <div className="fz-inner-page-breadcrumb">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-12">
                            <div className="breadcrumb-txt">
                                <h1>Product details</h1>
                                <ul className="fz-inner-page-breadcrumb-nav">
                                    <li><Link to="/">Home</Link></li>
                                    <li className="current-page">{product.brand} {product.model}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Section */}
            <section className="fz-product-details">
                <div className="container">
                    <div className="row align-items-start justify-content-center">

                        {/* IMAGES */}
                        <div className="col-lg-5 col-md-6 col-12 col-xxs-12">
                            <ProductDetailsSlider images={product.images} />
                        </div>

                        {/* PRODUCT TEXT */}
                        <div className="col-lg-7 col-md-6">
                            <div className="fz-product-details__txt">

                                <h2 className="fz-product-details__title">
                                    {product.brand} {product.model}
                                </h2>

                                {/* PRICE + RATING */}
                                <div className="fz-product-details__price-rating">
                                    <span className="price">${product.price}</span>

                                    <div className="rating">
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-light fa-star"></i>
                                    </div>
                                </div>

                                {/* PRODUCT INFO */}
                                <div className="fz-product-details__infos">
                                    <ul>
                                        <li><span className="info-property">SKU</span> : {product.sku}</li>
                                        <li><span className="info-property">Category</span> : {product.category}</li>
                                        <li><span className="info-property">Availability</span> :
                                            <span className="info-value">
                                                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                {/* SHORT DESCRIPTION */}
                                <p className="fz-product-details__short-descr">
                                    {product.shortDescription}
                                </p>

                                {/* ACTION BUTTONS */}
                                <div className="fz-product-details__actions">
                                    <div className="fz-product-details__quantity cart-product__quantity">
                                        <button className="minus-btn cart-product__minus">
                                            <i className="fa-light fa-minus"></i>
                                        </button>
                                        <input type="number" defaultValue="1" min="1" />
                                        <button className="plus-btn cart-product__plus">
                                            <i className="fa-light fa-plus"></i>
                                        </button>
                                    </div>

                                    <button className="fz-product-details__add-to-cart">Add to cart</button>

                                    <button className="fz-product-details__add-to-wishlist">
                                        <i className="fa-light fa-heart"></i>
                                    </button>
                                </div>

                                {/* ADMIN ACTIONS */}
                                {isAdmin && (
                                    <div className="fz-product-details__actions mt-3">
                                        <button
                                            onClick={() => navigate(`/admin/products/${product._id}`)}
                                            className="fz-product-details__add-to-cart"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={handleDelete}
                                            className="fz-product-details__add-to-cart"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}

                            </div>
                        </div>

                        {/* TABS */}
                        <div className="col-12">
                            <div className="fz-product-details__additional-info">

                                <Nav activeKey={activeTab} onSelect={setActiveTab} className="nav nav-tabs">
                                    <Nav.Item>
                                        <Nav.Link eventKey="description">Description</Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="review">Reviews</Nav.Link>
                                    </Nav.Item>
                                </Nav>

                                <Tab.Content>

                                    {/* DESCRIPTION TAB */}
                                    <Tab.Pane
                                        eventKey="description"
                                        className={`tab-pane ${activeTab === 'description' ? 'show active' : ''}`}
                                    >
                                        <div className="fz-product-details__descr">
                                            <p style={{ whiteSpace: "pre-line" }}>
                                                {product.description}
                                            </p>
                                        </div>
                                    </Tab.Pane>

                                    {/* REVIEWS TAB */}
                                    <Tab.Pane
                                        eventKey="review"
                                        className={`tab-pane ${activeTab === 'review' ? 'show active' : ''}`}
                                    >
                                        <h4 className="reviews-title">Reviews</h4>
                                        <div className="fz-product-details__actions mt-3">
                                            <button
                                                onClick={() => navigate(`/reviews/create`)}
                                                className="fz-product-details__add-to-cart"
                                            >
                                                Leave a review
                                            </button>
                                        </div>
                                        <p>No reviews yet. <Link to="/reviews/create">Be the first one to leave a
                                            review!</Link></p>
                                    </Tab.Pane>

                                </Tab.Content>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
};

export default ProductDetails;
