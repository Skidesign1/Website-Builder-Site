import React, { createContext, useState } from "react";


export const BlockContext = createContext();

// Provider Component
export const BlockProvider = ({ children }) => {
    const [close, setClose] = useState(false);
    function handleBlockNav() {
        setClose(!close)
    }

    return (
        <BlockContext.Provider value={{ close, setClose, handleBlockNav }}>
            {children}
        </BlockContext.Provider>
    );
};
