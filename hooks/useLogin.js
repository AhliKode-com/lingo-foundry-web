import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import Cookies from "js-cookie"
import { useAuth } from "@/context/AuthContext";
import {toast} from "react-toastify";
import { jwtDecode } from "jwt-decode";
import {useStudentCart} from "@/apis/studentCart";
import {useStudentWishList} from "@/apis/studentWishList";

export function useLogin() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter()
    const { loginContext } = useAuth()
    const { getWishList } = useStudentWishList();
    const { getCart } = useStudentCart();

    const login = async (username, password) => {
        setLoading(true)
        setError(null)
        try {
            toast.info("logging in...")
            const response = await api.post("/auth/login", { username, password })
            if (!response.data.error) {
                // Decode the token to get expiration time
                const decodedToken = jwtDecode(response.data.token);
                const expirationTime = new Date(decodedToken.exp * 1000); // Convert to milliseconds

                Cookies.set("token", response.data.token, {
                    expires: expirationTime,
                    secure: true,
                    sameSite: "strict",
                });

                loginContext(response.data.token)
                getWishList()
                getCart()
                toast.dismiss()
                toast.success("Logged in successfully.")
                
                // Check for redirect cookie
                const cookieOptions = {
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    path: '/'
                };
                
                const redirectPath = Cookies.get("redirectAfterLogin");
                console.log("Redirect path from cookie:", redirectPath); // Debug log
                
                if (redirectPath) {
                    Cookies.remove("redirectAfterLogin", cookieOptions); // Clear the cookie
                    console.log("Redirecting to:", redirectPath); // Debug log
                    
                    // Use window.location for production redirect to avoid caching issues
                    if (process.env.NODE_ENV === 'production') {
                        window.location.href = redirectPath;
                    } else {
                        router.push(redirectPath);
                    }
                } else {
                    router.push("/");
                }
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
