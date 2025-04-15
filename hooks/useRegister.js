import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import {toast} from "react-toastify"

export function useRegister() {
    const [loadingRegister, setLoadingRegister] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter()

    const signup = async (username, password) => {
        setLoadingRegister(true)
        setError(null)
        try {
            const response = await api.post("/auth/register", { username, password })
            if (!response.data.error) {
                router.push("/login")
            } else {
                setError(response.data.message)
            }
        } catch (err) {
            setError(err.response?.data?.message || "Register failed")
            toast.error(err.response?.data?.message || "Register failed")
        } finally {
            setLoadingRegister(false)
        }
    };

    return { signup, loadingRegister, error }
}
