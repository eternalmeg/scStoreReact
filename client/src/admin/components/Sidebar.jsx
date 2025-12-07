import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div
            style={{
                width: "220px",
                background: "#111",
                color: "#fff",
                minHeight: "100vh",
                padding: "20px"
            }}
        >
            <h3>Admin Panel</h3>

            <nav className="admin-nav">
                <NavLink to="/admin" end>Dashboard</NavLink>
                <NavLink to="/admin/products">Products</NavLink>
                <NavLink to="/admin/users">Users</NavLink>
                <NavLink to="/admin/reviews">Reviews</NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
