import { useState, useEffect } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";

export function getDetail(tutorId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);

      const token = Cookies.get("token");

      try {
        const response = await api.get("/public/landing/" + tutorId);
        setData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to get tutor detail");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error };
}
