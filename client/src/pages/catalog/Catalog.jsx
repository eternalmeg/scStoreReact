import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll } from "../../services/productService.js";
import CatalogSidebar from "../../layout/catalogSidebar/CatalogSidebar.jsx";

const Catalog = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [searchValue, setSearchValue] = useState("");
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = async () => {
        setLoading(true);

        try {
            const data = await getAll();

            setAllProducts(data);
            setFilteredProducts(data);

            // extract categories dynamically
            const catMap = {};

            data.forEach(p => {
                const c = p.category || "Uncategorized";
                catMap[c] = (catMap[c] || 0) + 1;
            });

            const formatted = Object.keys(catMap).map(k => ({
                name: k,
                count: catMap[k]
            }));

            setCategories(formatted);
        } finally {
            setLoading(false);
        }
    };


    const applyFilters = (category, search) => {
        let result = [...allProducts];


        if (category) {
            result = result.filter(p => p.category === category);
        }


        const query = search.trim().toLowerCase();


        if (query !== "") {
            result = result.filter(p => {
                return (
                    p.brand.toLowerCase().includes(query) ||
                    p.model.toLowerCase().includes(query) ||
                    (p.category?.toLowerCase().includes(query)) ||
                    (p.shortDescription?.toLowerCase().includes(query)) ||
                    (p.description?.toLowerCase().includes(query))
                );
            });
        }

        setFilteredProducts(result);
    };



    const handleCategorySelect = (category) => {
        setActiveCategory(category);
        applyFilters(category, searchValue);
    };


    const handleSearch = (e) => {
        e.preventDefault();
        applyFilters(activeCategory, searchValue);
    };


    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);

        if (value === "") {
            applyFilters(activeCategory, "");
        }
    };

    return (
        <div>
            {/* Breadcrumb */}
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


                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                            <div className="fz-sidebar">


                                <section className="sidebar-single-area product-search-area">
                                    <h3 className="sidebar-single-area__title">Search Product</h3>

                                    <form className="fz-product-search-form" onSubmit={handleSearch}>
                                        <input
                                            type="search"
                                            placeholder="Search products…"
                                            value={searchValue}
                                            onChange={handleSearchChange}
                                        />
                                        <button type="submit">
                                            <i className="fa-light fa-magnifying-glass"></i>
                                        </button>
                                    </form>
                                </section>

                                {/* Categories */}
                                <CatalogSidebar
                                    categories={categories}
                                    activeCategory={activeCategory}
                                    onCategorySelect={handleCategorySelect}
                                />

                            </div>
                        </div>


                        <div className="col-xl-9 col-lg-8">
                            <div className="row">

                                {loading && <p>Loading...</p>}

                                {!loading && filteredProducts.length === 0 && (
                                    <p>No products found.</p>
                                )}

                                {filteredProducts.map((p) => (
                                    <div className="col-xl-4 col-md-4 col-6" key={p._id}>
                                        <div className="fz-1-single-product">

                                            <div className="fz-single-product__img">
                                                <img
                                                    src={p.images?.[0] || "/assets/images/no-image.png"}
                                                    alt={p.model}
                                                />
                                            </div>

                                            <div className="fz-single-product__txt">
                                                <Link to={`/details/${p._id}`}
                                                      className="fz-single-product__title">
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
