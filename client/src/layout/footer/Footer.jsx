import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="fz-2-footer-section">


            <div className="fz-footer-bottom">
                <div className="container">
                    <div className="row gy-4 align-items-center">
                        <div className="col-lg-6">
                            <p className="fz-copyright">
                                &copy;
                                {currentYear} Design & Developed by <b></b>
                            </p>
                        </div>


                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
