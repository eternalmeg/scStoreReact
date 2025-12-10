import { useState, useContext, useEffect } from "react";
import UserContext from "../../../context/UserContext";
import { getProfile, updateProfile } from "../../../services/authService.js";
import { toast } from "react-toastify";
import { useError } from "../../../context/ErrorContext.jsx";

export default function Profile() {
    const { user, login } = useContext(UserContext);
    const { throwError } = useError();

    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: ""
    });

    const [originalData, setOriginalData] = useState(null);


    useEffect(() => {
        async function load() {
            try {
                const me = await getProfile();

                const formatted = {
                    firstName: me.firstName || "",
                    lastName: me.lastName || "",
                    phone: me.phone || "",
                    email: me.email || ""
                };

                setFormData(formatted);
                setOriginalData(formatted);

            } catch (err) {

                if (["server", "forbidden", "notfound"].includes(err.type)) {
                    return throwError(err.message);
                }

                toast.error(err.message || "Failed to load profile.");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);


    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };


    const handleSave = async () => {
        try {
            const updated = await updateProfile(formData);

            // backend връща { user, token }
            login(updated);

            toast.success("Profile updated!");
            setOriginalData(formData);
            setEditing(false);

        } catch (err) {


            if (["validation", "auth"].includes(err.type)) {
                return toast.error(err.message);
            }


            if (["server", "forbidden", "notfound"].includes(err.type)) {
                return throwError(err.message);
            }

            toast.error("Unexpected error updating profile.");
        }
    };

    const handleCancel = () => {
        setFormData(originalData);
        setEditing(false);
    };

    if (loading) return <p>Loading...</p>;


    return (
        <div className="container">
            <div className="fz-checkout">
                <form className="checkout-form">
                    <div className="fz-billing-details">
                        <div className="row">
                            <h3>User Info</h3>

                            <div className="col-6">
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    placeholder="First Name"
                                />
                            </div>

                            <div className="col-6">
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    placeholder="Last Name"
                                />
                            </div>

                            <div className="col-6">
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    placeholder="Phone Number"
                                />
                            </div>

                            <div className="col-6">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    disabled
                                    placeholder="Email Address"
                                />
                            </div>

                        </div>
                    </div>

                    <div className="fz-checkout-sidebar">
                        <div className="billing-summery">
                            <div className="cart-checkout-area">

                                <img src="/assets/images/dafaultAvatar.png" alt="avatar" />

                                {!editing ? (
                                    <button
                                        type="button"
                                        className="fz-1-banner-btn cart-checkout-btn"
                                        onClick={() => setEditing(true)}
                                    >
                                        Edit Profile
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            className="fz-1-banner-btn cart-checkout-btn"
                                            onClick={handleSave}
                                        >
                                            Save
                                        </button>

                                        <button
                                            type="button"
                                            className="fz-1-banner-btn cart-checkout-btn"
                                            style={{ background: "#ccc" }}
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}

                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}
