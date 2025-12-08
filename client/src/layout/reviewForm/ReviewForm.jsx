import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { createReview } from "../../services/reviewService";
import { toast } from "react-toastify";

const ReviewForm = () => {
    const { id: productId } = useParams(); // ID-то на продукта (device)
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        rating: 5,
        comment: ""
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createReview({
                 productId,
                rating: Number(formData.rating),
                comment: formData.comment
            });

            toast.success("Review submitted!");
            navigate(`/details/${productId}`);
        } catch (err) {
            toast.error(err.message || "Failed to submit review");
        }
    };

    return (
        <div className="container">
            <div className="fz-inner-contact-details">
                <div className="fz-inner-contact-details__left">
                    <div className="fz-blog-details__comment-form">

                        <h4 className="fz-comment-form__title fz-inner-contact-details__title">
                            Leave a Review
                        </h4>

                        <form onSubmit={handleSubmit}>
                            <div className="row g-xl-4 g-3">

                                {/* RATING */}
                                <div className="col-12">
                                    <select
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleChange}
                                        className="form-select"
                                        required
                                    >
                                        <option value={5}>★★★★★ (5)</option>
                                        <option value={4}>★★★★☆ (4)</option>
                                        <option value={3}>★★★☆☆ (3)</option>
                                        <option value={2}>★★☆☆☆ (2)</option>
                                        <option value={1}>★☆☆☆☆ (1)</option>
                                    </select>
                                </div>

                                {/* COMMENT */}
                                <div className="col-12">
                                    <textarea
                                        name="comment"
                                        placeholder="Your Review"
                                        value={formData.comment}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            <button type="submit" className="fz-1-banner-btn fz-comment-form__btn">
                                Send your review
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;
