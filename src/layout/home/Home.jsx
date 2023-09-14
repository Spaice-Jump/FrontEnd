import React from "react";
import TravelSection from "./components/TravelSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import SubscribeSection from "./components/SubscribeSection";
import Layout from "../Layout";

function Home() {
  return (
    <Layout>
    <div>
      <TravelSection />
      <ExperienceSection />
      <ProjectsSection />
      <SubscribeSection />
    </div>
    </Layout>
  );
}

export default Home;
