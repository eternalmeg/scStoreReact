import { request } from "./requestHelper";
import {BASEURL} from "../constants/constants.js";


const BASE_URL = BASEURL;
export function getAllOrders() {
    return request(`${BASE_URL}/admin/orders`);
}

export function updateOrderStatus(id, status) {
    return request(`${BASE_URL}/admin/orders/${id}/status`, "PATCH", { status });
}

export function deleteOrder(id) {
    return request(`${BASE_URL}/admin/orders/${id}`, "DELETE");
}
