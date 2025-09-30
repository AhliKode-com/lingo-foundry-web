import { useState, useCallback } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";

// Check outstanding reviews for an order item
export function useOutstandingReviews() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const checkOutstandingReviews = async (orderItemId) => {
        setLoading(true);
        setError(null);

        const token = Cookies.get("token");

        try {
            const response = await api.get(`/student/booking-review/outstanding/${orderItemId}`, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                }
            });
            setData(response.data.data);
            return response.data.data;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to check outstanding reviews");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, checkOutstandingReviews };
}

// Submit review for a booking
export function useSubmitReview() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitReview = async (reviewData) => {
        setLoading(true);
        setError(null);

        const token = Cookies.get("token");

        try {
            const response = await api.post("/student/booking/review", reviewData, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                    "Content-Type": "application/json",
                }
            });
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to submit review");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, submitReview };
}

// Download certificate for an order item
export function useCertificateDownload() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const downloadCertificate = async (orderItemId) => {
        setLoading(true);
        setError(null);

        const token = Cookies.get("token");

        try {
            const response = await api.get(`/student/order/certificate/${orderItemId}`, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                }
            });
            
            // Return the full response data
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to download certificate");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, downloadCertificate };
}

// Check certificate validity
export function useCertificateValidity() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const checkCertificateValidity = useCallback(async (orderItemId) => {
        setLoading(true);
        setError(null);

        const token = Cookies.get("token");

        try {
            const response = await api.get(`/student/order/certificate/${orderItemId}`, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                }
            });
            
            setData(response.data.data);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to check certificate validity");
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, checkCertificateValidity };
} 