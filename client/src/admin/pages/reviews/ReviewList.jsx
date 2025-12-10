import React from "react";
import { toast } from "react-toastify";
import useFetch from "../../../hooks/useFetch";
import { getAllReviews, deleteReview } from "../../../services/adminReviewService";
import useConfirm from "../../../hooks/useConfirm";
import { useError } from "../../../context/ErrorContext.jsx";

export default function ReviewList() {

    const { confirm, ConfirmUI } = useConfirm();
    const { throwError } = useError();

    const {
        data: reviews,
        loading,
        error,
        setData: setReviews
    } = useFetch(() => getAllReviews(), []);

    const handleDelete = async (id) => {
        const ok = await confirm("Are you sure you want to delete this review?");
        if (!ok) return;

        try {
            await deleteReview(id);

            setReviews(prev => prev.filter(r => r._id !== id));

            toast.success("Review deleted successfully");

        } catch (err) {

            if (err.type === "validation" || err.type === "auth") {
                return toast.error(err.message);
            }


            if (["server", "forbidden", "notfound"].includes(err.type)) {
                return throwError(err.message);
            }

            toast.error("Unexpected error while deleting review.");
        }
    };

    if (loading) return <h3>Loading reviews...</h3>;
    if (error) return <p>Error loading reviews.</p>;

    return (
        <div className="container mt-4">


            <ConfirmUI />

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
                {reviews?.map((r, i) => (
                    <tr key={r._id}>
                        <td>{i + 1}</td>

                        <td>
                            {r.user?.firstName} {r.user?.lastName}
                            <br />
                            <small>{r.user?.email}</small>
                        </td>

                        <td>
                            {r.device
                                ? `${r.device.brand} ${r.device.model}`
                                : <span className="text-muted">(Deleted product)</span>}
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

            {reviews?.length === 0 && (
                <p className="mt-3">No reviews found.</p>
            )}
        </div>
    );
}
