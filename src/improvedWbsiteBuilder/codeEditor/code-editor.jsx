"use client"

import { useState } from "react"
import { Controlled as CodeMirror } from "react-codemirror2"
import { useNavigate } from "react-router-dom"
import "codemirror/lib/codemirror.css"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/xml/xml"
import "codemirror/mode/css/css"
import "codemirror/addon/hint/show-hint.css"
import "codemirror/addon/hint/javascript-hint"
import "codemirror/addon/hint/html-hint"
import "codemirror/addon/hint/css-hint"
import { useCode } from "../context/CodeContext"
import { Download, ChevronRight, ChevronDown, Folder, FileText, Code } from "lucide-react"
import "./CodeEditor.css"

const CodeEditor = () => {
    const { code } = useCode()
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileContent, setFileContent] = useState("")
    const [expandedFolders, setExpandedFolders] = useState({})
    const navigate = useNavigate()

    // Function to determine the language mode based on file extension
    const getLanguageMode = (fileName) => {
        if (fileName.endsWith(".js") || fileName.endsWith(".jsx")) return "javascript"
        if (fileName.endsWith(".html")) return "xml"
        if (fileName.endsWith(".css")) return "css"
        return "javascript" // Default
    }

    // Handle file selection
    const handleFileSelect = (containerId, componentId) => {
        const container = code.find((c) => c.id === containerId)
        if (container && container.component) {
            const fileData = {
                containerId,
                componentId: container.component.id,
                name: `${container.component.type}.jsx`,
                content: JSON.stringify(container.component, null, 2),
                'love': 'package.json',
            }

            setSelectedFile(fileData)
            setFileContent(fileData.content)
        }
    }

    // Toggle folder expansion
    const toggleFolder = (containerId) => {
        setExpandedFolders((prev) => ({
            ...prev,
            [containerId]: !prev[containerId],
        }))
    }

    // Export code as a zip file
    const exportCode = () => {
        // This would be implemented with a library like JSZip
        alert("Export functionality would be implemented here")
    }

    // Save code to localStorage
    const saveCode = () => {
        if (selectedFile) {
            // Here you would update the actual code in your state/context
            alert("Code saved successfully!")
        } else {
            alert("Please select a file to save")
        }
    }

    return (
        <div className="flex h-screen bg-white">
            {/* File Explorer */}
            <div className="w-64 border-r border-gray-200 overflow-auto bg-gray-50">
                <div className="p-4 font-bold border-b border-gray-200 flex items-center">
                    <Code className="mr-2" size={18} />
                    Project Files
                </div>
                <div className="p-2">
                    {code && code.length > 0 ? (
                        code.map((container) => (
                            <div key={container.id} className="mb-2">
                                <div
                                    className="flex items-center p-2 hover:bg-gray-200 cursor-pointer rounded"
                                    onClick={() => toggleFolder(container.id)}
                                >
                                    {expandedFolders[container.id] ? (
                                        <ChevronDown size={16} className="mr-1" />
                                    ) : (
                                        <ChevronRight size={16} className="mr-1" />
                                    )}
                                    <Folder size={16} className="mr-2 text-blue-500" />
                                    <span>{container.title || `Container ${container.id}`}</span>
                                </div>

                                {expandedFolders[container.id] && container.component && (
                                    <div
                                        className="ml-6 p-2 hover:bg-gray-200 cursor-pointer rounded flex items-center"
                                        onClick={() => handleFileSelect(container.id, container.component.id)}
                                    >
                                        <FileText size={16} className="mr-2 text-gray-500" />
                                        <span>{container.component.type}.jsx</span>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-gray-500">No files available</div>
                    )}
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex flex-col flex-grow">
                {/* Toolbar */}
                <div className="flex items-center p-4 border-b border-gray-200">
                    <div className="flex-grow">
                        {selectedFile ? (
                            <span className="font-medium">{selectedFile.name}</span>
                        ) : (
                            <span className="text-gray-500">No file selected</span>
                        )}
                    </div>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600" onClick={saveCode}>
                        Save
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900" onClick={exportCode} title="Export code">
                        <Download size={20} />
                    </button>
                    <button className="ml-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" onClick={() => navigate("/")}>
                        Back to Builder
                    </button>
                </div>

                {/* Editor */}
                <div className="flex-grow overflow-hidden">
                    {selectedFile ? (
                        <div className="h-full">
                            <CodeMirror
                                value={fileContent}
                                options={{
                                    mode: getLanguageMode(selectedFile.name),
                                    lineNumbers: true,
                                    extraKeys: { "Ctrl-Space": "autocomplete" },
                                    styleActiveLine: true,
                                    lineWrapping: true,
                                    theme: "default",
                                }}
                                onBeforeChange={(editor, data, value) => {
                                    setFileContent(value)
                                }}
                                editorDidMount={(editor) => {
                                    editor.refresh()
                                }}
                            />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
                            Select a file to edit
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CodeEditor
