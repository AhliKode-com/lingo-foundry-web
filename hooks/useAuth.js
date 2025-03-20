"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

export function useAuth() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
            const token = Cookies.get("token")
            if (!token) {
                setLoading(false)
                return
            }

            try {
                const decoded = jwtDecode(token)

                console.log(decoded)

                if (decoded.exp * 1000 < Date.now()) {
                    Cookies.remove("token")
                    router.push("/login")
                    return;
                }

                setUser(decoded)
            } catch (error) {
                Cookies.remove("token")
                router.push("/login")
            } finally {
                setLoading(false)
            }
        };

        checkAuth()
    }, [router])

    return { user, loading }
}
