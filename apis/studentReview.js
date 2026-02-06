import { useState, useCallback } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";

/**
 * @deprecated This hook is deprecated. Use useCertificateDownload instead which returns
 * courseReviewed and platformReviewed flags. The new flow no longer checks outstanding
 * booking reviews - instead it checks course and platform review status.
 * 
 * Check outstanding reviews for an order item
 */
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

/**
 * @deprecated This hook is deprecated. The new review flow uses useSubmitUserReview
 * for both course and platform reviews via POST /api/student/user-review.
 * 
 * Submit review for a booking
 */
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

/**
 * Submit user review for course or platform
 * 
 * @description
 * For course review: include tutorSubjectId
 * For platform review: omit tutorSubjectId
 * 
 * @example
 * // Course review
 * submitUserReview({
 *   rating: 4.5,
 *   tutorSubjectId: 123,
 *   description: "Great course!",
 *   orderItemId: 1
 * });
 * 
 * // Platform review
 * submitUserReview({
 *   rating: 5,
 *   description: "Love the platform!",
 *   orderItemId: 1
 * });
 */
export function useSubmitUserReview() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitUserReview = async (reviewData) => {
        setLoading(true);
        setError(null);

        const token = Cookies.get("token");

        try {
            const response = await api.post("/student/user-review", reviewData, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                    "Content-Type": "application/json",
                }
            });
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to submit review";
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, submitUserReview };
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

    const checkCertificateValidity = useCallback(async (unique) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.get(`/student/order/certificate/${unique}`);
            
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