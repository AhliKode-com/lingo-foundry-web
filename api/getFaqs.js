import { useState, useEffect } from "react";
import api from "@/lib/api";

export function getFaqs(purpose) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/public/landing/faqs", {
            params: { purpose },
          });
        setData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to get faqs");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error };
}
