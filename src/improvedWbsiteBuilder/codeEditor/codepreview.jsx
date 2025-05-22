import { useEffect, useState } from "react";
import { Code } from "lucide-react";
import { ComponentPreview } from "../components/component-preview";

const CodePreview = ({ isDarkMode, fileName, code }) => {
    console.log(fileName);
    console.log(code);
    // Remove .jsx extension from fileName
    const strippedFileName = fileName?.replace(/\.jsx$/, "");
    console.log(strippedFileName);

    return (
        <div className={`h-full flex flex-col ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
            <div className={`p-2 border-b text-sm font-medium flex items-center ${isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-gray-50 text-black border-gray-200"}`}>
                <Code size={16} className={`mr-2 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                Preview
            </div>
            <div className={`flex-grow overflow-auto p-4 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
                {code ? (
                    <div className="preview-container"><ComponentPreview component={code} /></div>
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
