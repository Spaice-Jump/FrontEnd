import React from "react";
import Layout from "../Layout";
import TravelSection from "./components/TravelSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import SubscribeSection from "./components/SubscribeSection";

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
