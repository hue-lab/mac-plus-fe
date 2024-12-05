import {useEffect} from 'react';
import ALink from '~/components/features/custom-link';
import InlineSVG from "react-inlinesvg";
import {homeOutlineBaseIcon} from "~/icons/home-outline-base";
import {listOutlineIcon} from "~/icons/list-outline";
import {bagOutlineIcon} from "~/icons/bag-outline";
import {bookOutlineIcon} from "~/icons/book-outline";

export default function StickyFooter() {
  let tmp = 0;

  useEffect(() => {
    window.addEventListener('scroll', stickyFooterHandler);

    return () => {
      window.removeEventListener('scroll', stickyFooterHandler);
    }
  }, [])

  const stickyFooterHandler = (e) => {
    let top = document.querySelector('.page-content') ? document.querySelector('.page-content').offsetTop + document.querySelector('header').offsetHeight + 100 : 600;
    let stickyFooter = document.querySelector('.sticky-footer.sticky-content');
    let height = 0;

    if (stickyFooter) {
      height = stickyFooter.offsetHeight;
    }

    const limitHeight = document.body.scrollHeight - window.innerHeight - 100;

    if (window.pageYOffset >= top && window.innerWidth < 768 && e.currentTarget.scrollY >= tmp) {
      if (stickyFooter) {
        stickyFooter.classList.add('fixed');
        stickyFooter.setAttribute('style', "margin-bottom: 0")
        if (!document.querySelector('.sticky-content-wrapper')) {
          let newNode = document.createElement("div");
          newNode.className = "sticky-content-wrapper";
          stickyFooter.parentNode.insertBefore(newNode, stickyFooter);
          document.querySelector('.sticky-content-wrapper').insertAdjacentElement('beforeend', stickyFooter);
          document.querySelector('.sticky-content-wrapper').setAttribute("style", "height: " + height + "px");
        }

        if (!document.querySelector('.sticky-content-wrapper').getAttribute("style")) {
          document.querySelector('.sticky-content-wrapper').setAttribute("style", "height: " + height + "px");
        }
      }
    } else if (e.currentTarget.scrollY < limitHeight) {
      if (stickyFooter) {
        stickyFooter.classList.remove('fixed');
        stickyFooter.setAttribute('style', `margin-bottom: -${height}px`)
      }

      if (document.querySelector('.sticky-content-wrapper')) {
        document.querySelector('.sticky-content-wrapper').removeAttribute("style");
      }
    }

    if (window.innerWidth > 767 && document.querySelector('.sticky-content-wrapper')) {
      document.querySelector('.sticky-content-wrapper').style.height = 'auto';
    }

    tmp = e.currentTarget.scrollY;
  }

  return (
    <div className="sticky-footer sticky-content fix-bottom">
      <ALink href="/" className="sticky-link">
        <InlineSVG className="icon-24" src={homeOutlineBaseIcon} />
        <span>Главная</span>
      </ALink>
      <ALink href="/categories" className="sticky-link">
        <InlineSVG style={{transform: 'scale(1.2)'}} className="icon-24" src={listOutlineIcon} />
        <span>Каталог</span>
      </ALink>
      <ALink href="/blog" className="sticky-link">
        <InlineSVG className="icon-24" src={bookOutlineIcon} />
        <span>Блог</span>
      </ALink>
      <ALink href="/pages/cart" className="sticky-link">
        <InlineSVG style={{transform: 'scale(1.1)'}} className="icon-24" src={bagOutlineIcon} />
        <span>Корзина</span>
      </ALink>
    </div>
  )
}
