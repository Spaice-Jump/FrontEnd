import React from 'react';
import Header from './layout/Header.js';
import Footer from './layout/Footer.js';
import ExperienceSection from './layout/ExperienceSection.js';
import ContactSection from './layout/ContactSection.js';
import TravelsStructureTwo from './layout/TravelsStructureTwo.js';

function Travels() {
  return (
    <div>
      <Header />
      <ExperienceSection />
      <TravelsStructureTwo />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default Travels;
