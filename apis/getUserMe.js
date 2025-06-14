import { useState, useEffect } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";
import {toast} from "react-toastify";

export function useGetUserMe() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            setError(null);

            const token = Cookies.get("token");

            try {
                if (!token) {
                    setData(null);
                    setLoading(false);
                    return;
                }
                const response = await api.get("/user/me", {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : "",
                    }
                });
                setData(response.data.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to get user me");
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    return { data, loading, error };
}
