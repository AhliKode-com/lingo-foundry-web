import { useState, useEffect } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";

export function useSendMessage({recipientId, content, files}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendMessage = async () => {
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
                    Authorization: token ? `Bearer ${token}` : "",
                },
            });
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading, error };
}
