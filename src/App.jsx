
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
// import DragAndDropPage from './components/testable/app-layouts';

const App = () => {
  return (
    // structure of my code editor
    <CodeProvider>
      <Routes>
        <Route path="/" element={<AppLayout />} />
        <Route path="/navbar-home" element={<Homenavbar />} />
        <Route path="/navbar-about" element={<Aboutnavbar />} />
        <Route path="/navbar-services" element={<Servicesnavbar />} />
        <Route path="/code-editor" element={<CodeEditorPage />} />
        <Route path='/editor' element={<Presentation />} />
      </Routes>
    </CodeProvider>
  );
};

export default App;



