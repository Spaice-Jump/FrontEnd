import React from "react";
import TravelSection from "./components/TravelSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import SubscribeSection from "./components/SubscribeSection";

function Home() {
  return (
    <div>
      <TravelSection />
      <ExperienceSection />
      <ProjectsSection />
      <SubscribeSection />
    </div>
  );
}

export default Home;
