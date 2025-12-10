import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../../context/UserContext.jsx";
import {BASEURL} from "../../constants/constants.js";

const BASE_URL = BASEURL;



export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, isAuthenticated, isAdmin, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch(`${BASE_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });

            logout();
            navigate('/login');

        } catch (err) {
            console.log("Logout error:", err);
        }
    };

    return (
        <header className="clean-header">
            <div className="header-container">


                <div className="header-logo">
                    <Link to="/">
                        <img src="/assets/images/logo-1.png" alt="logo" />
                    </Link>
                </div>


                <nav className={`header-nav ${mobileOpen ? "open" : ""}`}>

                    <Link to="/">Home</Link>
                    <Link to="/catalog">Catalog</Link>
                    <Link to="/about">About</Link>





                    {isAuthenticated && (
                        <>
                            <Link to="/user">Profile</Link>


                            {isAdmin && (
                                <Link to="/admin">Admin Panel</Link>
                            )}

                            <button
                                className="logout-btn nav-btn"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    )}


                    {!isAuthenticated && (
                        <Link to="/login">
                            <i className="fa-regular fa-user-vneck me-2"></i>
                            Sign in
                        </Link>
                    )}
                </nav>


                <div className="header-actions">


                    <form className="search-form">
                        <input type="text" placeholder="Search keyword" />
                        <button type="submit">
                            <i className="fa-regular fa-magnifying-glass"></i>
                        </button>
                    </form>





                    {isAuthenticated && (
                        <Link to="/cart" className="icon-btn">
                            <i className="fa-light fa-shopping-bag"></i>
                            <span className="count">{user?.cart?.length ?? 0}</span>
                        </Link>

                    )}



                    <button
                        className="mobile-burger"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <i className="fa-light fa-bars-sort"></i>
                    </button>
                </div>

            </div>
        </header>
    );
}
