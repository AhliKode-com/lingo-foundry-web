import { useState, useEffect } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";

export function useGetMessageList() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getData = async () => {
        setLoading(true);
        setError(null);

        const token = Cookies.get("token");

        try {
            const response = await api.get("/message/list", {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                }
            });
            setData(response.data.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to get message list");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return { data, loading, error, getData };
}
