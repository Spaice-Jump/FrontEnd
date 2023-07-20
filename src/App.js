import React, { useEffect } from 'react';
import './App.js';
import Header from './Header';
import TravelSection from './TravelSection.js';
import ExperienceSection from './ExperienceSection';
import ProjectsSection from './ProjectsSection';
import SubscribeSection from './SubscribeSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import setupNavbar from './scripts';
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
