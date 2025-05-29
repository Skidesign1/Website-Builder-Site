import { Route, Routes } from 'react-router-dom';
import './index.css'
import WebsiteBuilderPage from './improvedWbsiteBuilder/page';
import CodeEditorRedux from './improvedWbsiteBuilder/codeEditor/code-Editor-redux';
import FilestackUploader from './improvedWbsiteBuilder/lib/filestack';

const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<WebsiteBuilderPage />} />
        <Route path="/code-editor" element={<CodeEditorRedux />} />
        <Route path="/filestack" element={<FilestackUploader />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

export default App;



