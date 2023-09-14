import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header.js';
import Footer from './Footer.js';
import ContactSection from './ContactSection.js';
import Home from '../home/Home.jsx';
import Travels from '../travels/Travels.js';
import TravelDescription from '../travels/TravelDescription.js';
import NewUserPage from '../auth/Signup/NewUserPage.jsx';
import LoginPage from '../auth/login/loginPage.jsx';
import RequireAuth from '../RequireAuth.js';
import NewTravelPage from '../../components/NewTravelPage.jsx';
import RememberPassword from '../auth/login/RememberPassword.js';
import DeleteUserPage from '../auth/deleteUser/DeleteUserPage.jsx';
import UpdateUser from '../auth/updateUser/updateUser.js';
import EditTravelPage from '../../components/EditTravelPage.jsx';
import PurchasedTravel from '../../components/PurchasedTravel.jsx';
import TravelUser from '../travels/TravelUser.js';
import TravelFavorite from '../travels/TravelFavorite.js';
import TravelBuy from '../travels/TravelBuy.js';
import UpdatePassword from '../auth/login/UpdatePassword.js';
import Error404 from './error-404.js';

function MainLayout() {
  return (
    <div>
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
          path="/travel-buy"
          element={
            <RequireAuth>
              {' '}
              <TravelBuy />
            </RequireAuth>
          }
        />
        <Route
          path="/recorderPassword/:token"
          element={
            <UpdatePassword />
          }
        />
        <Route
          path="*"
          element={
            <Error404 />
          }
        />
      </Routes>
      <ContactSection />
      <Footer />
    </div>
  );
}

export default MainLayout;
