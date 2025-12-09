import { request } from "./requestHelper";

const BASE_URL = "http://localhost:3000/api/admin/reviews";

export function getAllReviews() {
    return request(BASE_URL);
}

export function deleteReview(id) {
    return request(`${BASE_URL}/${id}`, "DELETE");
}
