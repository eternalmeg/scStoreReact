import { request } from "./requestHelper";
import {BASEURL} from "../constants/constants.js";



const BASE_URL = BASEURL;



export function getMyOrders() {
    return request(`${BASE_URL}/orders`);
}

export function getOrderById(id) {
    return request(`${BASE_URL}/orders/${id}`);
}

export function cancelOrder(id) {
    return request(`${BASE_URL}/orders/${id}/cancel`, "PATCH");
}

