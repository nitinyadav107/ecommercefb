import {  HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ShopContextProvider } from './context/ShopContext.jsx';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter >
      <ShopContextProvider>
        <App />
      </ShopContextProvider>

    </HashRouter>
  </React.StrictMode>
);
