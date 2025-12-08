import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getUserReviews, updateReview } from "../../../services/reviewService";

export default function ReviewEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [review, setReview] = useState(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    useEffect(() => {
        getUserReviews().then(list => {
            const found = list.find(r => r._id === id);
            if (!found) {
                toast.error("Review not found!");
                navigate("/user/reviews");
                return;
            }

            setReview(found);
            setRating(found.rating);
            setComment(found.comment);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateReview(id, { rating, comment });
            toast.success("Review updated successfully!");
            navigate("/user/reviews");
        } catch (err) {
            toast.error(err.message);
        }
    };

    if (!review) return <p>Loading...</p>;

    return (
        <div className="container" style={{ maxWidth: "900px", marginTop: "40px" }}>
            <h2 className="fz-comment-form__title">Edit Your Review</h2>

            <form onSubmit={handleSubmit}>

                {/* RATING DROPDOWN */}
                <div className="mb-3">
                    <select
                        className="form-select"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    >
                        {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>
                                {"★".repeat(num)}{"☆".repeat(5 - num)} ({num})
                            </option>
                        ))}
                    </select>
                </div>

                {/* COMMENT */}
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        rows="6"
                        placeholder="Your updated review..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    ></textarea>
                </div>

                {/* BUTTONS */}
                <button type="submit" className="fz-1-banner-btn" style={{ marginRight: "10px" }}>
                    Save Changes
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/user/reviews")}
                    className="fz-1-banner-btn"
                    style={{ background: "#ddd", color: "#000" }}
                >
                    Cancel
                </button>

            </form>
        </div>
    );
}
