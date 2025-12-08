import React from "react";

const ProductReview = ({ reviews }) => {
    if (!reviews || reviews.length === 0) {
        return <p>No reviews yet.</p>;
    }

    return (
        <div className="fz-product-details__review">
            <div className="user-reviews">
                <h4 className="reviews-title">Reviews of this product</h4>

                <div className="row g-4">
                    {reviews.map(review => (
                        <div className="col-xl-6" key={review._id}>
                            <div className="single-review">

                                {/* USER INFO */}
                                <div className="user">
                                    <div className="user-img">
                                        <img src="/assets/images/dafaultAvatar.png" alt="user" />
                                    </div>

                                    <div className="user-info">
                                        <h6 className="user-name">
                                            {review.user?.firstName} {review.user?.lastName}
                                        </h6>

                                        <div className="user-rating">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <i
                                                    key={i}
                                                    className={`fa-${i < review.rating ? "solid" : "light"} fa-star`}
                                                ></i>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* COMMENT */}
                                <div className="review">
                                    <p>{review.comment}</p>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductReview;
