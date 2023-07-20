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

function App() {
  useEffect(() => {
    setupNavbar();
  }, []);

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

export default App;
