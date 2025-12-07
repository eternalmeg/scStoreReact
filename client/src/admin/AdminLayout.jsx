import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AdminHeader from "./components/AdminHeader";

const AdminLayout = () => {
    return (
        <div className="admin-wrapper" style={{ display: "flex" }}>
            <Sidebar />
            <div className="admin-content" style={{ flexGrow: 1 }}>
                <AdminHeader />
                <div style={{ padding: "20px" }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
