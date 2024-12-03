import {Swiper} from "swiper/react";
import clsx from "clsx";
import {useEffect, useRef} from "react";
import {Navigation} from "swiper/modules";
import InlineSVG from "react-inlinesvg";
import {chevronBackOutlineIcon} from "~/icons/chevron-back-outline";
import {chevronForwardOutlineIcon} from "~/icons/chevron-forward-outline";

export default function MpCarousel({
  className,
  children,
  hasNavigation = false,
  onSlideChange,
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
        onSwiper={(swiper) => swiperRef.current = swiper}
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        scrollbar={{draggable: true}}
        onSlideChange={onSlideChange}
      >
        {children}
      </Swiper>
      { (hasNavigation && length > 1) && (
        <div className="mp-carousel-navigation">
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