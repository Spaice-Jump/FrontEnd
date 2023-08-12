import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './layout/utils/Header.js';
import Footer from './layout/utils/Footer.js';
import ContactSection from './layout/utils/ContactSection.js';
import Travels from './layout/travels/Travels.js';
import setupNavbar from './layout/scripts.js';
import './css/styles.css';
import './layout/auth/login/login.css'
import NewUserPage from './layout/auth/Signup/NewUserPage.jsx';
import Home from './layout/home/Home.jsx';
import LoginPage from './layout/auth/login/loginPage.jsx';



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
        <Route path="/signup" element={ <NewUserPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <ContactSection />
      <Footer />
    </>
    
  );
}

export default App;
