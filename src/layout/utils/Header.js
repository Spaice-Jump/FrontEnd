import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../api/serviceLogin';
import { authLogout } from '../../redux/actions';
import { getIsLogged } from '../../redux/selectors';

function Header() {
  const isLogged = useSelector(getIsLogged) 
  
   console.log('islogged',isLogged)
   const dispatch = useDispatch();

  const handlerLogout = () => {
    dispatch(authLogout());
    logout();
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top"
      id="mainNav"
    >
      {
        <div class="container px-4 px-lg-5">
          <NavLink
            to="/"
            className="navbar-brand"
          >
            Inicio
          </NavLink>
          <button
            class="navbar-toggler navbar-toggler-right"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i class="fas fa-bars"></i>
          </button>
          <div
            class="collapse navbar-collapse"
            id="navbarResponsive"
          >
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a
                  class="nav-NavLink"
                  href="#about"
                >
                  Vive la experiencia
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-NavLink"
                  href="#projects"
                >
                  Distintas ideas del proyecto
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-NavLink"
                  href="#signup"
                >
                  Contacto o algo similar
                </a>
              </li>

              <li class="nav-item">
                <NavLink
                  to="/signup"
                  className="nav-NavLink"
                >
                  New Space User
                </NavLink>
              </li>

              <li class="nav-item">
                {
                isLogged ? <NavLink onClick={handlerLogout} className="nav-NavLink"> Logout </NavLink> :
                <NavLink
                  to="/login"
                  className="nav-NavLink"
                >
                  Login
                </NavLink>
                }
              </li>
            </ul>
          </div>
        </div>
      }
    </nav>
  );
}

export default Header;
