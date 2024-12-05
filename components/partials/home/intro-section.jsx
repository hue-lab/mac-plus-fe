import React from 'react';
import {getImgPath} from '~/utils';
import Image from 'next/image';
import MpCarousel from "~/components/features/mp-carousel";
import {SwiperSlide} from "swiper/react";
import Link from "next/link";

function IntroSection({ slides }) {
  return (
    <div className="intro-section container">
      <div className="row">
        <div className="mb-4 mb-lg-0">
          <MpCarousel
            length={slides?.length || 0}
            className="intro-section-carousel"
            hasNavigation={true}
            hasPagination={true}
            navOutside={true}
          >
            {(slides || []).map((item, index) => (
              <SwiperSlide key={index}>
                <Link href={`/blog/${item.seo?.seoUrl || '#'}`}>
                  <div className="intro-section-carousel-item">
                    <Image
                      className="intro-section-carousel-img"
                      src={getImgPath(item.media)}
                      alt={item.seo?.imageAlt || item.title}
                      title={item.seo?.seoTitle || item.title}
                      width={2360}
                      height={920} priority loading="eager"
                      sizes="(max-width: 768px) 120vw, (max-width: 1200px) 90vw, 90vw"
                      quality={100}
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </MpCarousel>
        </div>
      </div>
    </div>
  );
}

export default React.memo(IntroSection);
