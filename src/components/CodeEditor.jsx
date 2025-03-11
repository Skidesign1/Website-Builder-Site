import React, { useState, useEffect } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { useNavigate, useLocation } from 'react-router-dom';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/css-hint';
import { EditorView } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";

import './CodeEditor.css';
import { componentsCode } from './componentsCode';

const CodeEditor = () => {
  const [code, setCode] = useState(""); // Define the state for code
  const navigate = useNavigate();
  const location = useLocation();
  const { components } = location.state || { components: [] };

  const language = "xml"; // Defined to avoid errors

  useEffect(() => {
    if (components.length > 0) {
      const generatedCode = components.map((comp) => {
        return componentsCode[comp.id] || `<div>${comp.id}</div>`;
      }).join("\n\n");

      setCode(generatedCode);
    } else {
      const savedCode = localStorage.getItem('code');
      if (savedCode) {
        setCode(savedCode);
      }
    }
  }, [components]);

  // useEffect(() => {
  //   import("codemirror/lib/codemirror.css");
  //   import("codemirror/mode/javascript/javascript");
  //   import("codemirror/mode/xml/xml");
  //   import("codemirror/mode/css/css");
  //   import("codemirror/addon/hint/show-hint.css");
  //   import("codemirror/addon/hint/javascript-hint");
  //   import("codemirror/addon/hint/html-hint");
  //   import("codemirror/addon/hint/css-hint");
  // }, []);
  

  const saveCode = () => {
    localStorage.setItem('code', code);
    alert('Code saved successfully!');
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="flex flex-col w-full p-4">
        <div className="flex mb-4">
          <button className="mr-2 bg-gray-200 p-2" onClick={saveCode}>Save</button>
          <button className="ml-auto bg-gray-200 p-2" onClick={() => navigate('/')}>Back to Builder</button>
        </div>
        <div className="code-editor-wrapper flex-grow" style={{ height: 'calc(100vh - 96px)', overflow: 'auto' }}>
          <CodeMirror
            value={code}
            options={{
              mode: language,
              lineNumbers: true,
              extraKeys: { "Ctrl-Space": "autocomplete" },
              styleActiveLine: true,
              lineWrapping: true,
            }}
            onBeforeChange={(editor, data, value) => {
              setCode(value);
            }}
            editorDidMount={(editor) => {
              editor.refresh();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
