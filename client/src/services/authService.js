import { request } from "./requestHelper.js";
import { BASEURL } from "../constants/constants.js";

const BASE_URL = BASEURL;

export function register(userData) {
    return request(`${BASE_URL}/auth/register`, "POST", userData);
}

export function login(userData) {
    return request(`${BASE_URL}/auth/login`, "POST", userData);
}

export function logout() {
    return request(`${BASE_URL}/auth/logout`, "POST");
}

export function getProfile() {
    return request(`${BASE_URL}/auth/profile`, "GET");
}

export function updateProfile(data) {
    return request(`${BASE_URL}/auth/users/update`, "PUT", data);
}
