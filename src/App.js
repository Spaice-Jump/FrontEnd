import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './layout/utils/Header.js';
import Footer from './layout/utils/Footer.js';
import ContactSection from './layout/utils/ContactSection.js';
import Travels from './layout/travels/Travels.js';
import TravelDescription from './layout/travels/TravelDescription.js';
import setupNavbar from './layout/scripts.js';
import './css/styles.css';
import './layout/auth/login/login.css'
import NewUserPage from './layout/auth/Signup/NewUserPage.jsx';
import Home from './layout/home/Home.jsx';
import LoginPage from './layout/auth/login/loginPage.jsx';
import './components/NewTravelPage.jsx';
import NewTravelPage from './components/NewTravelPage.jsx';

import RememberPassword from './layout/auth/login/RememberPassword.js';

import DeleteUserPage from './layout/auth/deleteUser/DeleteUserPage.jsx';
import EditTravelPage from './components/EditTravelPage.jsx';


function App() {
  useEffect(() => {
    setupNavbar();
  }, []);
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/travels" element={<Travels />} />
        <Route path="/travel/:id" element={<TravelDescription />} />
        <Route path="/signup" element={ <NewUserPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/newtravel" element={<NewTravelPage />} />

        <Route path="/password" element={<RememberPassword />}/>

        <Route path="/deleteUser" element={<DeleteUserPage />} />
        <Route path="/travel-edit/:id" element={<EditTravelPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <ContactSection />
      <Footer />
    </>
    
  );
}

export default App;
