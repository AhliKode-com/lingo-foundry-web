import { useState, useEffect } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";

export function useSendMessage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendMessage = async ({recipientId, content, files}) => {
        setLoading(true);
        setError(null);

        const token = Cookies.get("token");

        try {
            const response = await api.post("/message/send", {
                recipientId,
                content,
                files
            }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: token ? `Bearer ${token}` : "",
                },
            });
            setData(response.data.data);
            return response.data.data
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send message");
            return err;
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, data, loading, error };
}
