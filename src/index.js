import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from 'ustudio-ui/theme';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundry from './components/error-boundry';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <ErrorBoundry>
          <App />
        </ErrorBoundry>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
