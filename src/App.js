import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './layout/utils/Header.js';
import Footer from './layout/utils/Footer.js';
import ContactSection from './layout/utils/ContactSection.js';
import TravelsStructureTwo from './layout/travels/Travels.js';
import setupNavbar from './layout/scripts.js';
import './css/styles.css';
import NewUserPage from './layout/auth/Signup/NewUserPage.jsx';
import Home from './layout/home/Home.jsx';


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
      </Routes>
      <ContactSection />
      <Footer />
    </>
    
  );
}

export default App;
