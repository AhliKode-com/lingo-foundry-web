import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import {toast} from "react-toastify"

export function useSendOtp() {
    const [loadingSendOtp, setLoadingSendOtp] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter()

    const sendOtp = async (email, otp, newPassword) => {
        setLoadingSendOtp(true)
        setError(null)
        try {
            toast.info("Recovering your account...")
            const response = await api.post("/auth/forgot-password/confirm", { email, otp, newPassword })
            if (!response.data.error) {
                toast.dismiss()
                toast.success("Account has been recovered.")
                router.push("/login")
            } else {
                toast.dismiss()
                setError(response.data.message)
            }
        } catch (err) {
            setError(err.response?.data?.message || "Send data failed")
            toast.error(err.response?.data?.message || "Send data failed")
        } finally {
            setLoadingSendOtp(false)
        }
    };

    return { sendOtp, loadingSendOtp, error }
}
