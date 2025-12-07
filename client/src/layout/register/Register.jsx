import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {


    return (
        <section className="fz-account-form-section">
            <div className="container">
                <div className="row g-4 justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-9 col-10 col-xxs-12">
                        <h3 className="single-form-title">Sign up</h3>
                        <form action="#">
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="First name"

                            />

                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Last name"

                            />
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email Address"

                            />

                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                placeholder="Phone number"

                            />
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"

                            />
                            <input
                                type="password"
                                name="repassword"
                                id="rePassword"
                                placeholder="Repead password"

                            />

                            <div className="sign-in-checkbox-container d-flex justify-content-between">
                                <div className="stay-sign-in">
                                    <Link to="/login" className="password-recovery-btn">Already have account? Sign in
                                        here.</Link>
                                </div>

                            </div>


                            <button type="submit" className="fz-1-banner-btn single-form-btn">Register</button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Register;