import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { BlockProvider } from './context/miniNavContext.jsx';
// import { BlockContextProvider } from './context/viewBlockContext.jsx';
import { ComponentsProvider } from './context/componentsContext.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ComponentsProvider>
      <BlockProvider>
        <Router>
          <App />
        </Router>
      </BlockProvider>
    </ComponentsProvider>
  </StrictMode>
);
