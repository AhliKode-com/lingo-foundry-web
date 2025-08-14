"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import Cookies from 'js-cookie';

export function getDashboardEarning(interval = 'monthly') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = Cookies.get('token');
        const response = await api.get("/tutor/earning-stats", {
          params: { interval },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to get dashboard earning");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [interval]);

  return { data, loading, error };
} 