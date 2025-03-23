import { useState, useEffect } from "react";
import api from "@/lib/api";

export function getTutorSubjects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/public/landing/tutor-subjects");
        setData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to get landing subject");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error };
}
