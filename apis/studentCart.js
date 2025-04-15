import {toast} from "react-toastify";
import { useState, useCallback } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";
import {useLingoContext} from "@/context/LingoContext";

export function useStudentCart() {
  const { setCarts } = useLingoContext()
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
      setCarts(response.data.data);
      return response.data.data;
    } catch (err) {
      const message = err.response?.data?.message;
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCart = useCallback(() => {
    return handleRequest("get", "/student/cart");
  }, [handleRequest]);

  const addToCart = useCallback((updates) => {
    return handleRequest("post",'/student/cart', updates);
  }, [handleRequest]);

  const updateCart = useCallback((cartItemId, updates) => {
    return handleRequest("put", `/student/cart/${cartItemId}`, updates);
  }, [handleRequest]);

  const deleteCart = useCallback((cartItemId, updates) => {
    return handleRequest("delete", `/student/cart/${cartItemId}`, updates);
  }, [handleRequest]);

  return {
    loading,
    error,
    getCart,
    addToCart,
    updateCart,
    deleteCart
  };
}
