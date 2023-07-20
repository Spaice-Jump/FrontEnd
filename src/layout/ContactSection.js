import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkedAlt,
  faEnvelope,
  faMobileAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faFacebookF,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

function ContactSection() {
  return (
    <section className="contact-section bg-black">
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5">
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="card py-4 h-100">
              <div className="card-body text-center">
                <FontAwesomeIcon
                  icon={faMapMarkedAlt}
                  className="text-primary mb-2"
                />
                <h4 className="text-uppercase m-0">Address</h4>
                <hr className="my-4 mx-auto" />
                <div className="small text-black-50">
                  4923 Market Street, Orlando FL
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="card py-4 h-100">
              <div className="card-body text-center">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-primary mb-2"
                />
                <h4 className="text-uppercase m-0">Email</h4>
                <hr className="my-4 mx-auto" />
                <div className="small text-black-50">
                  <a href="#!">hello@yourdomain.com</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="card py-4 h-100">
              <div className="card-body text-center">
                <FontAwesomeIcon
                  icon={faMobileAlt}
                  className="text-primary mb-2"
                />
                <h4 className="text-uppercase m-0">Phone</h4>
                <hr className="my-4 mx-auto" />
                <div className="small text-black-50">+1 (555) 902-8832</div>
              </div>
            </div>
          </div>
        </div>
        <div className="social d-flex justify-content-center">
          <a className="mx-2" href="#!">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a className="mx-2" href="#!">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a className="mx-2" href="#!">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
