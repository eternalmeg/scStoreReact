// src/user/UserPanelRoutes.jsx
import { Route } from "react-router-dom";

import UserLayout from "./UserLayout";
import UserProfile from "../users/pages/userProfile/UserProfile";

import ProtectedRoute from "../guards/ProtectedRoute";
import ProductList from "../admin/pages/products/ProductList.jsx";
import React from "react";
import ReviewForm from "../layout/reviewForm/ReviewForm.jsx";
import UserList from "../admin/pages/users/UserList.jsx";
import MyReviews from "./pages/reviews/MyReviews.jsx";
import ReviewEdit from "./pages/reviews/ReviewEdit.jsx"; // само логнати

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
        <Route path="reviews" element={<MyReviews />} />
        <Route path="reviews/:id/edit" element={<ReviewEdit />} />
    </Route>
);
