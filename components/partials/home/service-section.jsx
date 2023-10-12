import React from 'react';
import Reveal from "react-awesome-reveal";

import OwlCarousel from '~/components/features/owl-carousel';

import { serviceSlider } from '~/utils/data/carousel';
import { zoomInLeft } from '~/utils/data/keyframes';

function ServiceBox({ fields }) {
  console.log(fields);
  return (
    <section className="container">
      <div className="service-list">
        <OwlCarousel adClass="owl-theme owl-middle" options={serviceSlider}>
          {Object.values(fields).map((feature) => (
            <Reveal keyframes={zoomInLeft} delay={200} duration={1200} triggerOnce key={feature}>
              <div className="icon-box text-center">
                <i className={`icon-box-icon ${feature.split('||')[1]}`} style={{ fontSize: `${feature.split('||')[2]}rem` }}></i>
                <div className="icon-box-content">
                  <h4 className="icon-box-title">{feature.split('||')[0]}</h4>
                </div>
              </div>
            </Reveal>
          ))}
        </OwlCarousel>
      </div>
    </section >
  )
}

export default React.memo(ServiceBox);