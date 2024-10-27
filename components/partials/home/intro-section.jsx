import React from "react";
import Reveal from "react-awesome-reveal";

import ALink from "~/components/features/custom-link";
import OwlCarousel from "~/components/features/owl-carousel";
import {introSlider} from "~/utils/data/carousel";
import {blurIn} from "~/utils/data/keyframes";
import {getImgPath} from "~/utils";
import Image from "next/image";

function IntroSection({ slides }) {
  return (
    <div className="intro-section container">
      <div className="row">
        <div className="mb-4 mb-lg-0">
          <OwlCarousel
            adClass="intro-slider owl-theme owl-dot-inner animation-slider"
            options={introSlider}
          >
            {(slides || []).map((item, index) => (
              <div
                key={index}
                className="banner banner-fixed intro-slide2"
                style={{ backgroundColor: "#101010" }}
              >
                <figure>
                  <Image
                    src={getImgPath(item.media)}
                    alt={item.seo?.seoImageAlt || ""}
                    effect="opacity"
                    width={1180}
                    height={460}
                    priority
                    style={{ opacity: 0.3, width: "100%", height: "460px", objectFit: "cover" }}
                  />
                </figure>

                <div className="banner-content x-50 y-50 text-center">
                  <Reveal keyframes={blurIn} delay={200} duration={1500}>
                    <span className="banner-title ls-l text-white text-uppercase font-weight-bold">
                      {item.title}
                    </span>
                    <p className="ls-l mb-5 text-white font-primary">{item.description}</p>
                    <ALink
                      className="btn btn-outline btn-white btn-rounded mb-1"
                      href={`/blog/${item.seo?.seoUrl || "#"}`}
                    >
                      Подробнее
                    </ALink>
                  </Reveal>
                </div>
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>
    </div>
  );
}

export default React.memo(IntroSection);
