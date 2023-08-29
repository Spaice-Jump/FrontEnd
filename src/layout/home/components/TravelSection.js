import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function TravelSection() {
  const { t } = useTranslation();
  return (
    <header className="masthead">
      {
        <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
          <div class="d-flex justify-content-center">
            <div class="text-center">
              <h1 class="mx-auto my-0 text-uppercase">{t('travel_section.title')}</h1>
              <h2 class="text-white-50 mx-auto mt-2 mb-5">
                Descripción del proyecto y nombre de nuestro equipo por ejemplo
              </h2>
              <Link to="/travels" className="btn btn-primary">Empieza tu viaje aquí</Link>
            </div>
          </div>
        </div>
      }
    </header>
  );
}

export default TravelSection;
