import React, { useEffect } from 'react';
import AllRoutes from './layout/utils/AllRoutes.js';
import setupNavbar from './layout/scripts.js';
import './css/styles.css';
import './layout/auth/login/login.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './layout/utils/i18n/i18n.js';
import './components/NewTravelPage.jsx';
import Cookies from 'js-cookie';

function App() {

  useEffect(() => {
    const selectedLanguage = Cookies.get('selectedLanguage');

    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
  }, []);

  useEffect(() => {
    setupNavbar();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <AllRoutes />       
    </I18nextProvider>
  );
}

export default App;
