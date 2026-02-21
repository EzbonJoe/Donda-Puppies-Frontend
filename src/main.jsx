import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './mobile.css';
import App from './App.jsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { CartProvider } from './context/cartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>    
      <Router>                
        <App />        
      </Router>   
    </CartProvider>
  </React.StrictMode>
);