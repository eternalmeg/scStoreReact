import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import {getLatest} from "../../services/productService.js";
import Offer from "../../layout/offer/Offer.jsx";


const Home = () => {
    const [latest, setLatest] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLatest()
            .then(data => setLatest(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            {/* Banner */}
            <section className="fz-5-banner-section fz-5-banner-slider">
                <Swiper autoplay={true} loop={true} modules={[Autoplay]}>
                    <SwiperSlide className="fz-5-banner-slider-1">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="fz-5-banner-txt">
                                        <h3>Sc Store</h3>
                                        <h1>Right place for you</h1>
                                        <Link to="/catalog" className="fz-5-def-btn">
                                            Catalog
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide className="fz-5-banner-slider-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="fz-5-banner-txt">
                                        <h3>Sc Store</h3>
                                        <h1>Find what you need</h1>
                                        <Link to="/catalog" className="fz-5-def-btn">
                                            Shop Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide className="fz-5-banner-slider-3">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="fz-5-banner-txt">
                                        <h3>Sc Store</h3>
                                        <h1>Find best offer</h1>
                                        <Link to="/catalog" className="fz-5-def-btn">
                                            Shop Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>

            {/* Latest Products */}
            <section className="fz-5-product pt-120 pb-120">
                <div className="container">
                    <div className="row g-xl-4 g-lg-3 g-4">
                        <div className="col-12">
                            <div className="row g-xl-4 g-lg-3 g-2">

                                {/* Title box */}
                                <div className="col-lg-3 col-md-4 col-6">
                                    <div className="fz-5-product-title-box">
                                        <h3>Latest offers</h3>
                                        <p>Check our latest offers or see all amazing products.</p>
                                        <Link to="/catalog" className="fz-5-def-btn-2">
                                            View Catalog
                                        </Link>
                                    </div>
                                </div>

                                {/* Loading */}
                                {loading && (
                                    <p style={{ paddingLeft: "20px" }}>Loading latest products...</p>
                                )}

                                {/* No products */}
                                {!loading && latest.length === 0 && (
                                    <p style={{ paddingLeft: "20px" }}>No products available.</p>
                                )}

                                {/* Render products */}
                                {!loading &&
                                    latest.map(product => (
                                        <div
                                            key={product._id}
                                            className="col-lg-3 col-md-4 col-6"
                                        >
                                            <div className="fz-5-single-product">
                                                <div className="fz-5-single-product-img">
                                                    <img
                                                        src={product.images?.[0] || "/assets/images/placeholder.png"}
                                                        alt={product.model}
                                                    />
                                                </div>

                                                <div className="fz-5-single-product-txt">
                                                    <h3 className="fz-5-single-product-title">
                                                        <Link to={`/details/${product._id}`}>
                                                            {product.brand} {product.model}
                                                        </Link>
                                                    </h3>
                                                    <p className="fz-5-single-product-price">
                                                        ${product.price}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

<Offer />
        </div>


    );
};

export default Home;
