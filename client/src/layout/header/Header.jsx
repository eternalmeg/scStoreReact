import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="clean-header">
            <div className="header-container">

                {/* LOGO */}
                <div className="header-logo">
                    <Link to="/">
                        <img src="/assets/images/logo-1.png" alt="logo" />
                    </Link>
                </div>

                {/* NAVIGATION */}
                <nav className={`header-nav ${mobileOpen ? "open" : ""}`}>
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/about">About</Link>
                    <Link to="/wishlist">Wishlist</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/profile">Profile</Link>
                </nav>

                {/* RIGHT ACTIONS */}
                <div className="header-actions">
                    {/* SEARCH */}
                    <form className="search-form">
                        <input type="text" placeholder="Search keyword" />
                        <button type="submit">
                            <i className="fa-regular fa-magnifying-glass"></i>
                        </button>
                    </form>

                    {/* WISHLIST */}
                    <button className="icon-btn">
                        <i className="fa-light fa-heart"></i>
                        <span className="count">0</span>
                    </button>

                    {/* CART */}
                    <button className="icon-btn">
                        <i className="fa-light fa-shopping-bag"></i>
                        <span className="count">0</span>
                    </button>

                    {/* MOBILE BURGER */}
                    <button className="mobile-burger" onClick={() => setMobileOpen(!mobileOpen)}>
                        <i className="fa-light fa-bars-sort"></i>
                    </button>
                </div>

            </div>
        </header>
    );
}

