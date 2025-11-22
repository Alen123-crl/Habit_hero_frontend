import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach Access Token
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Refresh Token Logic
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config;

        // Dont retry login
        if (original.url.includes("/login") || original.url.includes("/register")) {
            return Promise.reject(error);
        }

        // If unauthorized
        if (error.response?.status === 401 && !original._retry) {
            original._retry = true;

            const refresh = localStorage.getItem("refreshToken");
            if (!refresh) {
                // No refresh then force logout
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(error);
            }

            try {
                // request new access token
                const res = await axios.post(
                    "http://localhost:8000/api/refresh-token",
                    {
                        refresh_token: refresh,
                    }
                );

                const newToken = res.data.access_token;

                localStorage.setItem("accessToken", newToken);

                // update and retry request
                original.headers.Authorization = `Bearer ${newToken}`;
                return API(original);
            } catch (err) {
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default API;

