import { request } from "./requestHelper";
import {BASEURL} from "../constants/constants.js";



const BASE_URL = BASEURL;

export function getAllReviews() {
    return request(`${BASE_URL}/admin/reviews`);
}

export function deleteReview(id) {
    return request(`${BASE_URL}/admin/reviews/${id}`, "DELETE");
}
