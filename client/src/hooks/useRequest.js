import { useContext } from "react";
import UserContext from "../context/UserContext.jsx";


const baseUrl = 'http://localhost:3000';

export default function useRequest() {
    const { user, isAuthenticated } = useContext(UserContext);

    const request = async (url, method = "GET", data = null) => {
        const options = {};

        // method
        if (method !== "GET") {
            options.method = method;
        }

        // body
        if (data) {
            options.headers = {
                "Content-Type": "application/json",
            };
            options.body = JSON.stringify(data);
        }

        // auth token
        if (isAuthenticated && user?.accessToken) {
            options.headers = {
                ...options.headers,
                "Authorization": `Bearer ${user.accessToken}`
            };
        }

        const response = await fetch(`${baseUrl}${url}`, options);

        if (!response.ok) {
            const message = await response.text();
            throw new Error(message || "Server error");
        }

        if (response.status === 204) return null;

        return await response.json();
    };

    return request;
}
