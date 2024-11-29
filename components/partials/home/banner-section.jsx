import React from 'react';
import Reveal from 'react-awesome-reveal';
import recycleImage from '~/public/images/recycle.png';

import ALink from '~/components/features/custom-link';

import { fadeIn } from '~/utils/data/keyframes';
import Image from 'next/image';

function BannerSection({ tradeInTitle, tradeInSubtitle, tradeInDescription }) {
  return (
    <section className="banner-group container mt-10 pb-4 pt-2 mb-10">
      <Reveal keyframes={fadeIn} delay={200} duration={1200} triggerOnce>
        <div className="banner1 banner" style={{ backgroundColor: '#007945', overflow: 'hidden', borderRadius: '2rem' }}>
          <div className="banner-content">
            <div>
              <Image src={recycleImage} alt="Trade-in" title="Trade-in" width={60} height={60} loading="lazy" className="banner-icon mb-4" />
            </div>
            <span className="banner-title text-white ls-normal lh-1">{tradeInTitle}</span>
            <span className="banner-subtitle text-white ls-normal lh-1">{tradeInSubtitle}</span>
            <p className="mb-7 text-white">{tradeInDescription}</p>
            <div className="banner-links">
              <ALink href="/pages/trade-in" className="btn btn-link btn-white btn-underline font-weight-bold">
                Подробнее<i className="fas fa-angle-right"></i>
              </ALink>
              <ALink href="/pages/contact-us" className="btn btn-link btn-white btn-underline font-weight-bold">
                Связаться<i className="fas fa-angle-right"></i>
              </ALink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default React.memo(BannerSection);
