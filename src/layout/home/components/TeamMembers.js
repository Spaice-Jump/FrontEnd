import cristianMember from '../../../assets/img/cristian-team-member.png';
import antonioMember from '../../../assets/img/antonio-team-member.png';
import enricMember from '../../../assets/img/enric-team-member.png';
import jesusMember from '../../../assets/img/jesus-team-member.png';
import xaviMember from '../../../assets/img/xavi-team-member.png';
import { useTranslation } from 'react-i18next';
import React from 'react';

const TeamMember = () => {
	const { t } = useTranslation();
	return (
		<section className="team-members-section">
			<div className="title-container">
				<h2 className="team-title text-white">{t('team_members.title')}</h2>
			</div>
			<div className="profile-card enric">
				<div className="img">
					<img
						src={enricMember}
						alt="Enric"
					/>
				</div>
				<div className="caption">
					<h3>Enric</h3>
					<p>Full Stack Developer</p>
					<div className="social-links">
						<a href="#">
							<i className="fa-brands fa-github"></i>
						</a>
						<a href="#">
							<i class="fa-brands fa-linkedin"></i>
						</a>
					</div>
				</div>
			</div>

			<div className="profile-card antonio">
				<div className="img">
					<img
						src={antonioMember}
						alt="Antonio"
					/>
				</div>
				<div className="caption">
					<h3>Antonio</h3>
					<p>Full Stack Developer</p>
					<div className="social-links">
						<a href="#">
							<i className="fa-brands fa-github"></i>
						</a>
						<a href="#">
							<i class="fa-brands fa-linkedin"></i>
						</a>
					</div>
				</div>
			</div>

			<div className="profile-card cristian">
				<div className="img">
					<img
						src={cristianMember}
						alt="Cristian"
					/>
				</div>
				<div className="caption">
					<h3>Cristian</h3>
					<p>Full Stack Developer</p>
					<div className="social-links">
						<a href="#">
							<i className="fa-brands fa-github"></i>
						</a>
						<a href="#">
							<i class="fa-brands fa-linkedin"></i>
						</a>
					</div>
				</div>
			</div>

			<div className="profile-card xavi">
				<div className="img">
					<img
						src={xaviMember}
						alt="Xavi"
					/>
				</div>
				<div className="caption">
					<h3>Xavi</h3>
					<p>Full Stack Developer</p>
					<div className="social-links">
						<a href="#">
							<i className="fa-brands fa-github"></i>
						</a>
						<a href="#">
							<i class="fa-brands fa-linkedin"></i>
						</a>
					</div>
				</div>
			</div>

			<div className="profile-card jesus">
				<div className="img">
					<img
						src={jesusMember}
						alt="Jesus"
					/>
				</div>
				<div className="caption">
					<h3>Jesus</h3>
					<p>Full Stack Developer</p>
					<div className="social-links">
						<a href="#">
							<i className="fa-brands fa-github"></i>
						</a>
						<a href="#">
							<i class="fa-brands fa-linkedin"></i>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TeamMember;
