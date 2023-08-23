import React from 'react';
import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from 'react-lazy-load-image-component';

// import Custom Components
import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import { introSlider } from '~/utils/data/carousel';
import { fadeInRightShorter, fadeInUp, fadeInLeftShorter, blurIn, fadeInDownShorter, fadeIn } from '~/utils/data/keyframes';

function IntroSection() {
  return (
    <div className="intro-section container">
      <div className="row">
        <div className="mb-4 mb-lg-0">
          <OwlCarousel adClass="intro-slider owl-theme owl-dot-inner animation-slider" options={introSlider}>
            <div className="banner banner-fixed intro-slide1" style={{ backgroundColor: "#e8e8ea" }}>
              <figure>
                <LazyLoadImage
                  src="./images/home/slides/1.jpg"
                  alt="Intro Slider"
                  effect="opacity"
                  width="auto"
                  height={460}
                />
              </figure>

              <div className="banner-content x-50 y-50 text-center d-flex flex-column align-items-center">
                <Reveal keyframes={fadeInUp} delay={200} duration={1500}>
                  <h4 className="banner-subtitle text-body font-weight-normal">Financing Offer</h4>
                </Reveal>

                <Reveal keyframes={fadeInUp} delay={300} duration={1500}>
                  <h3 className="banner-title">Camera, Lens and Tablet</h3>
                </Reveal>

                <Reveal keyframes={fadeInLeftShorter} delay={300} duration={1200}>
                  <p className="font-weight-semi-bold text-grey">Discount</p>
                </Reveal>

                <Reveal keyframes={fadeInRightShorter} delay={800} duration={1200} className="flex-1">
                  <div className="banner-price-info ls-s text-uppercase text-primary font-weight-bold">40% OFF</div>
                </Reveal>

                <Reveal keyframes={fadeIn} delay={1000} duration={1200}>
                  <ALink href="/shop" className="btn btn-outline btn-dark btn-rounded" >Подробнее</ALink>
                </Reveal>
              </div>
            </div>

            <div className="banner banner-fixed intro-slide2" style={{ backgroundColor: "#7a7675" }}>
              <figure>
                <LazyLoadImage
                  src="./images/home/slides/2.jpg"
                  alt="Intro Slider"
                  effect="opacity"
                  width="auto"
                  height={460}
                />
              </figure>

              <div className="banner-content x-50 y-50 text-center">
                <Reveal keyframes={blurIn} delay={200} duration={1500}>
                  <h4 className="banner-subtitle mb-1 ls-l text-white text-uppercase font-weight-normal">Flash Sales</h4>
                  <h3 className="banner-title ls-l text-white text-uppercase font-weight-bold">Up to 70% Discount</h3>
                  <p className="ls-l mb-5 text-white font-primary">Extra Off Everything online</p>
                  <ALink className="btn btn-outline btn-white btn-rounded mb-1" href="/shop">Подробнее</ALink>
                </Reveal>
              </div>
            </div>
          </OwlCarousel >
        </div>
      </div>
    </div>
  )
}

export default React.memo(IntroSection);