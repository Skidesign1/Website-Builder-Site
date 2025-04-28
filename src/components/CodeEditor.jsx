import React, { useState } from "react";

const CodeEditor = () => {
  const [directory, setDirectory] = useState([]);
  const [fileContent, setFileContent] = useState("");

  const handleOpenDirectory = async () => {
    const dirPath = await window.electronAPI.openDirectoryDialog();
    if (dirPath) {
      const files = await window.electronAPI.readDirectory(dirPath);
      setDirectory(files);
    }
  };

  const handleReadFile = async (filePath) => {
    const content = await window.electronAPI.readFile(filePath);
    setFileContent(content);
  };

  return (
    <div>
      <button onClick={handleOpenDirectory}>Open Directory</button>
      <ul>
        {directory.map((file) => (
          <li key={file.path} onClick={() => handleReadFile(file.path)}>
            {file.name}
          </li>
        ))}
      </ul>
      <textarea value={fileContent} readOnly />
    </div>
  );
};

export default CodeEditor;
