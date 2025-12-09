import { request } from "./requestHelper";

const BASE_URL = "http://localhost:3000/api/admin/orders";

export function getAllOrders() {
    return request(BASE_URL);
}

export function updateOrderStatus(id, status) {
    return request(`${BASE_URL}/${id}/status`, "PATCH", { status });
}

export function deleteOrder(id) {
    return request(`${BASE_URL}/${id}`, "DELETE");
}
