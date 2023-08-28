import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './layout/reportWebVitals';
import { BrowserRouter, createBrowserRouter } from 'react-router-dom';
import storage from './layout/utils/storage';
import { setAuthorizationHeader } from './api/client';
import { Provider } from 'react-redux';
import configureStore from './redux';
import Root from './Root';

const accessToken = storage.get('auth');
if (accessToken) {
  setAuthorizationHeader(accessToken); //leemos al inicir o refrescar la pagina si hay token o no en el local storage
}
const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
  },
]);
const store = configureStore({ auth: {isLogged:!!accessToken}}, { router }); //creamos el store y ya disponemos de dispatch, getState...
const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     <Provider store={store} router={router}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );
root.render(
/*   <React.StrictMode> */
    <Root store={store} router={router} />
/*   </React.StrictMode>, */
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
