// src/user/UserPanelRoutes.jsx
import { Route } from "react-router-dom";

import UserLayout from "./UserLayout";
import UserProfile from "../users/pages/userProfile/UserProfile";

import ProtectedRoute from "../guards/ProtectedRoute";
import ProductList from "../admin/pages/products/ProductList.jsx";
import React from "react";
import ReviewForm from "../layout/reviewForm/ReviewForm.jsx"; // само логнати

export const UserPanelRoutes = (
    <Route
        path="/user"
        element={
            <ProtectedRoute>
                <UserLayout />
            </ProtectedRoute>
        }
    >
        {/* Default page */}
        <Route index element={<UserProfile />} />

        {/* User subpages */}

    </Route>
);
