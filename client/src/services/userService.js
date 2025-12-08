import { request } from "./requestHelper";

const BASE_URL = "http://localhost:3000/api/admin/users";

export function getAllUsers() {
    return request(BASE_URL);
}

export function createUser(data) {
    return request(BASE_URL, "POST", data);
}

export function getUserById(id) {
    return request(`${BASE_URL}/${id}`);
}

export function updateUser(id, data) {
    return request(`${BASE_URL}/${id}`, "PUT", data);
}

export function deleteUser(id) {
    return request(`${BASE_URL}/${id}`, "DELETE");
}
