"use client"

import { useState, useEffect } from "react"
import { Controlled as CodeMirror } from "react-codemirror2"
import { useNavigate } from "react-router-dom"
import "codemirror/lib/codemirror.css"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/jsx/jsx"
import "codemirror/mode/xml/xml"
import "codemirror/mode/css/css"
import "codemirror/addon/hint/show-hint.css"
import "codemirror/addon/hint/javascript-hint"
import "codemirror/addon/hint/html-hint"
import "codemirror/addon/hint/css-hint"
import "codemirror/addon/edit/closebrackets"
import "codemirror/addon/edit/closetag"
import "codemirror/addon/fold/foldcode"
import "codemirror/addon/fold/foldgutter"
import "codemirror/addon/fold/brace-fold"
import "codemirror/addon/fold/xml-fold"
import "codemirror/addon/fold/indent-fold"
import "codemirror/addon/fold/markdown-fold"
import "codemirror/addon/fold/comment-fold"
import "codemirror/addon/fold/foldgutter.css"
import { useCode } from "../context/CodeContext"
import { buildFileSystem, exportProjectAsZip } from "./file-utils"
import { Download, ChevronRight, ChevronDown, Folder, FileText, Code, Save, ArrowLeft } from "lucide-react"
import "./CodeEditor.css"

const EnhancedCodeEditor = () => {
    const { code, setCode } = useCode()
    const [fileSystem, setFileSystem] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileContent, setFileContent] = useState("")
    const [expandedFolders, setExpandedFolders] = useState({})
    const navigate = useNavigate()

    // Initialize file system when code changes
    useEffect(() => {
        if (code && code.length > 0) {
            const fs = buildFileSystem(code)
            setFileSystem(fs)

            // Expand all folders by default
            const expanded = {}
            code.forEach((container) => {
                expanded[container.id] = true
            })
            setExpandedFolders(expanded)
        }
    }, [code])

    // Get language mode based on file extension
    const getLanguageMode = (fileName) => {
        if (fileName.endsWith(".js") || fileName.endsWith(".jsx")) return "jsx"
        if (fileName.endsWith(".html")) return "xml"
        if (fileName.endsWith(".css")) return "css"
        return "jsx" // Default
    }

    // Handle file selection
    const handleFileSelect = (containerId, componentId) => {
        const container = code.find((c) => c.id === containerId)
        if (container && container.component) {
            // Create a component template if no actual code exists
            let componentCode
            if (typeof container.component.component === "string") {
                componentCode = container.component.component
            } else {
                componentCode = `import React from 'react';

export default function ${container.component.type}() {
  return (
    <div className="${container.component.type.toLowerCase()}-component">
      <h2>${container.component.label || container.component.type}</h2>
      {/* Add your component content here */}
    </div>
  );
}`
            }

            const fileData = {
                containerId,
                componentId: container.component.id,
                name: `${container.component.type}.jsx`,
                content: componentCode,
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

    // Save current file
    const saveFile = () => {
        if (!selectedFile) {
            alert("No file selected")
            return
        }

        // Update the component code in the container
        const updatedCode = code.map((container) => {
            if (container.id === selectedFile.containerId && container.component) {
                return {
                    ...container,
                    component: {
                        ...container.component,
                        component: fileContent, // Store the actual code
                    },
                }
            }
            return container
        })

        setCode(updatedCode)
        alert("File saved successfully!")
    }

    // Export project
    const handleExport = async () => {
        try {
            await exportProjectAsZip(code)
        } catch (error) {
            console.error("Export failed:", error)
            alert("Failed to export project. See console for details.")
        }
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* File Explorer */}
            <div className="w-72 border-r border-gray-200 overflow-auto bg-white shadow-sm">
                <div className="p-4 font-bold border-b border-gray-200 flex items-center bg-gray-50">
                    <Code className="mr-2 text-blue-600" size={18} />
                    <span>Project Files</span>
                </div>

                <div className="p-2 file-explorer">
                    {code && code.length > 0 ? (
                        code.map((container) => (
                            <div key={container.id} className="mb-1">
                                <div
                                    className={`flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded file-explorer-item ${selectedFile && selectedFile.containerId === container.id ? "bg-blue-50" : ""
                                        }`}
                                    onClick={() => toggleFolder(container.id)}
                                >
                                    {expandedFolders[container.id] ? (
                                        <ChevronDown size={16} className="mr-1 text-gray-500" />
                                    ) : (
                                        <ChevronRight size={16} className="mr-1 text-gray-500" />
                                    )}
                                    <Folder size={16} className="mr-2 text-blue-500" />
                                    <span className="text-sm">{container.title || `Container ${container.id}`}</span>
                                </div>

                                {expandedFolders[container.id] && container.component && (
                                    <div
                                        className={`ml-6 p-2 hover:bg-gray-100 cursor-pointer rounded flex items-center file-explorer-item ${selectedFile && selectedFile.containerId === container.id ? "bg-blue-50" : ""
                                            }`}
                                        onClick={() => handleFileSelect(container.id, container.component.id)}
                                    >
                                        <FileText size={16} className="mr-2 text-gray-500" />
                                        <span className="text-sm">{container.component.type}.jsx</span>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-gray-500 text-sm">No files available</div>
                    )}
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex flex-col flex-grow">
                {/* Toolbar */}
                <div className="flex items-center p-3 border-b border-gray-200 bg-white shadow-sm">
                    <button
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded mr-2"
                        onClick={() => navigate("/")}
                        title="Back to Builder"
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <div className="flex-grow mx-2">
                        {selectedFile ? (
                            <span className="font-medium text-sm">{selectedFile.name}</span>
                        ) : (
                            <span className="text-gray-500 text-sm">No file selected</span>
                        )}
                    </div>

                    <button
                        className={`p-2 rounded mr-2 flex items-center ${selectedFile ? "text-blue-600 hover:bg-blue-50" : "text-gray-400"
                            }`}
                        onClick={saveFile}
                        disabled={!selectedFile}
                        title="Save file"
                    >
                        <Save size={18} className="mr-1" />
                        <span className="text-sm">Save</span>
                    </button>

                    <button
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                        onClick={handleExport}
                        title="Export project"
                    >
                        <Download size={18} />
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
                                    autoCloseBrackets: true,
                                    autoCloseTags: true,
                                    foldGutter: true,
                                    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
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
                        <div className="flex flex-col items-center justify-center h-full bg-gray-50 text-gray-500">
                            <Code size={48} className="mb-4 text-gray-300" />
                            <p className="text-lg mb-2">Select a file to edit</p>
                            <p className="text-sm text-gray-400">Files are organized by containers</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EnhancedCodeEditor
