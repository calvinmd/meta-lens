import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { ethers } from "ethers";



export const ContractAddressContext = createContext("")



export function ContractAddressProvider({ children }) {




    const [contractAddress, setContractAddress] = useState("");
    function setCAddress(add) {
        setContractAddress(add)
    }

    function getCAddress() {
        return contractAddress
    }
    return (
        <ContractAddressContext.Provider value={{ contractAddress, setCAddress, getCAddress }}>
            {children}
        </ContractAddressContext.Provider>
    )
}