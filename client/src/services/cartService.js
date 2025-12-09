import { request } from "./requestHelper";

const BASE = "http://localhost:3000/api/cart";

export const addToCart = (productId,  quantity = 1) =>
    request(`${BASE}/add`, "POST", { productId, quantity });

export const updateQuantity = (productId, quantity) =>
    request(`${BASE}/update`, "PUT", { productId, quantity });

export const removeFromCart = (productId) =>
    request(`${BASE}/remove/${productId}`, "DELETE");

export const checkout = () =>
    request(`${BASE}/checkout`, "POST");

export const getCart = () =>
    request(`${BASE}`, "GET");
