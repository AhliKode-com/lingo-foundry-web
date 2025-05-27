"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import Cookies from 'js-cookie';

export function getDashboardOverview(range = 7) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = Cookies.get('token');
        const response = await api.get("/tutor/dashboard-overview", {
          params: { range },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to get dashboard overview");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [range]);

  return { data, loading, error };
} 