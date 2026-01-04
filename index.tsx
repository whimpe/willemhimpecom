import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Build timestamp for debugging deployments
const BUILD_ID = import.meta.env.VITE_BUILD_ID || 'dev';
console.log('%c BUILD: ' + BUILD_ID, 'background: #222; color: #0f0; font-size: 14px; padding: 4px 8px;');

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);