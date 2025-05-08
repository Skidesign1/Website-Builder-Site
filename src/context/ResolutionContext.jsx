import { createContext, useState, useContext } from "react";

export const ResolutionContext = createContext();

export const ResolutionProvider = ({ children }) => {
    const [canvasSize, setCanvasSize] = useState([1920, 1080]); // Default size: Full HD

    return (
        <ResolutionContext.Provider value={{ canvasSize, setCanvasSize }}>
            {children}
        </ResolutionContext.Provider>
    );
};

// Custom hook to access the context
export const useResolution = () => {
    const context = useContext(ResolutionContext);
    if (!context) {
        throw new Error("useResolution must be used within a ResolutionProvider");
    }
    return context;
};