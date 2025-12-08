

const BASE_URL = "http://localhost:3000/api/auth";

export async function register(userData) {
    return request(`${BASE_URL}/register`, "POST", userData);
}

export async function login(userData) {
    return request(`${BASE_URL}/login`, "POST", userData);
}

export async function logout() {
    return request(`${BASE_URL}/logout`, "POST");
}

export async function getProfile() {
    return request(`${BASE_URL}/profile`, "GET");
}

export function updateProfile(data) {
    return request(`${BASE_URL}/users/update`, "PUT", data);
}



async function request(url, method = "GET", body) {

    const options = {
        method,
        credentials: "include", // важно за cookies!!!
        headers: {}
    };

    if (body) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);


    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Request error" }));
        throw new Error(error.message);
    }


    if (response.status === 204) return null;

    return response.json();
}
