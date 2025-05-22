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
    // console.log("Containers from Redux:", containers);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileContent, setFileContent] = useState("");
    const [expandedFolders, setExpandedFolders] = useState({});
    const [showPreview, setShowPreview] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [selectedContainerId, setSelectedContainerId] = useState(null);
    const [selectCompPreview, setSelectedComponentId] = useState(null);
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
    // console.log("Selected file:", selectedFile);
    const handleFileSelect = (containerId, fileType) => {
        // console.log(`📂 Selecting file for container: ${containerId}, type: ${fileType}`);
        const container = containers.find((c) => c.id === containerId);
        if (!container || !container.component) {
            console.warn("⚠️ Container or component not found");
            return;
        }
        // console.log("Container data:", container.component.component.component);
        if (fileType === "jsx") {
            const componentName = container.component.component.id;
            const jsxFileData = {
                containerId,
                componentId: container.component.id,
                name: `${componentName}.jsx`,
                content: container.component.component.component || "// No content available",
                type: "jsx",
                preview: container.component.component.component,
            };

            console.log("JSX File Data:", jsxFileData);
            setSelectedFile(jsxFileData);
            setFileContent(jsxFileData.content);
            setSelectedComponentId(jsxFileData.preview)
        } else if (fileType === "json") {
            const jsonFileData = {
                containerId,
                componentId: container.component.id,
                name: `${container?.component?.component?.label}.JSON`,
                content: JSON.stringify(container?.component?.component?.config) || "// No content available",
                type: "json",
                preview: container.component.component.component,
            };
            setSelectedComponentId(jsonFileData.preview)
            console.log("JSON File Data:", jsonFileData);
            setSelectedFile(jsonFileData);
            setFileContent(jsonFileData.content);
        }
    };

    // console.log("File content:", fileContent);
    const toggleFolder = (containerId) => {
        setExpandedFolders((prev) => ({
            ...prev,
            [containerId]: !prev[containerId],
        }));
    };

    const saveFile = () => {
        if (!selectedFile) {
            console.error("❌ No file selected for saving");
            toast.error("No file selected");
            return;
        }

        if (!fileContent) {
            console.error("❌ File content is empty");
            toast.error("File content is empty");
            return;
        }
        // Simulate save (no API call)
        dispatch(
            updateComponentCode({
                containerId: selectedFile.containerId,
                code: fileContent,
            })
        );
        toast.success("File saved successfully!");
    };

    const handleExport = () => {
        alert("Export functionality would be implemented here");
    };

    const togglePreview = () => {
        setShowPreview(!showPreview);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        toast.success(`Switched to ${!isDarkMode ? "dark" : "light"} mode`);
    };

    // console.log(containers[0]?.component?.component)
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
                                    <div>
                                        <div
                                            className={`ml-6 flex-col p-2 cursor-pointer rounded flex items-center file-explorer-item ${selectedFile &&
                                                selectedFile.containerId === container.id &&
                                                selectedFile.componentId === container.component.id &&
                                                selectedFile.type === "jsx"
                                                ? isDarkMode
                                                    ? "bg-blue-900 bg-opacity-30"
                                                    : "selected-file"
                                                : ""
                                                } ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                                }`}
                                            onClick={() => handleFileSelect(container.id, "jsx")}
                                        >
                                            <div className="flex items-center">
                                                <FileText
                                                    size={16}
                                                    className={`mr-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                                                        }`}
                                                />
                                                <span className="text-sm">
                                                    {container.component.label}.jsx
                                                </span>
                                            </div>
                                        </div>

                                        <div
                                            className={`ml-6 flex-col p-2 cursor-pointer rounded flex items-center file-explorer-item ${selectedFile &&
                                                selectedFile.containerId === container.id &&
                                                selectedFile.componentId === container.component.id &&
                                                selectedFile.type === "json"
                                                ? isDarkMode
                                                    ? "bg-blue-900 bg-opacity-30"
                                                    : "selected-file"
                                                : ""
                                                } ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                                }`}
                                            onClick={() => handleFileSelect(container.id, "json")}
                                        >
                                            <div className="flex items-center">
                                                <FileText
                                                    size={16}
                                                    className={`mr-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                                                        }`}
                                                />
                                                <span className="text-sm">
                                                    {container?.component?.component?.label}.JSON
                                                </span>
                                            </div>
                                        </div>
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
                            <span className="font-medium text-sm">{selectedFile?.name}</span>
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
                                            language={selectedFile?.name.endsWith(".jsx") ? "javascript" : "plaintext"}
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
                                        fileName={selectedFile?.name}
                                        isDarkMode={isDarkMode}
                                    />
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        ) : (
                            <div className="h-full">
                                <MonacoEditor
                                    height="100%"
                                    defaultLanguage="javascript"
                                    language={selectedFile?.name.endsWith(".jsx") ? "javascript" : "plaintext"}
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