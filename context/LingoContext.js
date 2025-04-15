"use client"

import {createContext, useContext, useState} from "react"

const LingoContext = createContext()

export const LingoProvider = ({ children }) => {
    const [wishlists, setWishlists] = useState(null)
    const [carts, setCarts] = useState(null)

    return (
        <LingoContext.Provider value={{
            wishlists,
            setWishlists,
            carts,
            setCarts,
        }}>
            {children}
        </LingoContext.Provider>
    )
}

export const useLingoContext = () => useContext(LingoContext)
