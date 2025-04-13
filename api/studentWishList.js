import { useState, useCallback } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";

export function useStudentWishList() {
  const [data, setData] = useState(null);
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
      setData(response.data.data);
      return response.data.data;
    } catch (err) {
      const message = err.response?.data?.message || `${method.toUpperCase()} request failed`;
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getWishList = useCallback(() => {
    return handleRequest("get", "/student/wishlist");
  }, [handleRequest]);

  const addToWishList = useCallback((tutorId, updates) => {
    return handleRequest("post",  `/student/wishlist/${tutorId}`, updates);
  }, [handleRequest]);

  const deleteWishList = useCallback((tutorId, updates) => {
    return handleRequest("delete", `/student/wishlist/${tutorId}`, updates);
  }, [handleRequest]);

  return {
    data: data ?? [],
    loading,
    error,
    getWishList,
    addToWishList,
    deleteWishList
  };
}
