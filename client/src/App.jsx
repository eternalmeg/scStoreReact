

import Header from "./layout/header/Header.jsx";
import Footer from "./layout/footer/Footer.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./layout/login/Login.jsx";
import Register from "./layout/register/Register.jsx";
import Catalog from "./pages/catalog/Catalog.jsx";
import ProductDetails from "./pages/details/ProductDetails.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Wishlist from "./pages/wishlist/Wishlist.jsx";
import {AdminRoutes} from "./admin/AdminRoutes.jsx";
import ReviewForm from "./layout/reviewForm/ReviewForm.jsx";
import {UserPanelRoutes} from "./users/UserPanelRoutes.jsx";
import ProtectedRoute from "./guards/ProtectedRoute.jsx";



function App() {
    return (
        <>

            <Header/>

            <main className={"fz-5-body"}>


                <Routes>

                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />

                    <Route path="/register" element={<Register />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/details/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route
                        path="/product/:id/review/create"
                        element={
                            <ProtectedRoute>
                                <ReviewForm />
                            </ProtectedRoute>
                        }
                    />



                    {AdminRoutes}
                    {UserPanelRoutes}



                </Routes>
            </main>

            <Footer/>

        </>
    );
}

export default App;
