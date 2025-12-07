import React from 'react'
import { Link } from 'react-router-dom'

const Catalog = () => {
    return (
        <div>
            <div className="fz-inner-page-breadcrumb">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-12">
                            <div className="breadcrumb-txt">
                                <h1>Catalog</h1>
                                <ul className="fz-inner-page-breadcrumb-nav">
                                    <li><Link to="/">Home</Link></li>
                                    <li className="current-page">Catalog</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="shop-area">
                <div className="container">
                    <div className="row gy-5 justify-content-center">
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8 col-9 col-xxs-12 order-1 order-lg-0">
                            <div className="fz-sidebar">
                                <section className="sidebar-single-area product-search-area">
                                    <h3 className="sidebar-single-area__title">Search Product</h3>
                                    <form role="search" className="fz-product-search-form">
                                        <input
                                            type="search"
                                            id="woocommerce-product-search-field-0"
                                            className="search-field"
                                            placeholder="Search products…"

                                        />
                                        <button type="submit" value="Search"><i
                                            className="fa-light fa-magnifying-glass"></i></button>
                                    </form>
                                </section>


                            </div>
                        </div>

                        <div className="col-xl-9 col-lg-8 order-0 order-lg-1">
                            <div className={`fz-inner-products-container `}>
                                <div className="row justify-content-center">


                                            <div className="col-xl-4 col-md-4 col-6 col-xxs-12" >
                                                <div className="fz-1-single-product">
                                                    <div className="fz-single-product__img">
                                                        <img src="/assets/images/home3.webp" alt=""/>
                                                        <div className="fz-single-product__actions">
                                                            <button
                                                                className="fz-add-to-wishlist-btn"

                                                            >
                                                                <span className="btn-txt">add To wishlist</span>
                                                                <span className="btn-icon">
                                                                    <i className="fa-light fa-heart"></i></span>

                                                            </button>


                                                        </div>
                                                    </div>

                                                    <div className="fz-single-product__txt">
                                                        <span
                                                            className="fz-single-product__category list-view-text"></span>
                                                        <Link to="/details"
                                                              className="fz-single-product__title">Dell hjajasgkd jfhfjhfj hjghgjgj hgjjgjh</Link>
                                                        <div className="fz-single-product__price-rating">
                                                            <p className="fz-single-product__price">
                                                                <span className="current-price">$120</span>
                                                            </p>

                                                            <div className="rating list-view-text">
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-solid fa-star"></i>
                                                                <i className="fa-light fa-star"></i>
                                                            </div>
                                                        </div>

                                                        <p className="fz-single-product__desc list-view-text">
                                                            2021 Latest G5 3200DPI Gaming Mouse 7-Color RGB Breathing
                                                            Led Light for Notebook Laptop/PC RGB Backlit Universal.
                                                        </p>

                                                        <div className="fz-single-product__actions list-view-text">
                                                            <button
                                                                className="fz-add-to-wishlist-btn"

                                                            >
                                                                <span className="btn-txt">add To wishlist</span>

                                                            </button>

                                                            <button
                                                                className="fz-add-to-cart-btn"

                                                            >
                                                                <span className="btn-txt">add To cart</span>
                                                                <span className="btn-icon"><i
                                                                    className="fa-light fa-cart-shopping"></i></span>
                                                            </button>

                                                            <button className="fz-add-to-compare-btn">
                                                                <span className="btn-txt">select to compare</span>
                                                                <span className="btn-icon"><i
                                                                    className="fa-light fa-arrow-right-arrow-left"></i></span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Catalog;