import React from "react";
import ExperienceImage from "../../../assets/img/vive-la-experiencia.png";
import { useTranslation } from "react-i18next";

function ExperienceSection() {
  const { t } = useTranslation();
  return (
    <section className="about-section text-center" id="about">
      {
        <div class="container px-4 px-lg-5">
          <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-lg-8">
              <h2 class="text-white mb-4">{t("experience_section.title")}</h2>
              <p class="text-white-50">
                (Algo que se nos ocurra que defina la experiencia y atrape al
                usuario)
              </p>
            </div>
          </div>
          <img class="img-fluid" src={ExperienceImage} alt="..." />
        </div>
      }
    </section>
  );
}

export default ExperienceSection;
