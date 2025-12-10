import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { deleteReview, getUserReviews } from "../../../services/reviewService.js";
import UserContext from "../../../context/UserContext";

import useConfirm from "../../../hooks/useConfirm";
import { useError } from "../../../context/ErrorContext.jsx";

const MyReviews = () => {
    const [reviews, setReviews] = useState([]);
    const { user } = useContext(UserContext);

    const { confirm, ConfirmUI } = useConfirm();
    const { throwError } = useError();

    useEffect(() => {
        getUserReviews()
            .then(setReviews)
            .catch(err => {

                if (["server", "forbidden", "notfound"].includes(err.type)) {
                    return throwError(err.message);
                }

                toast.error(err.message || "Failed to load reviews.");
            });
    }, [user]);

    const handleDelete = async (id) => {
        const ok = await confirm("Are you sure you want to delete this review?");
        if (!ok) return;

        try {
            await deleteReview(id);
            setReviews(prev => prev.filter(r => r._id !== id));
            toast.success("Review deleted!");

        } catch (err) {
            if (["validation", "auth"].includes(err.type)) {
                return toast.error(err.message);
            }

            if (["server", "forbidden", "notfound"].includes(err.type)) {
                return throwError(err.message);
            }

            toast.error("Unexpected error.");
        }
    };

    return (
        <div className="container">


            <ConfirmUI />

            <h2>My Reviews</h2>

            {reviews.length === 0 && <p>You haven't written any reviews yet.</p>}

            <div className="row g-4">
                {reviews.map(review => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={review._id}>
                        <div className="user-review-card">


                            <div className="my-review-card__img">
                                <img
                                    src={review.device?.images?.[0] || "/assets/images/no-image.png"}
                                    alt={review.device?.model || "Deleted product"}
                                />
                            </div>


                            <div className="review-product-name">
                                {review.device
                                    ? `${review.device.brand} ${review.device.model}`
                                    : <span className="text-muted">(Deleted product)</span>
                                }
                            </div>


                            <div className="review-stars">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <i
                                        key={i}
                                        className={`fa-${i < review.rating ? "solid" : "light"} fa-star`}
                                    ></i>
                                ))}
                            </div>


                            <div className="review-comment">{review.comment}</div>


                            <div className="review-date">
                                <small>
                                    Posted on:{" "}
                                    {new Date(review.createdAt).toLocaleDateString("bg-BG")}
                                </small>
                            </div>

                            {/* Actions */}
                            <div className="review-actions">
                                <Link to={`/user/reviews/${review._id}/edit`}>Edit</Link>

                                <button onClick={() => handleDelete(review._id)}>
                                    Delete
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyReviews;
