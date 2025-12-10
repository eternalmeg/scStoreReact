import { request } from "./requestHelper";
import {BASEURL} from "../constants/constants.js";


const BASE_URL = BASEURL;

export function createReview(data) {
    return request(`${BASE_URL}/reviews`, "POST", data);
}

export function getReviews(productId) {
    return request(`${BASE_URL}/reviews/${productId}`);
}

export function getUserReviews() {
    return request(`${BASE_URL}/reviews/userReviews`, "GET");
}



export function updateReview(reviewId, data) {
    return request(`${BASE_URL}/reviews/${reviewId}`, "PUT", data);
}

export function deleteReview(reviewId) {
    return request(`${BASE_URL}/reviews/${reviewId}`, "DELETE");
}

