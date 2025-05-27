"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import Cookies from 'js-cookie';

export function getTutorStudents() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = Cookies.get('token');
        const response = await api.get("/tutor/students", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to get students data");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error };
} 