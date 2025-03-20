import React, { createContext, useState } from "react";


export const BlockContext = createContext();

// Provider Component
export const BlockProvider = ({ children }) => {
    const [close, setClose] = useState(false);

    return (
        <BlockContext.Provider value={{ close, setClose }}>
            {children}
        </BlockContext.Provider>
    );
};
