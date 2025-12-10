import { triggerGlobalError } from "../context/ErrorInterceptor.js";

export async function request(url, method = "GET", body) {
    const options = {
        method,
        credentials: "include",
        headers: {}
    };

    if (body instanceof FormData) {
        options.body = body;

    } else if (body) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            let error = await response.json().catch(() => ({ message: "Request failed" }));

            let err = new Error(error.message);

            // 🟡 Добавяме правилен тип според статуса
            if (response.status === 400) err.type = "validation";
            if (response.status === 401) err.type = "auth";
            if (response.status === 403) err.type = "forbidden";
            if (response.status === 404) err.type = "notfound";
            if (response.status >= 500) err.type = "server";

            // 🟥 Fatal ли е?
            if (["server", "forbidden", "notfound"].includes(err.type)) {
                triggerGlobalError(err.message);
            }

            throw err;
        }

        if (response.status === 204) return null;

        return await response.json();

    } catch (err) {
        // Ако е мрежова грешка (`fetch` fail)
        if (!err.type) err.type = "network";

        throw err;
    }
}
