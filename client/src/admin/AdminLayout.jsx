import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AdminHeader from "./components/AdminHeader";

const AdminLayout = () => {
    return (
        <div className="admin-wrapper" >
            <Sidebar />
            <div className="admin-content" >
                <AdminHeader />
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
