import React from "react";
import { NavLink } from "react-router-dom";


const Sidebar = () => {
    return (
        <aside className="admin-sidebar">
            <h2 className="admin-sidebar__title">Admin Panel</h2>

            <nav className="admin-sidebar__nav">
                <NavLink end to="/admin" className="admin-link">
                    Dashboard
                </NavLink>

                <NavLink to="/admin/products" className="admin-link">
                    Products
                </NavLink>

                <NavLink to="/admin/users" className="admin-link">
                    Users
                </NavLink>

                <NavLink to="/admin/reviews" className="admin-link">
                    Reviews
                </NavLink>


                <NavLink to="/admin/orders" className="admin-link">
                    Orders
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;
