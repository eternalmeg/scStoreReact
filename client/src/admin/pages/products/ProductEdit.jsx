import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getOne, editProduct } from "../../../services/productService";
import { uploadToCloudinary } from "../../../services/cloudinaryService";
import { Form } from "react-bootstrap";
import { useError } from "../../../context/ErrorContext.jsx";

export default function ProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { throwError } = useError();

    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        sku: "",
        category: "Laptop",
        price: 0,
        quantity: 0,
        shortDescription: "",
        description: "",
        images: []
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);


    useEffect(() => {
        getOne(id)
            .then(data => {
                setFormData({
                    brand: data.brand,
                    model: data.model,
                    sku: data.sku,
                    category: data.category,
                    price: data.price,
                    quantity: data.quantity,
                    shortDescription: data.shortDescription,
                    description: data.description,
                    images: data.images || []
                });
            })
            .catch(err => {
                if (["server", "notfound"].includes(err.type)) {
                    return throwError(err.message);
                }
                toast.error(err.message);
            })
            .finally(() => setLoading(false));
    }, [id]);


    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const handleImages = e => {
        const files = Array.from(e.target.files);

        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...files]
        }));
    };


    const removeImage = index => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };


    const handleSubmit = async e => {
        e.preventDefault();
        setSaving(true);

        try {
            const uploads = await Promise.all(
                formData.images.map(img =>
                    typeof img === "string" ? img : uploadToCloudinary(img)
                )
            );

            const cleanedData = {
                ...formData,
                price: Number(formData.price),
                quantity: Number(formData.quantity),
                images: uploads
            };

            await editProduct(id, cleanedData);

            toast.success("Product updated successfully!");
            navigate("/admin/products");

        } catch (err) {
            console.error(err);


            if (["validation", "auth"].includes(err.type)) {
                toast.error(err.message);
            }

            else if (["server", "notfound", "forbidden"].includes(err.type)) {
                throwError(err.message);
            }
            else {
                toast.error("Unexpected error while updating product.");
            }

        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container">
            <div className="fz-inner-contact-details">
                <div className="fz-inner-contact-details__left">
                    <div className="fz-blog-details__comment-form">

                        <h4 className="fz-comment-form__title fz-inner-contact-details__title">
                            Edit Product
                        </h4>

                        <form onSubmit={handleSubmit}>
                            <div className="row g-xl-4 g-3">

                                <div className="col-6">
                                    <input
                                        type="text"
                                        name="brand"
                                        placeholder="Brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-6">
                                    <input
                                        type="text"
                                        name="model"
                                        placeholder="Model"
                                        value={formData.model}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-6">
                                    <input
                                        type="text"
                                        name="sku"
                                        placeholder="SKU"
                                        value={formData.sku}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-6">
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="Price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-6">
                                    <Form.Select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                    >
                                        <option value="Laptop">Laptop</option>
                                        <option value="Desktop">Desktop</option>
                                        <option value="Server">Server</option>
                                        <option value="Tablet">Tablet</option>
                                        <option value="Phone">Phone</option>
                                    </Form.Select>
                                </div>

                                <div className="col-6">
                                    <input
                                        type="number"
                                        name="quantity"
                                        placeholder="Quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-12">
                                    <textarea
                                        name="shortDescription"
                                        placeholder="Short description"
                                        value={formData.shortDescription}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <div className="col-12">
                                    <textarea
                                        name="description"
                                        placeholder="Description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <div className="col-12">
                                    <label>Replace / add images</label>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImages}
                                    />
                                </div>


                                <div className="col-12">
                                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                        {formData.images.map((img, i) => (
                                            <div key={i} style={{ position: "relative" }}>
                                                <img
                                                    src={typeof img === "string" ? img : URL.createObjectURL(img)}
                                                    width="100"
                                                    style={{ borderRadius: "8px" }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(i)}
                                                    style={{
                                                        position: "absolute",
                                                        top: "-6px",
                                                        right: "-6px",
                                                        background: "red",
                                                        border: "none",
                                                        color: "white",
                                                        borderRadius: "50%",
                                                        width: "24px",
                                                        height: "24px",
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            <button
                                type="submit"
                                className="fz-1-banner-btn fz-comment-form__btn"
                                disabled={saving}
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}
