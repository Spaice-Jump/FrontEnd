import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './layout/reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import storage from './layout/utils/storage';
import { setAuthorizationHeader } from './api/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
const accessToken = storage.get('auth');
if (accessToken) {
  setAuthorizationHeader(accessToken); //leemos al inicir o refrescar la pagina si hay token o no en el local storage
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
