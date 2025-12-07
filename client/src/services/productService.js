
const BASE_URL = "http://localhost:3000/api/devices";
import { request } from "./requestHelper";


export function getAll() {
    return request(`${BASE_URL}`);
}

export function getLatest() {
    return request(`${BASE_URL}/latest`);
}

export function getOne(id) {
    return request(`${BASE_URL}/${id}/details`);
}

export function createProduct(data) {
    return request(`${BASE_URL}/create`, "POST", data);
}

export function editProduct(id, data) {
    return request(`${BASE_URL}/${id}`, "PUT", data);
}

export function deleteProduct(id) {
    return request(`${BASE_URL}/${id}`, "DELETE");
}

export function searchByBrand(brand) {
    return request(`${BASE_URL}/search/${brand}`);
}




