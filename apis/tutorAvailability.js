import { toast } from "react-toastify";
import { useState, useCallback } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";

export function useTutorAvailability() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [availabilityData, setAvailabilityData] = useState([]);

    const handleRequest = useCallback(async (method, url, payload = null) => {
        setLoading(true);
        setError(null);

        const token = Cookies.get("token");
        const headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        try {
            const response = await api({
                method,
                url,
                data: payload,
                headers
            });
            return response.data.data;
        } catch (err) {
            const message = err.response?.data?.message;
            setError(message);
            toast.error(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const getAvailability = useCallback(async () => {
        try {
            const data = await handleRequest("get", "/tutor/availability");
            setAvailabilityData(data);
            return data;
        } catch (err) {
            return [];
        }
    }, [handleRequest]);

    const updateAvailability = useCallback(async (payload) => {
        try {
            const data = await handleRequest("post", "/tutor/availability", payload);
            // Refresh availability data after update
            await getAvailability();
            toast.success("Availability updated successfully");
            return data;
        } catch (err) {
            throw err;
        }
    }, [handleRequest, getAvailability]);

    return {
        loading,
        error,
        availabilityData,
        getAvailability,
        updateAvailability
    };
} 