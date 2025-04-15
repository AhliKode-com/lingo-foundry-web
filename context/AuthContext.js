"use client"

import { createContext, useContext, useState, useEffect } from "react"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation";
import {toast} from "react-toastify";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("token")
        if (token) {
            const decoded = jwtDecode(token)

            if (decoded.exp * 1000 < Date.now()) {
                Cookies.remove("token")
                setUser(null)
                return
            }

            console.log(decoded)

            setUser(decoded) // use jwt token data to user object
        }

        setLoading(false)
    }, [])

    const loginContext = (token) => {
        const decoded = jwtDecode(token)
        setUser(decoded)
    }

    const logoutContext = () => {
        setUser(null)
        Cookies.remove("token")
        toast.success("Logged out")
        router.push("/")
    }

    return (
        <AuthContext.Provider value={{ user, loading, loginContext, logoutContext }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
