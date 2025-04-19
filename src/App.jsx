
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayouts';
import './index.css';
import CodeEditorPage from './components/CodeEditorPage';
import Homenavbar from "./components/canvacomponent/Homenavbar"
import Aboutnavbar from "./components/canvacomponent/Aboutnavbar"
import Servicesnavbar from './components/canvacomponent/Servicesnavbar';
import { CodeProvider } from "./context/CodeContext";
import Presentation from './components/sidebars/blocks';
import WebsiteBuilderPage from './improvedWbsiteBuilder/page';
import CodeEditorRedux from './improvedWbsiteBuilder/codeEditor/code-Editor-redux';
// import DragAndDropPage from './components/testable/app-layouts';

const App = () => {
  return (
    // structure of my code editor
    <CodeProvider>
      <Routes>
        <Route path="/" element={<WebsiteBuilderPage />} />
        <Route path="/navbar-home" element={<Homenavbar />} />
        <Route path="/navbar-about" element={<Aboutnavbar />} />
        <Route path="/navbar-services" element={<Servicesnavbar />} />
        <Route path="/code-editor" element={<CodeEditorRedux />} />
        <Route path='/editor' element={<Presentation />} />
      </Routes>
    </CodeProvider>
  );
};

export default App;



