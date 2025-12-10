import ReviewForm from "./layout/reviewForm/ReviewForm.jsx";
import ProtectedRoute from "./guards/ProtectedRoute.jsx";
import ProductDetails from "./pages/details/ProductDetails.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Catalog from "./pages/catalog/Catalog.jsx";
import Register from "./layout/register/Register.jsx";
import Login from "./layout/login/Login.jsx";
import Home from "./pages/home/Home.jsx";
import Header from "./layout/header/Header.jsx";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ErrorProvider } from "./context/ErrorContext.jsx";
import GlobalErrorHandler from "./context/GlobalErrorHandler.jsx";

import { AdminRoutes } from "./admin/AdminRoutes.jsx";
import { UserPanelRoutes } from "./users/UserPanelRoutes.jsx";
import Footer from "./layout/footer/Footer.jsx";
import NotFound from "./pages/404/NotFound.jsx";
import {wakeServer} from "./utils/WakeServerHelper.js";
import {BASEURL} from "./constants/constants.js";
import StartupLoader from "./layout/startupLoader/StartupLoader.jsx";
import About from "./pages/about/About.jsx";


function App() {
    const [waking, setWaking] = useState(true);

    useEffect(() => {
        wakeServer(BASEURL).then(() => {

            setWaking(false);
        });
    }, []);

    if (waking) {
        return <StartupLoader message="Warming up backend server..." />;
    }

    return (
        <ErrorProvider>


            <GlobalErrorHandler />
            <ToastContainer position="top-center" theme="colored" />


            <Header />

            <main className="fz-5-body">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/details/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/about" element={<About />} />

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
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>

            <Footer />
        </ErrorProvider>
    );
}

export default App;
