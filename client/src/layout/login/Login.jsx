import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../services/authService";
import {useUser} from "../../context/useUser.js";


const Login = () => {
    const { login: saveUser } = useUser();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await login(formData);
            saveUser(result);

            toast.success("Logged in!");
            navigate("/");
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <section className="fz-account-form-section">
            <div className="container">
                <div className="row g-4 justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-9 col-10 col-xxs-12">
                        <h3 className="single-form-title">Sign in</h3>

                        <form onSubmit={handleSubmit}>
                            <input type="text" name="email" placeholder="Email" onChange={handleChange} />
                            <input type="password" name="password" placeholder="Password" onChange={handleChange} />

                            <Link to="/register" className="password-recovery-btn">
                                Don’t have account yet? Register here.
                            </Link>

                            <button type="submit" className="fz-1-banner-btn single-form-btn">Log in</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;