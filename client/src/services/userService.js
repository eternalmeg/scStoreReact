import { request } from "./requestHelper";
import {BASEURL} from "../constants/constants.js";

const BASE_URL = BASEURL;

export function getAllUsers() {
    return request(`${BASE_URL}/admin/users/`);
}

export function createUser(data) {
    return request(`${BASE_URL}/admin/users/`, "POST", data);
}

export function getUserById(id) {
    return request(`${BASE_URL}/admin/users/${id}`);
}

export function updateUser(id, data) {
    return request(`${BASE_URL}/admin/users/${id}`, "PUT", data);
}

export function deleteUser(id) {
    return request(`${BASE_URL}/admin/users/${id}`, "DELETE");
}
