

import Header from "./layout/header/Header.jsx";
import Footer from "./layout/footer/Footer.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./layout/login/Login.jsx";
import Register from "./layout/register/Register.jsx";

function App() {
    return (
        <>

            <Header/>

            <main className={"fz-5-body"}>


                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>

            <Footer/>

        </>
    );
}

export default App;
