import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import { InventoryContextProvider } from './context/inventoryContext.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InventoryContextProvider>
      <App />
    </InventoryContextProvider>
  </React.StrictMode>
);
