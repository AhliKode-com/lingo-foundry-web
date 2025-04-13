import { useState, useCallback } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";

export function useStudentCart() {
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

  const getCart = useCallback(() => {
    return handleRequest("get", "/student/cart");
  }, [handleRequest]);

  const addToCart = useCallback((cartItemId, updates) => {
    return handleRequest("post",`/student/cart/${cartItemId}`, updates);
  }, [handleRequest]);

  const updateCart = useCallback((item) => {
    return handleRequest("put", "/student/cart", item);
  }, [handleRequest]);

  const deleteCart = useCallback((cartItemId, updates) => {
    return handleRequest("delete", `/student/cart/${cartItemId}`, updates);
  }, [handleRequest]);

  return {
    data,
    loading,
    error,
    getCart,
    addToCart,
    updateCart,
    deleteCart
  };
}
