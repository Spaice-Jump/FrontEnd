import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './layout/Header.js';
import Footer from './layout/Footer.js';
import TravelSection from './layout/TravelSection.js';
import ExperienceSection from './layout/ExperienceSection.js';
import ProjectsSection from './layout/ProjectsSection.js';
import SubscribeSection from './layout/SubscribeSection.js';
import ContactSection from './layout/ContactSection.js';
import Travels from './Travels.js';
import setupNavbar from './layout/scripts.js';
import './css/styles.css';
import NewUserPage from './layout/auth/Signup/NewUserPage.jsx';

function Home() {
  return (
    <div>
      <Header />
      <TravelSection />
      <ExperienceSection />
      <ProjectsSection />
      <SubscribeSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

function App() {
  useEffect(() => {
    setupNavbar();
  }, []);

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/travels" element={<Travels />} />
        <Route path="/signup" element={ <NewUserPage />} />
      </Routes>
  );
}

export default App;
