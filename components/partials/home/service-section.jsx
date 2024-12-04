import React from "react";
import Reveal from "react-awesome-reveal";

import OwlCarousel from "~/components/features/owl-carousel";

import { serviceSlider } from "~/utils/data/carousel";
import { zoomInLeft } from "~/utils/data/keyframes";
import InlineSVG from "react-inlinesvg";
import {servicesIcons} from "~/utils/data/services-icons";

function ServiceBox({ fields }) {
  return (
    <section className="container">
      <div className="service-list">
        <OwlCarousel adClass="owl-theme owl-middle" options={serviceSlider}>
          {Object.values(fields).map((feature) => (
            <Reveal keyframes={zoomInLeft} delay={200} duration={1200} triggerOnce key={feature}>
              <div className="icon-box text-center">
                <InlineSVG className="services-icon" src={servicesIcons[feature.split("||")[1]?.trim()]?.src} />
                <div className="icon-box-content">
                  <span className="icon-box-title text-dark">{feature.split("||")[0]}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </OwlCarousel>
      </div>
    </section>
  );
}

export default React.memo(ServiceBox);
