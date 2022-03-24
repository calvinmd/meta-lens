import React, { useState } from "react";
import { createContext } from "react";
import Web3 from 'web3';
export const AddressContext = createContext("");



export function AddressProvider({ children }) {
    const [address, setAddress] = useState('');
    function addAddress(add) {
        setAddress(add);
    }
    function getAddress() {
        return address;
    }
    return (
        <AddressContext.Provider value={{ address, addAddress, getAddress }}>
            {children}
        </AddressContext.Provider>
    )
}