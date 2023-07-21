import React, { useEffect } from 'react';
import './App.js';
import Header from './layout/Header.js';
import TravelSection from './layout/TravelSection.js';
import ExperienceSection from './layout/ExperienceSection.js';
import ProjectsSection from './layout/ProjectsSection.js';
import SubscribeSection from './layout/SubscribeSection.js';
import ContactSection from './layout/ContactSection.js';
import Footer from './layout/Footer.js';
import setupNavbar from './layout/scripts.js';
import './css/styles.css';
import NewUserPage from './layout/auth/CreateUser/NewUserPage.jsx';
import { Route, Routes } from 'react-router-dom';

function App() {
  useEffect(() => {
    setupNavbar();
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/signup" element={ <NewUserPage />} />
        
      </Routes>
      <TravelSection />
      <ExperienceSection />
      <ProjectsSection />
      <SubscribeSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
