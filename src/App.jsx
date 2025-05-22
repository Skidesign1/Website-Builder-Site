import { Route, Routes } from 'react-router-dom';
import './index.css'
import WebsiteBuilderPage from './improvedWbsiteBuilder/page';
import CodeEditorRedux from './improvedWbsiteBuilder/codeEditor/code-Editor-redux';


const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<WebsiteBuilderPage />} />
        <Route path="/code-editor" element={<CodeEditorRedux />} />
      </Routes>
    </div>
  );
};

export default App;



