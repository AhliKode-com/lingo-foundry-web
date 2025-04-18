import {toast} from "react-toastify";
import { useState, useCallback } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";
import {useLingoContext} from "@/context/LingoContext";

export function useStudentBooking() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
        } finally {
            setLoading(false);
        }
    }, []);

    const tutorUnavailableTime = useCallback((payload) => {
        return handleRequest("get",`/student/booking/tutor-availability?tutorId=${payload}`);
    }, [handleRequest]);

    const createBooking = useCallback((payload) => {
        return handleRequest("post",'/student/booking/create', payload);
    }, [handleRequest]);

    return {
        loading,
        error,
        tutorUnavailableTime,
        createBooking,
    };
}
