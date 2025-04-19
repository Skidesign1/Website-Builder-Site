import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    selectContainers,
    updateComponentCode,
} from "../reduxState/websiteBuilderSlice";
import MonacoEditor from "@monaco-editor/react";
import {
    Download,
    ChevronRight,
    ChevronDown,
    Folder,
    FileText,
    Code,
    Save,
    ArrowLeft,
    Sun,
    Moon,
    LayoutPanelLeft,
    Minimize,
} from "lucide-react";
import "./CodeEditor.css";
import { toast } from "sonner";
import CodePreview from "./codepreview";
import {
    ResizablePanelGroup,
    ResizablePanel,
    ResizableHandle,
} from "../components/ui/resizable";

const CodeEditorRedux = () => {
    const dispatch = useDispatch();
    const containers = useSelector(selectContainers);

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileContent, setFileContent] = useState("");
    const [expandedFolders, setExpandedFolders] = useState({});
    const [showPreview, setShowPreview] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [selectedContainerId, setSelectedContainerId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedTheme = localStorage.getItem("code-editor-theme");
        if (savedTheme) {
            setIsDarkMode(savedTheme === "dark");
        } else {
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            setIsDarkMode(prefersDark);
        }

        if (containers && containers.length > 0) {
            const expanded = {};
            containers.forEach((container) => {
                expanded[container.id] = true;
            });
            setExpandedFolders(expanded);
        }
    }, [containers]);

    useEffect(() => {
        localStorage.setItem("code-editor-theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    useEffect(() => {
        if (!selectedContainerId) return;

        const fetchComponent = async () => {
            const container = containers.find((c) => c.id === selectedContainerId);
            if (!container || !container.component) return;

            const componentName = container.component.component.id;

            try {
                const response = await fetch(`http://localhost:3000/api/component/${componentName}`);
                const data = await response.json();

                const fileData = {
                    containerId: selectedContainerId,
                    componentId: container.component.id,
                    name: `${componentName}.jsx`,
                    content: data.content || "// Component content not found",
                };

                setSelectedFile(fileData);
                setFileContent(fileData.content);
            } catch (error) {
                console.error("❌ Failed to fetch component:", error);
                setFileContent("// Failed to load component from server");
            }
        };

        fetchComponent();
    }, [selectedContainerId, containers]);

    const handleFileSelect = (containerId) => {
        if (selectedContainerId !== containerId) {
            setSelectedContainerId(containerId);
        }
    };

    const toggleFolder = (containerId) => {
        setExpandedFolders((prev) => ({
            ...prev,
            [containerId]: !prev[containerId],
        }));
    };

    const saveFile = () => {
        if (!selectedFile) {
            toast.error("No file selected");
            return;
        }

        dispatch(
            updateComponentCode({
                containerId: selectedFile.containerId,
                code: fileContent,
            })
        );

        toast.success("File saved successfully!");
    };

    const handleExport = async () => {
        try {
            alert("Export functionality would be implemented here");
        } catch (error) {
            console.error("Export failed:", error);
            alert("Failed to export project. See console for details.");
        }
    };

    const togglePreview = () => {
        setShowPreview(!showPreview);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        toast.success(`Switched to ${!isDarkMode ? "dark" : "light"} mode`);
    };

    return (
        <div
            className={`flex h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
                }`}
        >
            {/* Sidebar */}
            <div
                className={`w-50 border-r overflow-auto shadow-sm ${isDarkMode
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-200 bg-white"
                    }`}
            >
                <div
                    className={`p-4 font-bold border-b flex items-center justify-between ${isDarkMode
                        ? "border-gray-700 bg-gray-800"
                        : "border-gray-200 bg-gray-50"
                        }`}
                >
                    <div className="flex items-center">
                        <Code
                            className={`mr-2 ${isDarkMode ? "text-blue-400" : "text-blue-600"
                                }`}
                            size={18}
                        />
                        <span>Code Editor</span>
                    </div>
                </div>

                <div className="p-2 file-explorer">
                    {containers && containers.length > 0 ? (
                        containers.map((container) => (
                            <div key={container.id} className="mb-1">
                                <div
                                    className={`flex items-center p-2 cursor-pointer rounded file-explorer-item ${selectedFile && selectedFile.containerId === container.id
                                        ? isDarkMode
                                            ? "bg-blue-900 bg-opacity-30"
                                            : "selected-file"
                                        : ""
                                        } ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                                    onClick={() => toggleFolder(container.id)}
                                >
                                    {expandedFolders[container.id] ? (
                                        <ChevronDown
                                            size={16}
                                            className={`mr-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                                                }`}
                                        />
                                    ) : (
                                        <ChevronRight
                                            size={16}
                                            className={`mr-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                                                }`}
                                        />
                                    )}
                                    <Folder
                                        size={16}
                                        className={`mr-2 ${isDarkMode ? "text-blue-400" : "text-blue-500"
                                            }`}
                                    />
                                    <span className="text-sm">
                                        {container.title || `Container ${container.id}`}
                                    </span>
                                </div>

                                {expandedFolders[container.id] && container.component && (
                                    <div
                                        className={`ml-6 p-2 cursor-pointer rounded flex items-center file-explorer-item ${selectedFile &&
                                            selectedFile.containerId === container.id &&
                                            selectedFile.componentId === container.component.id
                                            ? isDarkMode
                                                ? "bg-blue-900 bg-opacity-30"
                                                : "selected-file"
                                            : ""
                                            } ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                            }`}
                                        onClick={() => handleFileSelect(container.id)}
                                    >
                                        <FileText
                                            size={16}
                                            className={`mr-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                                                }`}
                                        />
                                        <span className="text-sm">
                                            {container.component.type}.jsx
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div
                            className={`p-4 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"
                                }`}
                        >
                            No files available
                        </div>
                    )}
                </div>
            </div>

            {/* Main Editor */}
            <div className="flex flex-col flex-grow">
                <div
                    className={`flex items-center p-3 border-b shadow-sm ${isDarkMode
                        ? "border-gray-700 bg-gray-800"
                        : "border-gray-200 bg-white"
                        }`}
                >
                    <button
                        className={`p-2 rounded mr-2 ${isDarkMode
                            ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            }`}
                        onClick={() => navigate("/")}
                        title="Back to Builder"
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <div className="flex-grow mx-2">
                        {selectedFile ? (
                            <span className="font-medium text-sm">{selectedFile.name}</span>
                        ) : (
                            <span
                                className={
                                    isDarkMode ? "text-gray-400 text-sm" : "text-gray-500 text-sm"
                                }
                            >
                                No file selected
                            </span>
                        )}
                    </div>

                    <div className="flex items-center mr-4">
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded ${isDarkMode
                                ? "text-yellow-200 hover:bg-gray-700"
                                : "text-blue-600 hover:bg-gray-100"
                                }`}
                            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>

                    <button
                        className={`p-2 rounded mr-2 ${isDarkMode
                            ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            }`}
                        onClick={togglePreview}
                        title={showPreview ? "Hide Preview" : "Show Preview"}
                    >
                        {showPreview ? (
                            <Minimize size={18} />
                        ) : (
                            <LayoutPanelLeft size={18} />
                        )}
                    </button>

                    <button
                        className={`p-2 rounded mr-2 flex items-center ${selectedFile
                            ? isDarkMode
                                ? "text-blue-400 hover:bg-blue-900 hover:bg-opacity-30"
                                : "text-blue-600 hover:bg-blue-50"
                            : isDarkMode
                                ? "text-gray-600"
                                : "text-gray-400"
                            }`}
                        onClick={saveFile}
                        disabled={!selectedFile}
                        title="Save file"
                    >
                        <Save size={18} className="mr-1" />
                        <span className="text-sm">Save</span>
                    </button>

                    <button
                        className={`p-2 rounded ${isDarkMode
                            ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            }`}
                        onClick={handleExport}
                        title="Export project"
                    >
                        <Download size={18} />
                    </button>
                </div>

                <div className="flex-grow overflow-hidden">
                    {selectedFile ? (
                        showPreview ? (
                            <ResizablePanelGroup direction="horizontal">
                                <ResizablePanel defaultSize={50} minSize={25}>
                                    <div className="h-full">
                                        <MonacoEditor
                                            height="100%"
                                            defaultLanguage="javascript"
                                            language={selectedFile.name.endsWith(".jsx") ? "javascript" : "plaintext"}
                                            theme={isDarkMode ? "vs-dark" : "light"}
                                            value={fileContent}
                                            onChange={(value) => setFileContent(value || "")}
                                            options={{
                                                automaticLayout: true,
                                                scrollBeyondLastLine: false,
                                                wordWrap: "on",
                                                minimap: { enabled: true },
                                                bracketPairColorization: { enabled: true },
                                                matchBrackets: "always",
                                                tabSize: 2,
                                                fontSize: 14,
                                                fontFamily: "'Fira Code', monospace",
                                                suggestOnTriggerCharacters: true,
                                                quickSuggestions: true,
                                                parameterHints: { enabled: true },
                                                formatOnType: true,
                                                formatOnPaste: true,
                                                folding: true,
                                                renderWhitespace: "all",
                                                renderLineHighlight: "all",
                                            }}
                                        />
                                    </div>
                                </ResizablePanel>

                                <ResizableHandle withHandle />

                                <ResizablePanel defaultSize={50} minSize={25}>
                                    <CodePreview
                                        code={fileContent}
                                        fileName={selectedFile.name}
                                        isDarkMode={isDarkMode}
                                    />
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        ) : (
                            <div className="h-full">
                                <MonacoEditor
                                    height="100%"
                                    defaultLanguage="javascript"
                                    language={selectedFile.name.endsWith(".jsx") ? "javascript" : "plaintext"}
                                    theme={isDarkMode ? "vs-dark" : "light"}
                                    value={fileContent}
                                    onChange={(value) => setFileContent(value || "")}
                                    options={{
                                        automaticLayout: true,
                                        scrollBeyondLastLine: false,
                                        wordWrap: "on",
                                        minimap: { enabled: true },
                                        bracketPairColorization: { enabled: true },
                                        matchBrackets: "always",
                                        tabSize: 2,
                                        fontSize: 14,
                                        fontFamily: "'Fira Code', monospace",
                                        suggestOnTriggerCharacters: true,
                                        quickSuggestions: true,
                                        parameterHints: { enabled: true },
                                        formatOnType: true,
                                        formatOnPaste: true,
                                        folding: true,
                                        renderWhitespace: "all",
                                        renderLineHighlight: "all",
                                    }}
                                />
                            </div>
                        )
                    ) : (
                        <div
                            className={`flex flex-col items-center justify-center h-full ${isDarkMode
                                ? "bg-gray-900 text-gray-300"
                                : "bg-gray-50 text-gray-500"
                                }`}
                        >
                            <Code
                                size={48}
                                className={
                                    isDarkMode ? "mb-4 text-gray-600" : "mb-4 text-gray-300"
                                }
                            />
                            <p className="text-lg mb-2">Select a file to edit</p>
                            <p
                                className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-400"
                                    }`}
                            >
                                Files are organized by containers
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CodeEditorRedux;