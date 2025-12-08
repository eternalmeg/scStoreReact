import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import {
    createUser,
    getUserById,
    updateUser
} from "../../../services/userService";

export default function UserForm() {
    const { id } = useParams();          // ако има id → EDIT, ако няма → CREATE
    const navigate = useNavigate();

    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        role: "user",
        password: ""   // само при създаване или смяна
    });

    const [loading, setLoading] = useState(true);

    // Load user if editing
    useEffect(() => {
        if (!isEdit) {
            setLoading(false);
            return;
        }

        getUserById(id)
            .then((data) => {
                setFormData({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone || "",
                    email: data.email,
                    role: data.role,
                    password: "" // празно → няма смяна
                });
            })
            .catch(() => toast.error("Failed to load user"))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e) => {
        setFormData((prev) => ({
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
            toast.error(err.message || "Something went wrong");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container">
            <div className="fz-checkout">
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <div className="fz-billing-details">
                        <div className="row gy-0 gx-3 gx-md-4">
                            <h3 className="fz-checkout-title">
                                {isEdit ? "Edit User" : "Create User"}
                            </h3>

                            <div className="col-6 col-xxs-12">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-6 col-xxs-12">
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-6 col-xxs-12">
                                <input
                                    type="number"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-6 col-xxs-12">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={isEdit} // имейлът не се сменя
                                />
                            </div>

                            <div className="col-6 col-xxs-12">
                                <Form.Select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </Form.Select>
                            </div>

                            {/* Password – only required on CREATE */}
                            <div className="col-6 col-xxs-12">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder={
                                        isEdit
                                            ? "New Password (optional)"
                                            : "Password"
                                    }
                                    value={formData.password}
                                    onChange={handleChange}
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
