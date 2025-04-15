import { useState, useEffect } from "react"
import api from "@/lib/api"

export function getPopularTutors(query = "") {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            setError(null)
            try {
                const url = `/public/landing/popular-tutors${query?.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`
                const response = await api.get(url)
                setData(response.data.data)
            } catch (err) {
                setError(err.response?.data?.message || "Failed to get landing subject")
            } finally {
                setLoading(false)
            }
        }

        getData()
    }, [query])

    return { data, loading, error }
}
