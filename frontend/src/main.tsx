import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import { InventoryContextProvider } from './context/inventoryContext.js';
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <InventoryContextProvider>
        <App />
      </InventoryContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
