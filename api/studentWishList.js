import {toast} from "react-toastify";
import {useState, useCallback} from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";
import {useLingoContext} from "@/context/LingoContext";

export function useStudentWishList() {
  const { setWishlists } = useLingoContext()
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
      setWishlists(response.data.data);
    } catch (err) {
      const message = err.response?.data?.message;
      setError(message);
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
    loading,
    error,
    getWishList,
    addToWishList,
    deleteWishList
  };
}
