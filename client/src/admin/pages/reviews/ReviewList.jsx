import React, { useEffect, useState } from "react";
import { getAllReviews, deleteReview } from "../../../services/adminReviewService";
import { toast } from "react-toastify";

export default function ReviewList() {
    const [reviews, setReviews] = useState([]);

    const loadReviews = () => {
        getAllReviews()
            .then(setReviews)
            .catch(err => toast.error(err.message));
    };

    useEffect(() => {
        loadReviews();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Delete this review?")) return;

        try {
            await deleteReview(id);
            toast.success("Review deleted");
            loadReviews();
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Reviews</h2>

            <table className="table table-striped mt-4">
                <thead>
                <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Product</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {reviews.map((r, i) => (
                    <tr key={r._id}>
                        <td>{i + 1}</td>

                        <td>
                            {r.user?.firstName} {r.user?.lastName}
                            <br />
                            <small>{r.user?.email}</small>
                        </td>

                        <td>
                            {r.device?.brand} {r.device?.model}
                        </td>

                        <td>{r.rating ?? "-"}</td>

                        <td style={{ maxWidth: "300px" }}>
                            {r.comment}
                        </td>

                        <td>{new Date(r.createdAt).toLocaleDateString()}</td>

                        <td>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(r._id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
