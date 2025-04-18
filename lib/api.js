import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    config.headers["X-Timezone"] = timezone;
    return config;
});

export default api;
