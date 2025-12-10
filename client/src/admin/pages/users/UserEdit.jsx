import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserById, updateUser } from "../../../services/userService";
import { Form } from "react-bootstrap";
import { useError } from "../../../context/ErrorContext.jsx";

export default function UserEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { throwError } = useError();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "user",
        password: ""
    });

    const [loading, setLoading] = useState(true);

    // Load user data
    useEffect(() => {
        getUserById(id)
            .then(data => {
                setFormData({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone || "",
                    role: data.role || "user",
                    password: "" // do not pre-fill
                });
            })
            .catch(err => {
                // serious errors → modal
                if (["server", "forbidden", "notfound"].includes(err.type)) {
                    return throwError(err.message);
                }
                toast.error(err.message);
            })
            .finally(() => setLoading(false));
    }, [id, throwError]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { ...formData };
        if (!payload.password) delete payload.password;

        try {
            await updateUser(id, payload);
            toast.success("User updated successfully!");
            navigate("/admin/users");
        } catch (err) {
            // Validation & auth → toast
            if (err.type === "validation" || err.type === "auth") {
                return toast.error(err.message);
            }

            // Fatal → global modal
            if (["server", "forbidden", "notfound"].includes(err.type)) {
                return throwError(err.message);
            }

            toast.error("Unexpected error while updating user.");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container">
            <div className="fz-checkout">
                <form onSubmit={handleSubmit} className="checkout-form">
                    <div className="fz-billing-details">
                        <div className="row gy-0 gx-3 gx-md-4">
                            <h3 className="fz-checkout-title">Edit User</h3>

                            <div className="col-6">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-6">
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-6">
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-6">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* ROLE */}
                            <div className="col-6">
                                <Form.Select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </Form.Select>
                            </div>


                            <div className="col-6">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="New Password (optional)"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>
                    </div>

                    <div className="fz-checkout-sidebar">
                        <div className="billing-summery">
                            <div className="cart-checkout-area">
                                <img
                                    src="/assets/images/dafaultAvatar.png"
                                    alt="avatar"
                                />

                                <button type="submit" className="fz-1-banner-btn cart-checkout-btn">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}
