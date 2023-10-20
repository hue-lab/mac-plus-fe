import React from 'react';
import Reveal from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import { fadeIn, fadeInRightShorter, fadeInLeftShorter } from '~/utils/data/keyframes';
import { bannerSlider } from '~/utils/data/carousel';

function BannerSection ({ tradeInTitle, tradeInDescription }) {
    return (
        <section className="banner-group container mt-10 pb-4 pt-2 mb-10">
            <Reveal keyframes={ fadeIn } delay={ 200 } duration={ 1200 } triggerOnce>
                <OwlCarousel adClass="owl-theme" options={ bannerSlider }>
                    <Reveal keyframes={ fadeInRightShorter } delay={ 200 } duration={ 1200 } triggerOnce>
                        <div className="banner1 banner banner-fixed overlay-zoom" style={ { backgroundColor: "#3cbea4" } }>
                            <figure>
                                <LazyLoadImage
                                    src="./images/trade-in.jpg"
                                    alt="banner"
                                    effect="opacity; transform;"
                                    width="auto"
                                    height={ 219 }
                                />
                            </figure>
                            <div className="banner-content y-50">
                                <h3 className="banner-title text-white ls-normal lh-1">{tradeInTitle}</h3>
                                <p className="mb-7 text-white">{tradeInDescription}</p>
                                <div className="banner-links">
                                    <ALink href="/pages/trade-in" className="btn btn-link btn-white btn-underline font-weight-bold">Подробнее<i className="fas fa-angle-right"></i></ALink>
                                    <ALink href="/pages/contact-us" className="btn btn-link btn-white btn-underline font-weight-bold">Связаться<i className="fas fa-angle-right"></i></ALink>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </OwlCarousel>
            </Reveal>
        </section>
    )
}

export default React.memo( BannerSection );