import React from 'react';
import antonioMember from '../../../assets/img/antonio-team-member.png'
import cristianMember from '../../../assets/img/cristian-team-member.png'
import xaviMember from '../../../assets/img/xavi-team-member.png'
import jesusMember from '../../../assets/img/jesus-team-member.png'
import enricMember from '../../../assets/img/enric-team-member.png'

const TeamMember = () => {
  return (
    <section className="team-members-section">
      {/* <div className='title-container'></div>
      <h2 className="team-title">Conoce a el equipo que lo ha hecho posible</h2> */}
      <div className="profile-card">
        <div className="img">
          <img src={enricMember} alt="Enric" />
        </div>
        <div className="caption">
          <h3>Enric</h3>
          <p>Full Stack Developer</p>
          <div className="social-links">
            <a href="#"><i className="fa-brands fa-github"></i></a>
            <a href="#"><i class="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
      </div>

      <div className="profile-card">
        <div className="img">
          <img src={antonioMember} alt="Antonio" />
        </div>
        <div className="caption">
          <h3>Antonio</h3>
          <p>Full Stack Developer</p>
          <div className="social-links">
            <a href="#"><i className="fa-brands fa-github"></i></a>
            <a href="#"><i class="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
      </div>

      <div className="profile-card">
        <div className="img">
          <img src={cristianMember} alt="Cristian" />
        </div>
        <div className="caption">
          <h3>Cristian</h3>
          <p>Full Stack Developer</p>
          <div className="social-links">
            <a href="#"><i className="fa-brands fa-github"></i></a>
            <a href="#"><i class="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
      </div>

      <div className="profile-card">
        <div className="img">
          <img src={xaviMember} alt="Xavi" />
        </div>
        <div className="caption">
          <h3>Xavi</h3>
          <p>Full Stack Developer</p>
          <div className="social-links">
            <a href="#"><i className="fa-brands fa-github"></i></a>
            <a href="#"><i class="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
      </div>

      <div className="profile-card">
        <div className="img">
          <img src={jesusMember} alt="Jesus" />
        </div>
        <div className="caption">
          <h3>Jesus</h3>
          <p>Full Stack Developer</p>
          <div className="social-links">
            <a href="#"><i className="fa-brands fa-github"></i></a>
            <a href="#"><i class="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamMember;