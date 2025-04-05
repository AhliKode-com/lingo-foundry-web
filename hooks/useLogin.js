import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import Cookies from "js-cookie"
import { useAuth } from "@/context/AuthContext";
import {toast} from "react-toastify";

export function useLogin() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter()
    const { loginContext } = useAuth()

    const login = async (username, password) => {
        setLoading(true)
        setError(null)
        try {
            toast.info("logging in...")
            const response = await api.post("/auth/login", { username, password })
            if (!response.data.error) {
                Cookies.set("token", response.data.token, {
                    expires: 7, // 7 days
                    secure: true,
                    sameSite: "strict",
                });

                loginContext(response.data.token)
                toast.dismiss()
                toast.success("Logged in successfully.")
                router.push("/")
            } else {
                toast.dismiss()
                toast.error(response.data.message || "Login failed")
                setError(response.data.message)
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed")
            toast.dismiss()
            toast.error(err.response.data.message || "Login failed")
        } finally {
            setLoading(false)
        }
    };

    return { login, loading, error }
}
