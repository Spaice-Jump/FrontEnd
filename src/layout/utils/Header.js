import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getMe, logout } from '../../api/serviceAuth';
import { useTranslation } from 'react-i18next';
import { authLoginSuccess, authLogout } from '../../redux/actions';
import { getIsLogged, getUserId } from '../../redux/selectors';
import flagEn from '../../assets/img/flag_en.png'
import flagEs from '../../assets/img/flag_es.png'
import storage from './storage';

function Header() {
  const { t, i18n } = useTranslation();
  const changeLanguage = language => {
    i18n.changeLanguage(language);
  };
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);

  //Effect to search de userId
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        const accessToken = storage.get('auth');
        if (accessToken !== null) {
          try {
            const newUserId = await getMe(accessToken);
            console.log(newUserId);
            dispatch(authLoginSuccess(newUserId));
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      }
    };

    fetchData();
  }, [userId, dispatch]);

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
          <li className="nav-item dropdown">
          <button
              className="nav-link dropdown-toggle"
              id="languageDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={i18n.language === 'en' ? flagEn : flagEs}
                alt={i18n.language.toUpperCase()}
                className="language-flag"
              />
            </button>
            <ul
              className="dropdown-menu"
              aria-labelledby="languageDropdown"
            >
              <li>
                <button
                  onClick={() => changeLanguage('en')}
                  className="dropdown-item"
                >
                  <img src={flagEn} alt="EN" className="language-flag" /> EN
                </button>
              </li>
              <li>
                <button
                  onClick={() => changeLanguage('es')}
                  className="dropdown-item"
                >
                  <img src={flagEs} alt="ES" className="language-flag" /> ES
                </button>
              </li>
            </ul>
          </li>
          <NavLink
            to="/"
            className="navbar-brand"
          >
            {t('navbar.home')}
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
            {t('navbar.menu_mobile')}
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
                  {t('navbar.experience')}
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

              {isLogged ? (
                <>
                  <li class="nav-item">
                    <NavLink
                      to="/newtravel"
                      className="nav-NavLink"
                    >
                      Crear Viaje
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink
                      to="/updateUser"
                      className="nav-NavLink"
                    >
                      Update User
                    </NavLink>
                  </li>

                  <li class="nav-item">
                    <NavLink
                      to="/deleteUser"
                      className="nav-NavLink"
                    >
                      Delete User
                    </NavLink>
                  </li>

                  <li class="nav-item">
                    <NavLink
                      onClick={handlerLogout}
                      className="nav-NavLink"
                    >
                      {' '}
                      Logout{' '}
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li class="nav-item">
                    <NavLink
                      to="/signup"
                      className="nav-NavLink"
                    >
                      New Space User
                    </NavLink>
                  </li>

                  <li class="nav-item">
                    <NavLink
                      to="/login"
                      className="nav-NavLink"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      }
    </nav>
  );
}

export default Header;
