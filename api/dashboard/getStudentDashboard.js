import { useState, useEffect } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";

// https://devapi.lingofoundry.com/swagger-ui/index.html#/student-dashboard-controller/fetchStudentCourse
export function getStudentDashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            setError(null);

            const token = Cookies.get("token");

            try {
                const response = await api.get("/student/dashboard", {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : "",
                    },
                    params: {
                        pageNumber: 1,
                        pageSize: 50,
                    }
                });
                setData(response.data.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to getStudentDashboard");
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    return { data, loading, error };
}
