export async function request(url, method = "GET", body) {

    const options = {
        method,
        credentials: "include",
        headers: {}
    };

    if (body) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
        let error = await response.json().catch(() => ({ message: "Request failed" }));
        throw new Error(error.message);
    }

    if (response.status === 204) return null;

    return response.json();
}