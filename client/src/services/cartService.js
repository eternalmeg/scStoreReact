import { request } from "./requestHelper";
import {BASEURL} from "../constants/constants.js";


const BASE_URL = BASEURL;

export const addToCart = (productId,  quantity = 1) =>
    request(`${BASE_URL}/cart/add`, "POST", { productId, quantity });

export const updateQuantity = (productId, quantity) =>
    request(`${BASE_URL}/cart/update`, "PUT", { productId, quantity });

export const removeFromCart = (productId) =>
    request(`${BASE_URL}/cart/remove/${productId}`, "DELETE");

export const checkout = () =>
    request(`${BASE_URL}/cart/checkout`, "POST");

export const getCart = () =>
    request(`${BASE_URL}/cart`, "GET");
