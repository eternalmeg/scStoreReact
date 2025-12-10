import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { searchProducts } from "../../services/productService";

export default function SearchResults() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!query) return;

        setLoading(true);
        searchProducts(query)
            .then(data => setResults(data))
            .finally(() => setLoading(false));
    }, [query]);

    return (
        <div>

            <div className="fz-inner-page-breadcrumb">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-12">
                            <div className="breadcrumb-txt">
                                <h1>Search results</h1>
                                <ul className="fz-inner-page-breadcrumb-nav">
                                    <li><Link to="/">Home</Link></li>
                                    <li className="current-page">Search results for: <strong>{query}</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="container my-5">

                {loading && <p>Loading...</p>}

                {!loading && results.length === 0 && (
                    <p>No products found.</p>
                )}

                <div className="row gy-4">
                    {results.map(p => (
                        <div className="col-xl-3 col-md-4 col-6" key={p._id}>
                            <div className="fz-1-single-product">

                                <div className="fz-single-product__img">
                                    <Link to={`/details/${p._id}`}>
                                        <img
                                            src={p.images?.[0] || "/assets/images/no-image.png"}
                                            alt={p.model}
                                        />
                                    </Link>
                                </div>

                                <div className="fz-single-product__txt">
                                    <Link
                                        to={`/details/${p._id}`}
                                        className="fz-single-product__title"
                                    >
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
    );
}
