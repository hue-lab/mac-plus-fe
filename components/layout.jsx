import {useEffect} from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-image-lightbox/style.css';
import Header from '~/components/common/header';
import Footer from '~/components/common/footer';
import StickyFooter from '~/components/common/sticky-footer';
import MobileMenu from '~/components/common/partials/mobile-menu';

import {scrollTopHandler, showScrollTopHandler, stickyFooterHandler, stickyHeaderHandler} from '~/utils';
import {Poppins} from "next/font/google";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

function Layout({ children, categoryTree, layoutFields, footerNav }) {

  if (typeof  window !== 'undefined') {

    useEffect(() => {
      window.addEventListener('scroll', showScrollTopHandler, true);
      window.addEventListener('scroll', stickyHeaderHandler, true);
      window.addEventListener('scroll', stickyFooterHandler, true);
      window.addEventListener('resize', stickyHeaderHandler, true);
      window.addEventListener('resize', stickyFooterHandler, true);

      return () => {
        window.removeEventListener('scroll', showScrollTopHandler, true);
        window.removeEventListener('scroll', stickyHeaderHandler, true);
        window.removeEventListener('scroll', stickyFooterHandler, true);
        window.removeEventListener('resize', stickyHeaderHandler, true);
        window.removeEventListener('resize', stickyFooterHandler, true);
      }
    }, [])
  }

  return (
    <>
      <div className={`page-wrapper ${poppins.className}`}>
        <Header categoryTree={categoryTree} fields={layoutFields} />

        {children}

        <Footer categoryTree={categoryTree} fields={layoutFields} footerNav={footerNav} />

        <StickyFooter />
      </div>

      <div id="scroll-top" title="Top" role="button" className="scroll-top" onClick={() => scrollTopHandler(false)}><i className="d-icon-arrow-up"></i></div>

      <MobileMenu categoryTree={categoryTree} />
    </>
  )
}

export default Layout;
