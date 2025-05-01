import { useState } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";

export function useGetUserList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getUserList = async (query = "") => {
        let queryString = "";

        if (query.length >= 3) {
            queryString = query
        }
        setLoading(true);
        setError(null);

        const token = Cookies.get("token");

        try {
            const response = await api.get("/message/list-user", {
                params: {
                    q: queryString
                },
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
            });

            response.data.data;

            setData(response.data.data);
        } catch (err) {
            console.error("get list user error:", err);
            setError("An error occurred during get list user.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        getUserList,
        data,
        loading,
        error,
    };
}
