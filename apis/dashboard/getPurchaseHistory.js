import { useState, useEffect } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";

export function getPurchaseHistory() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchData = async () => {
        setLoading(true);
        setError(null);
    
        const token = Cookies.get("token");
    
        try {
          const response = await api.get("/student/dashboard/purchase-history", {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          });
          setData(response.data.data);
        } catch (err) {
          setError(err.response?.data?.message || "Failed to fetch");
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);
    
      return { data, loading, error, refetch: fetchData };
}
