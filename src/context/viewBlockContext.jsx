// // context/BlockContext.js
// import { createContext, useState, useContext } from 'react';

// // Create the BlockContext
// const BlockContext = createContext();

// // BlockProvider component that provides the context value
// export const BlockContextProvider = ({ children }) => {
//     const [blocksContent, setBlocksContent] = useState([]);  // Default state as an empty array

//     return (
//         <BlockContext.Provider value={{ blocksContent, setBlocksContent }}>
//             {children}
//         </BlockContext.Provider>
//     );
// };

// // Custom hook to use the BlockContext
// export const useBlockContext = () => useContext(BlockContext);
