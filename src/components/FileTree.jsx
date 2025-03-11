
import React, { useState } from 'react';
import './FileTree.css'; // Import custom CSS for styling

const FileTree = ({ files }) => {
  const [expandedFolders, setExpandedFolders] = useState([]);

  const toggleFolder = (name) => {
    setExpandedFolders((prev) =>
      prev.includes(name)
        ? prev.filter((folder) => folder !== name)
        : [...prev, name]
    );
  };

  const renderFileTree = (items) => {
    return items.map((item) => (
      <div key={item.name} className="file-tree-item">
        {item.type === 'folder' ? (
          <div>
            <div
              className={`file-tree-folder ${
                expandedFolders.includes(item.name) ? 'expanded' : ''
              }`}
              onClick={() => toggleFolder(item.name)}
            >
              {expandedFolders.includes(item.name) ? '📂' : '📁'} {item.name}
            </div>
            {expandedFolders.includes(item.name) &&
              item.children && (
                <div className="file-tree-children">
                  {renderFileTree(item.children)}
                </div>
              )}
          </div>
        ) : (
          <div className="file-tree-file">📄 {item.name}</div>
        )}
      </div>
    ));
  };

  return <div className="file-tree">{renderFileTree(files)}</div>;
};

export default FileTree;
