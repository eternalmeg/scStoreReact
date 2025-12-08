import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {deleteReview, getUserReviews } from "../../../services/reviewService.js";
import { useContext } from "react";
import UserContext from "../../../context/UserContext";


const MyReviews = () => {
    const [reviews, setReviews] = useState([]);

    const { user } = useContext(UserContext);


    useEffect(() => {
        getUserReviews()
            .then(setReviews)
            .catch(err => toast.error(err.message));
    }, [user]);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this review?")) return;

        try {
            await deleteReview(id);
            setReviews(reviews.filter(r => r._id !== id));
            toast.success("Review deleted");
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="container">
            <h2>My Reviews</h2>

            {reviews.length === 0 && <p>You haven't written any reviews yet.</p>}

            <div className="row g-4">
                {reviews.map(review => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={review._id}>
                        <div className="user-review-card">

                            <div className="my-review-card__img">
                            <img src={review.device.images[0]} alt={review.device.model}/>
                            </div>

                            <div className="review-product-name">
                                {review.device.brand} {review.device.model}
                            </div>

                            <div className="review-stars">
                                {Array.from({length: 5}).map((_, i) => (
                                    <i
                                        key={i}
                                        className={`fa-${i < review.rating ? "solid" : "light"} fa-star`}
                                    ></i>
                                ))}
                            </div>

                            <div className="review-comment">{review.comment}</div>

                            <div className="review-date">
                                <small>Posted on: {new Date(review.createdAt).toLocaleDateString("bg-BG")}</small>
                            </div>


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
