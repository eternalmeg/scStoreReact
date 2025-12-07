import React from 'react'
import {Link} from "react-router-dom";
import { Nav, Tab } from 'react-bootstrap';
import ProductDetailsSlider from "../../layout/productDetailsSlider/ProductDetailsSlider.jsx";
import { useState } from 'react';

const ProductDetails = () => {
    const [activeTab, setActiveTab] = useState('description');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };


    return (
        <div>
            <div className="fz-inner-page-breadcrumb">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-12">
                            <div className="breadcrumb-txt">
                                <h1>Product details</h1>
                                <ul className="fz-inner-page-breadcrumb-nav">
                                    <li><Link to="/">Home</Link></li>
                                    <li className="current-page">Details</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="fz-product-details">
                <div className="container">
                    <div className="row align-items-start justify-content-center">
                        <div className="col-lg-5 col-md-6 col-12 col-xxs-12">
                            <ProductDetailsSlider/>
                        </div>


                        <div className="col-lg-7 col-md-6">
                            <div className="fz-product-details__txt">
                                <h2 className="fz-product-details__title"> Dell ALIENWARE AURORA R16
                                    </h2>
                                <div className="fz-product-details__price-rating">
                                    <span className="price">$1750.00</span>
                                    <div className="rating">
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-light fa-star"></i>
                                    </div>
                                </div>

                                <div className="fz-product-details__infos">
                                    <ul>
                                        <li><span className="info-property"> SKU </span> : <span
                                            className="info-value">D890f</span></li>
                                        <li><span className="info-property"> Category </span> : <span
                                            className="info-value">Gaming desktop</span></li>
                                        <li><span className="info-property"> Availablity </span> : <span
                                            className="info-value">in Stock</span></li>
                                    </ul>
                                </div>

                                <p className="fz-product-details__short-descr">
                                    Built to perform with an efficient design, experience a gaming desktop showcasing optimized thermals and lowered acoustics.
                                </p>

                                <div className="fz-product-details__actions">
                                    <div className="fz-product-details__quantity cart-product__quantity">
                                        <button className="minus-btn cart-product__minus"
                                        >
                                            <i className="fa-light fa-minus"></i>
                                        </button>
                                        <input
                                            type="number"
                                            name="product-quantity"
                                            className="cart-product-quantity-input"

                                        />
                                        <button className="plus-btn cart-product__plus"
                                        >
                                            <i className="fa-light fa-plus"></i>
                                        </button>
                                    </div>
                                    <button className="fz-product-details__add-to-cart">Add to cart</button>
                                    <button className="fz-product-details__add-to-wishlist"><i
                                        className="fa-light fa-heart"></i></button>
                                </div>
                                <div className="fz-product-details__actions">

                                    <button className="fz-product-details__add-to-cart">Edit</button>
                                    <button className="fz-product-details__add-to-cart">Delete</button>


                                </div>


                            </div>
                        </div>
                        <div className="col-12">
                            <div className="fz-product-details__additional-info">
                                <Nav
                                    activeKey={activeTab}
                                    onSelect={handleTabChange}
                                    className="nav nav-tabs"
                                    id="myTab"
                                >
                                    <Nav.Item className="nav-item" role="presentation">
                                        <Nav.Link
                                            className="nav-link"
                                            eventKey='description'
                                            id="descr-tab"
                                            role="button"
                                        >
                                            Description
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="nav-item" role="presentation">
                                        <Nav.Link
                                            className="nav-link"
                                            eventKey='review'
                                            id="review-tab"
                                            role="button"
                                        >
                                            Reviews
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey='description'
                                              className={`tab-pane ${activeTab === 'description' ? 'show active' : ''}`}>
                                        <div className="fz-product-details__descr">
                                            <p>

                                                Модел процесор: Intel Core 9 270H Модел видео карта: Nvidia GeForce RTX 5060 Оперативна памет: 16 GB
                                                Лаптопът Alienware 16 Aurora AC16250 е създаден за онези, които не правят компромиси. Независимо дали се потапяте в нова гейминг вселена, или работите по сложни творчески проекти, това устройство е готово да отговори на всяко предизвикателство.
                                            </p>


                                        </div>
                                    </Tab.Pane>


                                    <Tab.Pane eventKey='review'
                                              className={`tab-pane ${activeTab === 'review' ? 'show active' : ''}`}>
                                        <div className="user-reviews">
                                            <h4 className="reviews-title">Reviews of this product</h4>
                                            <div className="row g-4">
                                                <div className="col-xl-6">
                                                    <div className="single-review">
                                                        <div className="user">
                                                            <div className="user-img">
                                                                <img src="assets/images/user-1.png" alt="user"/>
                                                            </div>
                                                            <div className="user-info">
                                                                <h6 className="user-name">Eliza nolan</h6>

                                                            </div>
                                                        </div>

                                                        <div className="review">
                                                            <p>
                                                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                                Suscipit voluptatum quaerat nemo eaque delectus ratione
                                                                maiores expedita pariatur illum facilis at repellendus
                                                                nesciunt veniam animi, omnis corrupti reiciendis
                                                                explicabo itaque id. Maxime consequatur recusandae
                                                                fugiat accusamus ipsam reiciendis, officiis esse
                                                                assumenda voluptas aspernatur consequuntur? Eaque sed
                                                                quibusdam ipsum saepe nulla!
                                                            </p>

                                                            <div className="fz-product-details__actions">

                                                                <button
                                                                    className="fz-product-details__add-to-cart">Edit
                                                                </button>
                                                                <button
                                                                    className="fz-product-details__add-to-cart">Delete
                                                                </button>


                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


        </div>
    )
}

export default ProductDetails