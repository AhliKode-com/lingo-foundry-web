import { useState, useEffect } from "react";
import api from "@/lib/api";

export function getEnums() {
    const [data, setData] = useState({
        country: [],
        expertise: [],
        subject: [],
        level: [],
        subjectTeach: [],
        subjectLevelTeach: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [countryRes, expertiseRes, subjectRes, levelRes, subjectTeachRes, subjectLevelTeachRes] = await Promise.all([
                api.get("/enum/country"),
                api.get("/enum/expertise"),
                api.get("/enum/academic-degree/subject"),
                api.get("/enum/academic-degree/level"),
                api.get("/enum/subject"),
                api.get("/enum/subject-level"),
                ]);

                setData({
                country: countryRes.data.data,
                expertise: expertiseRes.data.data,
                subject: subjectRes.data.data,
                level: levelRes.data.data,
                subjectTeach: subjectTeachRes.data.data,
                subjectLevelTeach: subjectLevelTeachRes.data.data,
                });
            } catch (err) {
                setError(err.response?.data?.message || "Failed to get enums");
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

  return { data, loading, error };
}
