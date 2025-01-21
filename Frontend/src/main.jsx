import {  HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ShopContextProvider } from './context/ShopContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter >
    <ShopContextProvider>
      <App />
    </ShopContextProvider>

  </HashRouter>
);

