import {BASEURL} from "../constants/constants.js";
import { request } from "./requestHelper";


const BASE_URL = BASEURL;


export function getAll() {
    return request(`${BASE_URL}/devices`);
}

export function getLatest() {
    return request(`${BASE_URL}/devices/latest`);
}

export function getOne(id) {
    return request(`${BASE_URL}/devices/${id}`);
}

export function createProduct(data) {
    return request(`${BASE_URL}/devices/create`, "POST", data);
}

export function editProduct(id, data) {
    return request(`${BASE_URL}/devices/${id}`, "PUT", data);
}

export function deleteProduct(id) {
    return request(`${BASE_URL}/devices/${id}`, "DELETE");
}

export function searchByBrand(brand) {
    return request(`${BASE_URL}/devices/search/${brand}`);
}




