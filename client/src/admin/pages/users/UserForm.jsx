import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import {
    createUser,
    getUserById,
    updateUser
} from "../../../services/userService";
import { useError } from "../../../context/ErrorContext.jsx";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { throwError } = useError();

    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        role: "user",
        password: ""
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isEdit) {
            setLoading(false);
            return;
        }

        getUserById(id)
            .then(data => {
                setFormData({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone || "",
                    email: data.email,
                    role: data.role,
                    password: ""
                });
            })
            .catch(err => {
                if (["server", "forbidden", "notfound"].includes(err.type)) {
                    return throwError(err.message);
                }
                toast.error(err.message || "Failed to load user");
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEdit) {
                await updateUser(id, formData);
                toast.success("User updated successfully!");
            } else {
                await createUser(formData);
                toast.success("User created successfully!");
            }

            navigate("/admin/users");

        } catch (err) {

            if (["validation", "auth"].includes(err.type)) {
                return toast.error(err.message);
            }

            if (["server", "forbidden", "notfound"].includes(err.type)) {
                return throwError(err.message);
            }

            toast.error("Unexpected error");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container">
            <div className="fz-checkout">
                <form
                    className="checkout-form"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >



                    <div className="fz-billing-details">
                        <div className="row gy-0 gx-3 gx-md-4">
                            <h3 className="fz-checkout-title">
                                {isEdit ? "Edit User" : "Create User"}
                            </h3>

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
                                    type="number"
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
                                    disabled={isEdit}
                                />
                            </div>

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
                                    placeholder={isEdit ? "New Password (optional)" : "Password"}
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    required={!isEdit}
                                />
                            </div>

                        </div>
                    </div>

                    <div className="fz-checkout-sidebar">
                        <div className="billing-summery">
                            <div className="cart-checkout-area">
                                <img src="/assets/images/dafaultAvatar.png" alt="avatar" />

                                <button type="submit" className="fz-1-banner-btn cart-checkout-btn">
                                    {isEdit ? "Save Changes" : "Create User"}
                                </button>

                                <Link to="/admin/users" className="fz-1-banner-btn cart-checkout-btn">
                                    Back
                                </Link>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}
