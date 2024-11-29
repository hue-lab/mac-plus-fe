import ALink from '~/components/features/custom-link';
import { useRouter } from 'next/router';

import CartMenu from '~/components/common/partials/cart-menu';
import MainMenu from '~/components/common/partials/main-menu';
import SearchBox from '~/components/common/partials/search-box';
import { orderCategories } from '~/utils';
import Image from 'next/image';
import logoImage from '~/public/images/home/logo.png';

export default function Header({ categoryTree, fields }) {
  const router = useRouter();

  const showMobileMenu = () => {
    document.querySelector('body').classList.add('mmenu-active');
  };

  return (
    <header className="header">
      <div className="header-middle sticky-header fix-top sticky-content">
        <div className="container">
          <div className="header-left">
            <div className="mobile-menu-toggle" onClick={showMobileMenu}>
              <i className="d-icon-bars2"></i>
            </div>

            <ALink href="/" className="logo">
              <Image style={{ height: '56px', width: 'auto' }} src={logoImage} alt={fields['main-seo-title']} title={fields['main-seo-title']} width={200} height={56} />
            </ALink>

            <SearchBox />
          </div>

          <div className="header-right">
            <ALink href={`tel:${fields.phone}`} className="icon-box icon-box-side">
              <div className="icon-box-icon">
                <i className="d-icon-phone"></i>
              </div>
              <div className="icon-box-content d-lg-show">
                <span className="icon-box-title d-block">Телефон:</span>
                <p>{fields.phone}</p>
              </div>
            </ALink>

            <span className="divider"></span>

            {fields.telegram && <ALink rel="nofollow" href={fields.telegram} className="social-link social-link-header social-telegram fab fa-telegram-plane"></ALink>}
            {fields.viber && <ALink rel="nofollow" href={`viber://chat?number=${fields.viber}`} className="social-link social-link-header social-viber fab fa-viber"></ALink>}
            {fields.instagram && <ALink rel="nofollow" href={fields.instagram} className="social-link social-link-header social-instagram fab fa-instagram"></ALink>}

            <span className="divider"></span>

            <CartMenu />
          </div>
        </div>
      </div>

      <div className="header-bottom has-dropdown pb-0">
        <div className="container d-flex align-items-center">
          <div className="dropdown category-dropdown has-border">
            <ALink href="/shop" className="text-white font-weight-semi-bold category-toggle">
              <i className="d-icon-bars2"></i>
              <span>Каталог</span>
            </ALink>

            <div className="dropdown-box">
              <ul className="menu vertical-menu category-menu">
                <li>
                  <ALink href="#" className="menu-title">
                    Разделы каталога
                  </ALink>
                </li>

                {(categoryTree || []).sort(orderCategories).map((item, index) => (
                  <li key={index} className={item.children?.length ? 'submenu' : ''}>
                    <ALink href={{ pathname: `/${item.handle}` }}>
                      <span style={{ width: '30px', textAlign: 'center', display: 'inline-block' }}>
                        <i style={{ fontSize: `${item.icon.split('||')[1] || '1.8'}rem` }} className={item.icon.split('||')[0] || 'd-icon-arrow-right'}></i>
                      </span>
                      {item.name}
                    </ALink>
                    {item.children?.length > 0 && (
                      <ul>
                        {item.children.sort(orderCategories).map((item, index) => (
                          <li key={index}>
                            <ALink href={{ pathname: `/${item.handle}` }}>{item.name}</ALink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <MainMenu layoutFields={fields} categoryTree={categoryTree} />
        </div>
      </div>
    </header>
  );
}
