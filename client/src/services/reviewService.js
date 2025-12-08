import { request } from "./requestHelper";

const BASE_URL = "http://localhost:3000/api/reviews";

export function createReview(data) {
    return request(`${BASE_URL}`, "POST", data);
}

export function getReviews(productId) {
    return request(`${BASE_URL}/${productId}`);
}

export function getUserReviews() {
    return request(`${BASE_URL}/userReviews`, "GET");
}



export function updateReview(reviewId, data) {
    return request(`${BASE_URL}/${reviewId}`, "PUT", data);
}

export function deleteReview(reviewId) {
    return request(`${BASE_URL}/${reviewId}`, "DELETE");
}

