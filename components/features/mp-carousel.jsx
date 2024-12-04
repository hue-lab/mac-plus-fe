import {Swiper} from "swiper/react";
import clsx from "clsx";
import {useEffect, useRef} from "react";
import {Navigation, Pagination} from "swiper/modules";
import InlineSVG from "react-inlinesvg";
import {chevronBackOutlineIcon} from "~/icons/chevron-back-outline";
import {chevronForwardOutlineIcon} from "~/icons/chevron-forward-outline";
import 'swiper/css/pagination';

export default function MpCarousel({
  className,
  navOutside,
  children,
  hasNavigation = false,
  hasPagination = false,
  onSlideChange,
  spaceBetween = 30,
  length = 0,
  currIndex = 0
}) {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (currIndex !== swiperRef.current?.realIndex) {
      swiperRef.current?.slideTo(currIndex);
    }
  }, [currIndex]);

  return (
    <div className={clsx('mp-carousel-wrapper', className)}>
      <Swiper
        className="mp-carousel-swiper"
        onSwiper={(swiper) => swiperRef.current = swiper}
        modules={[Navigation, Pagination]}
        pagination={hasPagination ? {
          clickable: true
        } : undefined}
        spaceBetween={spaceBetween}
        slidesPerView={1}
        scrollbar={{draggable: true}}
        onSlideChange={onSlideChange}
      >
        {children}
      </Swiper>
      { (hasNavigation && length > 1) && (
        <div className={clsx('mp-carousel-navigation', {
          'mp-carousel-navigation-outside': navOutside
        })}>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className={clsx('mp-carousel-navigation-item', {
              'mp-carousel-navigation-item-disabled': currIndex <= 0
            })}
          >
            <InlineSVG
              className="mp-carousel-navigation-icon mp-carousel-navigation-icon-left"
              src={chevronBackOutlineIcon}
            />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className={clsx('mp-carousel-navigation-item', {
              'mp-carousel-navigation-item-disabled': currIndex >= length - 1
            })}
          >
            <InlineSVG
              className="mp-carousel-navigation-icon mp-carousel-navigation-icon-right"
              src={chevronForwardOutlineIcon}
            />
          </button>
        </div>
      )}
    </div>
  )
}
