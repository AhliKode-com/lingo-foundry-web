import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import {toast} from "react-toastify"

export function useForgotPassword() {
    const [loadingForgot, setLoadingForgot] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter()

    const forgot = async (email) => {
        setLoadingForgot(true)
        setError(null)
        try {
            toast.info("Sending OTP to your email...")
            const response = await api.post("/auth/forgot-password/send-otp", { email })
            if (!response.data.error) {
                toast.dismiss()
                toast.success("OTP has been sent.")
                router.push("/password-recovery")
            } else {
                toast.dismiss()
                setError(response.data.message)
            }
        } catch (err) {
            setError(err.response?.data?.message || "Send OTP failed")
            toast.error(err.response?.data?.message || "Send OTP failed")
        } finally {
            setLoadingForgot(false)
        }
    };

    return { forgot, loadingForgot, error }
}
