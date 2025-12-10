import React from "react";
import { Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/products/ProductList";
import ProductForm from "./pages/products/ProductForm";
import ProductEdit from "./pages/products/ProductEdit";
import UserList from "./pages/users/UserList";
import UserEdit from "./pages/users/UserEdit";
import ReviewList from "./pages/reviews/ReviewList";
import UserForm from "./pages/users/UserForm.jsx";
import AdminRoute from "../guards/AdminRoute";
import AdminOrderList from "./pages/orders/AdminOrderList.jsx";

export const AdminRoutes = (
    <Route
        path="/admin"
        element={
            <AdminRoute>
                <AdminLayout />
            </AdminRoute>
        }
    >
        <Route index element={<Dashboard />} />

        {/* Products */}
        <Route path="products" element={<ProductList />} />
        <Route path="products/create" element={<ProductForm />} />
        <Route path="products/:id" element={<ProductEdit />} />

        {/* Users */}
        <Route path="users" element={<UserList />} />
        <Route path="users/create" element={<UserForm />} />
        <Route path="users/:id" element={<UserEdit />} />

        {/* Reviews */}
        <Route path="reviews" element={<ReviewList />} />


        {/* Orders */}

        <Route path="orders" element={<AdminOrderList />} />

    </Route>
);
