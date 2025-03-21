// src/context/ComponentsContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
export const ComponentsContext = createContext();

// Create a provider component
export const ComponentsProvider = ({ children }) => {
    const [components, setComponents] = useState([]);
    const [canvasSize, setCanvasSize] = useState({ width: '100%', height: '100%' });

    return (
        <ComponentsContext.Provider value={{ components, setComponents, canvasSize, setCanvasSize }}>
            {children}
        </ComponentsContext.Provider>
    );
};

// Custom hook to use the context
export const useComponents = () => useContext(ComponentsContext);
