import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { ethers } from "ethers";



export const ProviderContext = createContext("")



export function ProviderProvider({ children }) {

    useEffect(() => {

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        setPro(provider)


    }, [])


    const [pro, setPro] = useState("");

    function getProvider() {
        return pro
    }
    return (
        <ProviderContext.Provider value={{ pro, getProvider }}>
            {children}
        </ProviderContext.Provider>
    )
}