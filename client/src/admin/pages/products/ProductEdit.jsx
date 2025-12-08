import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getOne, editProduct } from "../../../services/productService";
import { uploadToCloudinary } from "../../../services/cloudinaryService";
import { Form } from "react-bootstrap";

export default function ProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        sku: "",
        category: "Laptop",
        price: 0,
        quantity: 0,
        shortDescription: "",
        description: "",
        images: [] // тук държим старите URL-и или файлове
    });

    const [loading, setLoading] = useState(true);


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
                    images: data.images || [] // старите URL-и
                });
            })
            .catch(err => toast.error(err.message))
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
            images: [...prev.images, ...files] // добавяме новите файлове към старите URL-и
        }));
    };


    const handleSubmit = async e => {
        e.preventDefault();

        try {
            let finalImages = [];

            for (let img of formData.images) {
                if (typeof img === "string") {
                    // старо изображение от базата → запазваме го
                    finalImages.push(img);
                } else {
                    // нов файл → качваме го в Cloudinary
                    const uploadedUrl = await uploadToCloudinary(img);
                    finalImages.push(uploadedUrl);
                }
            }

            const cleanedData = {
                ...formData,
                price: Number(formData.price),
                quantity: Number(formData.quantity),
                images: finalImages
            };

            await editProduct(id, cleanedData);

            toast.success("Product updated successfully!");
            navigate("/admin/products");

        } catch (err) {
            toast.error(err.message);
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

                                {/* Brand */}
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
                                            <img
                                                key={i}
                                                src={typeof img === "string" ? img : URL.createObjectURL(img)}
                                                width="100"
                                                style={{ borderRadius: "8px" }}
                                            />
                                        ))}
                                    </div>
                                </div>

                            </div>

                            <button type="submit" className="fz-1-banner-btn fz-comment-form__btn">
                                Save Changes
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}
