import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getAll, searchByBrand} from "../../services/productService.js";




const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getAll()
            .then(data => {
                setProducts(data);
            })
            .finally(() => setLoading(false));
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        if (searchValue.trim() === "") {
            return loadAllProducts(); // reset
        }

        try {
            const results = await searchByBrand(searchValue);
            setProducts(results);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            {/* Breadcrumb */}
            <div className="fz-inner-page-breadcrumb">
                <div className="container">
                    <h1>Catalog</h1>
                </div>
            </div>

            <div className="shop-area">
                <div className="container">
                    <div className="row gy-5 justify-content-center">

                        {/* Sidebar */}
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                            <div className="fz-sidebar">
                                <section className="sidebar-single-area product-search-area">
                                    <h3 className="sidebar-single-area__title">Search Product</h3>
                                    <form className="fz-product-search-form" onSubmit={handleSearch}>
                                        <input
                                            type="search"
                                            placeholder="Search products…"
                                            value={searchValue}
                                            onChange={(e) => {
                                                setSearchValue(e.target.value);
                                                if (e.target.value === "") {
                                                    loadAllProducts();
                                                }
                                            }}
                                        />
                                        <button type="submit">
                                            <i className="fa-light fa-magnifying-glass"></i>
                                        </button>
                                    </form>
                                </section>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="col-xl-9 col-lg-8">
                            <div className="row">

                                {loading && <p>Loading...</p>}

                                {!loading && products.length === 0 && (
                                    <p>No products found.</p>
                                )}

                                {!loading && products.map((p) => (
                                    <div className="col-xl-4 col-md-4 col-6" key={p._id}>
                                        <div className="fz-1-single-product">

                                            <div className="fz-single-product__img">
                                                <img
                                                    src={p.images?.[0] || "/assets/images/no-image.png"}
                                                    alt={p.model}
                                                />
                                            </div>

                                            <div className="fz-single-product__txt">
                                                <Link to={`/details/${p._id}`} className="fz-single-product__title">
                                                    {p.brand} {p.model}
                                                </Link>

                                                <p className="fz-single-product__price">
                                                    <span className="current-price">${p.price}</span>
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Catalog;
