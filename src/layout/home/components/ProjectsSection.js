import React from "react";
import allPlanets from "../../../assets/img/all-planets.jpg";
import newEnvironments from "../../../assets/img/new-environments.jpg";
import differentShips from "../../../assets/img/different-ships.jpg";

function ProjectsSection() {
  return (
    <section className="projects-section bg-light" id="projects">
      {
        <div className="container px-4 px-lg-5">
          {/*Featured Project Row*/}
          <div className="row gx-0 mb-4 mb-lg-5 align-items-center">
            <div className="col-xl-8 col-lg-7">
              <img className="img-fluid mb-3 mb-lg-0 " src={allPlanets} alt="..." />
            </div>
            <div className="col-xl-4 col-lg-5">
              <div className="featured-text text-center text-lg-left">
                <h4>¡Viaja por todo el sistema solar!</h4>
                <p className="text-black-50 mb-0">
                  Prepárate para un emocionante viaje interplanetario que te llevará a recorrer cada rincón de nuestro sistema solar, desde el ardiente sol de Mercurio hasta las heladas lunas de Neptuno. ¡Descubre los secretos y maravillas de este asombroso viaje cósmico!
                </p>
              </div>
            </div>
          </div>
          {/*Project One Row*/}
          <div className="row gx-0 mb-5 mb-lg-0 justify-content-center">
            <div className="col-lg-6">
              <img className="img-fluid new-height-custom" src={newEnvironments} alt="..." />
            </div>
            <div className="col-lg-6">
              <div className="bg-black text-center h-100 project">
                <div className="d-flex h-100">
                  <div className="project-text w-100 my-auto text-center text-lg-left">
                    <h4 className="text-white">¡Descubre nuevos mundos y paisajes admirables!</h4>
                    <p className="mb-0 text-white-50">
                      Adéntrate en un viaje lleno de sorpresas mientras exploras nuevos mundos y paisajes admirables. Desde exóticos parajes terrestres hasta inexploradas maravillas extraterrestres, te esperan experiencias asombrosas en cada rincón de nuestro universo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Project two Row*/}
          <div className="row gx-0 justify-content-center">
            <div className="col-lg-6">
              <img className="img-fluid new-height-custom" src={differentShips} alt="..." />
            </div>
            <div className="col-lg-6 order-lg-first">
              <div className="bg-black text-center h-100 project">
                <div className="d-flex h-100">
                  <div className="project-text w-100 my-auto text-center text-lg-right">
                    <h4 className="text-white">¡Viaja en todo tipo de naves!</h4>
                    <p className="mb-0 text-white-50">
                      Prepárate para una emocionante aventura en la que podrás viajar en todo tipo de naves. Desde naves espaciales de alta tecnología hasta naves clásicas y exóticas, este viaje te llevará a explorar el espacio de la manera más espectacular y variada posible. ¡Embárcate en una odisea intergaláctica única!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </section>
  );
}

export default ProjectsSection;
