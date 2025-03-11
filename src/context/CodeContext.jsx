import { createContext, useContext, useState } from "react";

const CodeContext = createContext();

export const CodeProvider = ({ children }) => {
  const [code, setCode] = useState(""); // Stores JSX/HTML Code

  return (
    <CodeContext.Provider value={{ code, setCode }}>
      {children}
    </CodeContext.Provider>
  );
};

// Custom hook for easy access
export const useCode = () => useContext(CodeContext);
