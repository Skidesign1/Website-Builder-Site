import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { BlockProvider } from './context/miniNavContext.jsx';
// import { BlockContextProvider } from './context/viewBlockContext.jsx';
import { ComponentsProvider } from './context/componentsContext.jsx';
import AppLayout from './components/AppLayouts.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './components/reduxState/store.jsx';
import App from './App.jsx';
import DragAndDropPage from './components/testable/app-layouts.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ComponentsProvider>
      <BlockProvider>
        <Provider store={store}>
          <Router>
            {/* <App /> */}
            <DragAndDropPage />
          </Router>
        </Provider>
      </BlockProvider>
    </ComponentsProvider>
  </StrictMode>
);
