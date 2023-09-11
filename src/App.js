import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './layout/utils/Header.js';
import Footer from './layout/utils/Footer.js';
import ContactSection from './layout/utils/ContactSection.js';
import Travels from './layout/travels/Travels.js';
import TravelDescription from './layout/travels/TravelDescription.js';
import setupNavbar from './layout/scripts.js';
import './css/styles.css';
import './layout/auth/login/login.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './layout/utils/i18n/i18n.js';
import NewUserPage from './layout/auth/Signup/NewUserPage.jsx';
import Home from './layout/home/Home.jsx';
import LoginPage from './layout/auth/login/loginPage.jsx';
import './components/NewTravelPage.jsx';
import NewTravelPage from './components/NewTravelPage.jsx';
import RememberPassword from './layout/auth/login/RememberPassword.js';
import DeleteUserPage from './layout/auth/deleteUser/DeleteUserPage.jsx';
import EditTravelPage from './components/EditTravelPage.jsx';
import RequireAuth from './layout/RequireAuth.js';
import UpdateUser from './layout/auth/updateUser/updateUser.js';
import PurchasedTravel from './components/PurchasedTravel.jsx';
import TravelUser from './layout/travels/TravelUser.js';
import TravelFavorite from './layout/travels/TravelFavorite.js';

function App() {
  useEffect(() => {
    setupNavbar();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/travels"
          element={<Travels />}
        />
        <Route
          path="/travel/:topic/:id"
          element={<TravelDescription />}
        />
        <Route
          path="/signup"
          element={<NewUserPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/newtravel"
          element={
            <RequireAuth>
              {' '}
              <NewTravelPage />
            </RequireAuth>
          }
        />

        <Route
          path="/password"
          element={<RememberPassword />}
        />

        <Route
          path="/deleteUser"
          element={
            <RequireAuth>
              {' '}
              <DeleteUserPage />
            </RequireAuth>
          }
        />

        <Route
          path="/updateUser"
          element={
            <RequireAuth>
              {' '}
              <UpdateUser />
            </RequireAuth>
          }
        />
        <Route
          path="/travel-edit/:topic/:id"
          element={<EditTravelPage />}
        />
        <Route
          path="/congratulations"
          element={<PurchasedTravel />}
        />
        <Route
          path="/travel-user/:user"
          element={<TravelUser />}
        />
        
        <Route
          path="/travel-favorite"
          element={
            <RequireAuth>
              {' '}
              <TravelFavorite />
            </RequireAuth>
          }
        />

        <Route
          path="*"
          element={<h1>Not Found</h1>}
        />
      </Routes>
      <ContactSection />
      <Footer />
    </I18nextProvider>
  );
}

export default App;
