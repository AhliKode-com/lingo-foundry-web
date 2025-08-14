import {toast} from "react-toastify";
import { useState, useCallback } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";

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

    const deleteBooking = useCallback((bookingId) => {
        return handleRequest("delete",`/student/booking/${bookingId}`);
    }, [handleRequest]);

    const listBooking = useCallback(() => {
        return handleRequest("get",'/student/booking/list');
    }, [handleRequest]);

    const listBookingTutor = useCallback(() => {
        return handleRequest("get",'/tutor/booking');
    }, [handleRequest]);

    const getByOrderItemId = useCallback((orderItemId) => {
        return handleRequest("get",`/student/booking/byId?orderItemId=${orderItemId}`);
    }, [handleRequest]);

    return {
        loading,
        error,
        tutorUnavailableTime,
        createBooking,
        deleteBooking,
        listBooking,
        getByOrderItemId,
        listBookingTutor
    };
}
