import React from 'react';

function TravelSection() {
  return (
    <header className="masthead">
      {
        <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
          <div class="d-flex justify-content-center">
            <div class="text-center">
              <h1 class="mx-auto my-0 text-uppercase">VIAJA AL ESPACIO</h1>
              <h2 class="text-white-50 mx-auto mt-2 mb-5">
                Descripción del proyecto y nombre de nuestro equipo por ejemplo
              </h2>
              <a
                class="btn btn-primary"
                href="#about"
              >
                Empieza tu viaje aquí
              </a>
            </div>
          </div>
        </div>
      }
    </header>
  );
}

export default TravelSection;
