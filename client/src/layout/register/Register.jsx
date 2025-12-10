import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../services/authService";
import { useUser } from "../../context/useUser";
import { useError } from "../../context/ErrorContext.jsx";

const Register = () => {
    const navigate = useNavigate();
    const { login: saveUser } = useUser();
    const { throwError } = useError();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        rePassword: "",
    });

    const handleChange = (e) => {
        setFormData(s => ({
            ...s,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (formData.password !== formData.rePassword) {
            return toast.error("Passwords do not match");
        }

        try {
            const result = await register(formData);

            saveUser(result);
            toast.success("Registered successfully!");
            navigate("/");

        } catch (err) {
            console.error("REGISTER ERROR =", err);


            if (err.type === "validation" || err.type === "auth") {
                return toast.error(err.message);
            }


            if (err.type === "network") {
                return toast.info("Server is waking up, please try again...");
            }


            if (["server", "forbidden", "notfound"].includes(err.type)) {
                return throwError(err.message);
            }

            // fallback
            toast.error("Unexpected error occurred");
        }
    };

    return (
        <section className="fz-account-form-section">
            <div className="container">
                <div className="row g-4 justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-9 col-10 col-xxs-12">
                        <h3 className="single-form-title">Sign up</h3>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone number"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />

                            <input
                                type="password"
                                name="rePassword"
                                placeholder="Repeat password"
                                value={formData.rePassword}
                                onChange={handleChange}
                            />

                            <Link to="/login" className="password-recovery-btn">
                                Already have an account? Sign in here.
                            </Link>

                            <button type="submit" className="fz-1-banner-btn single-form-btn">
                                Register
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
