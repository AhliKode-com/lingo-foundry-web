import { useState, useEffect } from "react";
import api from "@/lib/api";

export function getReviews(authorType) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/public/landing/user-reviews", {
            params: { authorType },
          });
        setData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to get review");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error };
}
