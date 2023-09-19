import ExperienceSection from './components/ExperienceSection';
import SubscribeSection from './components/SubscribeSection';
import ProjectsSection from './components/ProjectsSection';
import TravelSection from './components/TravelSection';
import TeamMember from './components/TeamMembers';
import Layout from '../Layout';
import React from 'react';

function Home() {
	return (
		<Layout>
			<div>
				<TravelSection />
				<ExperienceSection />
				<ProjectsSection />
				<TeamMember />
				<SubscribeSection />
			</div>
		</Layout>
	);
}

export default Home;
