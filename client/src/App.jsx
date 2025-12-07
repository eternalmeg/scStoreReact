

import Header from "./layout/header/Header.jsx";
import Footer from "./layout/footer/Footer.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./layout/login/Login.jsx";
import Register from "./layout/register/Register.jsx";
import Catalog from "./pages/catalog/Catalog.jsx";
import ProductDetails from "./pages/details/Details.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Wishlist from "./pages/wishlist/Wishlist.jsx";
import UserProfile from "./pages/userProfile/UserProfile.jsx";
import ProductForm from "./pages/productForm/ProductForm.jsx";
import {AdminRoutes} from "./admin/AdminRoutes.jsx";
import AdminRoute from "./guards/AdminRoute.jsx";
import Dashboard from "./admin/pages/Dashboard.jsx";

function App() {
    return (
        <>

            <Header/>

            <main className={"fz-5-body"}>


                <Routes>
                    <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>}/>
                    <Route path="/admin/products/create" element={<AdminRoute><ProductForm /></AdminRoute>}/>
                    <Route path="/admin/products/edit/:id" element={<AdminRoute><ProductForm /></AdminRoute>}/>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/details" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/create" element={<ProductForm />} />
                    {AdminRoutes}

                </Routes>
            </main>

            <Footer/>

        </>
    );
}

export default App;
