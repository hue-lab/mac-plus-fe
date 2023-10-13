import ALink from '~/components/features/custom-link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import CartMenu from '~/components/common/partials/cart-menu';
import MainMenu from '~/components/common/partials/main-menu';
import SearchBox from '~/components/common/partials/search-box';

export default function Header({ categoryTree, fields }) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== '/') {
      document.querySelector('.category-dropdown.dropdown').classList.contains('fixed') && document.querySelector('.category-dropdown.dropdown').classList.remove('fixed')
    } else {
      document.querySelector('.category-dropdown.dropdown').classList.add('fixed')
    }
  }, [router.pathname])

  const showMobileMenu = () => {
    document.querySelector('body').classList.add('mmenu-active');
  }

  return (
    <header className="header">
      <div className="header-middle sticky-header fix-top sticky-content">
        <div className="container">
          <div className="header-left">
            <ALink href="#" className="mobile-menu-toggle" onClick={showMobileMenu}>
              <i className="d-icon-bars2"></i>
            </ALink>

            <ALink href="/" className="logo">
              <img src='./images/home/logo.png' alt="logo" width="154" height="43" />
            </ALink>

            <SearchBox />
          </div>

          <div className="header-right">
            <ALink href="tel:#" className="icon-box icon-box-side">
              <div className="icon-box-icon">
                <i className="d-icon-phone"></i>
              </div>
              <div className="icon-box-content d-lg-show">
                <h4 className="icon-box-title">Телефон:</h4>
                <p>{fields.phone}</p>
              </div>
            </ALink>

            <span className="divider"></span>

            { fields.telegram && <ALink href={fields.telegram} className="social-link social-link-header social-telegram fab fa-telegram-plane"></ALink> }
            { fields.viber && <ALink href={`viber://chat?number=${fields.viber}`} className="social-link social-link-header social-viber fab fa-viber"></ALink> }
            { fields.instagram && <ALink href={fields.instagram} className="social-link social-link-header social-instagram fab fa-instagram"></ALink> }

            <span className="divider"></span>

            <CartMenu />
          </div>
        </div>
      </div>

      <div className="header-bottom has-dropdown pb-0">
        <div className="container d-flex align-items-center">
          <div className="dropdown category-dropdown has-border fixed">
            <ALink href="/shop" className="text-white font-weight-semi-bold category-toggle"><i className="d-icon-bars2"></i><span>Каталог</span></ALink>

            <div className="dropdown-box">
              <ul className="menu vertical-menu category-menu">
                <li><ALink href="#" className="menu-title">Разделы каталога</ALink></li>

                {(categoryTree || []).map((item, index) => (
                  <li key={index} className={item.children?.length ? 'submenu' : ''}>
                    <ALink href={{ pathname: `/shop`, query: { category: item._id } }}><i style={{ fontSize: `${item.icon.split('||')[1] || '1.8'}rem` }} className={item.icon.split('||')[0] || 'd-icon-arrow-right'}></i>{item.name}</ALink>
                    {item.children?.length > 0 && <ul>
                      {item.children.map((item, index) => (
                        <li key={index}><ALink href={{ pathname: `/shop`, query: { category: item._id } }}>{item.name}</ALink></li>
                      ))}
                    </ul>
                    }
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <MainMenu categoryTree={categoryTree} />
        </div>
      </div>
    </header >
  );
}
