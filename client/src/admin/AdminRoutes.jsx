import React from "react";
import { Route } from "react-router-dom";

import AdminLayout from "./AdminLayout";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/Products/ProductList";
import ProductForm from "./pages/Products/ProductForm";
import ProductEdit from "./pages/Products/ProductEdit";
import UserList from "./pages/Users/UserList";
import UserEdit from "./pages/Users/UserEdit";
import ReviewList from "./pages/Reviews/ReviewList";

export const AdminRoutes = (
    <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="products" element={<ProductList />} />
        <Route path="products/create" element={<ProductForm />} />
        <Route path="products/:id" element={<ProductEdit />} />

        <Route path="users" element={<UserList />} />
        <Route path="users/:id" element={<UserEdit />} />

        <Route path="reviews" element={<ReviewList />} />
    </Route>
);
