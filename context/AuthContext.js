"use client"

import { createContext, useContext, useState, useEffect } from "react"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation";
import {toast} from "react-toastify";
import {useUserController} from "@/apis/userController";
import {getUserMe} from "@/apis/getUserMe";
import api from "@/lib/api";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter();
    const { data } = getUserMe();

    useEffect(() => {
        console.log("user", user)
        const token = Cookies.get("token")
        if (token) {
            const decoded = jwtDecode(token)

            if (decoded.exp * 1000 < Date.now()) {
                Cookies.remove("token")
                setUser(null)
                return
            }

            const userData = data
            if (userData) {
                userData.photoProfileUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/file/download/" + data.profilePhotoObjectKey
            }

            if (data) {
                setUser(userData)
            }
        }

        setLoading(false)
    }, [data])

    const refreshUser = async () => {
        const token = Cookies.get("token");
        try {
            const response = await api.get("/user/me", {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                }
            });
            const userData = response.data.data
            if (userData) {
                userData.photoProfileUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/file/download/" + response.data.data.profilePhotoObjectKey
            }
            setUser(userData);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to get user me")
        }
    }

    const loginContext = (token) => {
        const decoded = jwtDecode(token)
        refreshUser()
    }

    const logoutContext = () => {
        setUser(null)
        Cookies.remove("token")
        toast.success("Logged out")
        router.push("/")
    }

    return (
        <AuthContext.Provider value={{ user, loading, loginContext, logoutContext, refreshUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
