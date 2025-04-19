import { useEffect, useState } from "react";
import { Code } from "lucide-react";
import { Navbar001 } from "../components/ui-components/navbars/navbar-001";
import componentRegistry from "../components/ui-components/component-registry";
const CodePreview = ({ isDarkMode, fileName }) => {
    const [renderedOutput, setRenderedOutput] = useState('');
    const [error, setError] = useState(null);
    console.log(fileName);
    console.log(componentRegistry);

    // Remove .jsx extension from fileName
    const strippedFileName = fileName.replace(/\.jsx$/, "");
    console.log(strippedFileName);

    let current = componentRegistry.find((component) => component.id === strippedFileName);
    console.log(current);

    useEffect(() => {
        // Always render Navbar001
        setRenderedOutput(current.component);
        setError(null);
    }, [fileName, current]);

    return (
        <div className={`h-full flex flex-col ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
            <div className={`p-2 border-b text-sm font-medium flex items-center ${isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-gray-50 text-black border-gray-200"}`}>
                <Code size={16} className={`mr-2 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                Preview
            </div>
            <div className={`flex-grow overflow-auto p-4 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
                {error ? (
                    <div className="text-red-500">{error}</div>
                ) : renderedOutput ? (
                    <div className="preview-container">{renderedOutput}</div>
                ) : (
                    <div className={`flex flex-col items-center justify-center h-full ${isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-50 text-gray-500"}`}>
                        <Code size={48} className={`mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-300"}`} />
                        <p className="text-lg mb-2">No preview available</p>
                        <p className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>Provide code to preview</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CodePreview;
