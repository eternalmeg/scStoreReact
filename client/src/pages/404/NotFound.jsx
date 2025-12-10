import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="notfound-wrapper">
            <h1 className="notfound-code">404</h1>
            <h2 className="notfound-title">Page not found</h2>

            <p className="notfound-text">
                The page you are looking for doesn&apos;t exist
                or may have been moved.
            </p>

            <div className="notfound-actions">
                <Link to="/" className="notfound-btn">
                    Go to Home
                </Link>

                <Link to="/catalog" className="notfound-btn secondary">
                    Browse Catalog
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
