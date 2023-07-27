import React from 'react';
import Header from './layout/Header.js';
import Footer from './layout/Footer.js';
import ExperienceSection from './layout/ExperienceSection.js';
import ContactSection from './layout/ContactSection.js';
import TravelsSectionOneStructure from './layout/TravelsSectionStructureOne.js';

function Travels() {
  return (
    <div>
      <Header />
      <ExperienceSection />
      <TravelsSectionOneStructure />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default Travels;
