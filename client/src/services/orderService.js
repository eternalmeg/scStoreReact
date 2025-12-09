import { request } from "./requestHelper";
const BASE_URL = "http://localhost:3000/api/orders";



export function getMyOrders() {
    return request(`${BASE_URL}`);
}

export function getOrderById(id) {
    return request(`${BASE_URL}/${id}`);
}

export function cancelOrder(id) {
    return request(`${BASE_URL}/${id}/cancel`, "PATCH");
}

