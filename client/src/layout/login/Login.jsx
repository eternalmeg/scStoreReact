import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {


    return (
        <section className="fz-account-form-section">
            <div className="container">
                <div className="row g-4 justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-9 col-10 col-xxs-12">
                        <h3 className="single-form-title">Sign in</h3>
                        <form action="#" >
                            <input
                                type="text"
                                name="email"
                                id="login-username"
                                placeholder="Email"

                            />
                            <input
                                type="password"
                                name="login-password"
                                id="login-password"
                                placeholder="Password"

                            />


                            <div className="sign-in-checkbox-container d-flex justify-content-between">
                                <div className="stay-sign-in">
                                    <Link to="/register" className="password-recovery-btn">Don't have account yet? Register here.</Link>
                                </div>

                            </div>

                            <button type="submit" className="fz-1-banner-btn single-form-btn">Log in</button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Login;