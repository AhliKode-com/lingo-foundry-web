import { useState, useEffect } from "react";
import api from "@/lib/api";
import {toast} from "react-toastify";

export function getDetail(tutorId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/public/landing/tutor/" + id);
      setData(response.data.data);
      return response.data.data
    } catch (err) {
      setError(err.response?.data?.message || "Failed to get tutor detail");
      toast.error(err.response?.data?.message || "Failed to get tutor detail")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tutorId) {
      getData(tutorId);
    }
  }, []);

  return { data, loading, error, getData };
}
