import JSZip from "jszip"
import { saveAs } from "file-saver"
import CodeEditorRedux from "./CodeEditorRedux" // Import the CodeEditorRedux component

// Export project as a zip file
export const exportProjectAsZip = async (containers) => {
    const zip = new JSZip()

    // Create src folder
    const src = zip.folder("src")

    // Create components folder
    const components = src.folder("components")

    // Add each container as a folder with its component as a file
    containers.forEach((container) => {
        const folderName = container.title || `Container_${container.id}`
        const containerFolder = components.folder(folderName)

        if (container.component) {
            const fileName = `${container.component.type}.jsx`
            let fileContent

            // If the component has actual code, use it
            if (typeof container.component.component === "string") {
                fileContent = container.component.component
            } else {
                // Otherwise create a basic component template
                fileContent = `import React from 'react';

export default function ${container.component.type}() {
  return (
    <div>
      <h2>${container.component.label || container.component.type}</h2>
      {/* Component content would go here */}
    </div>
  );
}`
            }

            containerFolder.file(fileName, fileContent)
        }
    })

    // Create index.js file
    const indexContent = `import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);`

    src.file("index.js", indexContent)

    // Create App.js that imports all components
    let appImports = ""
    let appComponents = ""

    containers.forEach((container) => {
        if (container.component) {
            const componentName = container.component.type
            const folderName = container.title || `Container_${container.id}`
            appImports += `import ${componentName} from './components/${folderName}/${componentName}';\n`
            appComponents += `      <${componentName} />\n`
        }
    })

    const appContent = `import React from 'react';
${appImports}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Website</h1>
      </header>
      <main>
${appComponents}
      </main>
      <footer>
        <p>Created with Website Builder</p>
      </footer>
    </div>
  );
}

export default App;`

    src.file("App.js", appContent)

    // Generate the zip file
    const content = await zip.generateAsync({ type: "blob" })

    // Save the zip file
    saveAs(content, "website-project.zip")
}

// Create a route component for the code editor
export const createCodeEditorRoute = () => {
    return {
        path: "/code-editor",
        element: <CodeEditorRedux />,
    }
}
