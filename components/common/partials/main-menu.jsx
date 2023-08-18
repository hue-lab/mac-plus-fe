import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';

import { mainMenu } from '~/utils/data/menu';

function MainMenu({ router }) {
  const pathname = useRouter().pathname;

  return (
    <nav className="main-nav ml-4">
      <ul className="menu">
        <li id="menu-home" className={pathname === '/' ? 'active' : ''}>
          <ALink href='/'>Главная</ALink>
        </li>

        <li className={`submenu  ${pathname.includes('/shop') ? 'active' : ''}`}>
          <ALink href='/shop'>Mac</ALink>

          <div className="megamenu" style={{ marginLeft: "-19px" }}>
            <div className="row">
              <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                <h4 className="menu-title">Variations 1</h4>
                <ul>
                  {
                    mainMenu.shop.variation1.map((item, index) => (
                      <li key={`shop-${item.title}`}>
                        <ALink href={'/' + item.url}>
                          {item.title}
                          {item.hot ? <span className="tip tip-hot">Hot</span> : ""}
                        </ALink>
                      </li>
                    ))
                  }
                </ul>
              </div>

              <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                <h4 className="menu-title">Variations 2</h4>
                <ul>
                  {
                    mainMenu.shop.variation2.map((item, index) => (
                      <li key={`shop-${item.title}`}>
                        <ALink href={'/' + item.url}>
                          {item.title}
                          {item.new ? <span className="tip tip-new">New</span> : ""}
                        </ALink>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="col-6 col-sm-4 col-md-3 col-lg-4 menu-banner menu-banner1 banner banner-fixed">
                <figure>
                  <img src="./images/menu/banner-1.jpg" alt="Menu banner" width="221" height="330" />
                </figure>
                <div className="banner-content y-50">
                  <h4 className="banner-subtitle font-weight-bold text-primary ls-m">Sale.
                  </h4>
                  <h3 className="banner-title font-weight-bold"><span
                    className="text-uppercase">Up to</span>70% Off</h3>
                  <ALink href={"/shop"} className="btn btn-link btn-underline">shop now<i
                    className="d-icon-arrow-right"></i></ALink>
                </div>
              </div>
            </div>
          </div>
        </li>

        <li className={`submenu  ${pathname.includes('/iphone') && !pathname.includes('/elements') ? 'active' : ''}`}>
          <ALink href="/iphone">iPhone</ALink>        {/* /product/default/woman-dress */}

          <div className="megamenu" style={{ marginLeft: "-142px" }}>
            <div className="row">
              <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                <h4 className="menu-title">Product Pages</h4>
                <ul>
                  {
                    mainMenu.product.pages.map((item, index) => (
                      <li key={`product-${item.title}`}>
                        <ALink href={'/' + item.url}>
                          {item.title}
                          {item.hot ? <span className="tip tip-hot">Hot</span> : ""}
                        </ALink>
                      </li>
                    ))
                  }
                </ul>
              </div>

              <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                <h4 className="menu-title">Product Layouts</h4>
                <ul>
                  {
                    mainMenu.product.layout.map((item, index) => (
                      <li key={`product-${item.title}`}>
                        <ALink href={'/' + item.url}>
                          {item.title}
                          {item.new ? <span className="tip tip-new">New</span> : ""}
                        </ALink>
                      </li>
                    ))
                  }
                </ul>
              </div>

              <div className="col-6 col-sm-4 col-md-3 col-lg-4 menu-banner menu-banner2 banner banner-fixed">
                <figure>
                  <img src="./images/menu/banner-2.jpg" alt="Menu banner" width="221" height="330" />
                </figure>
                <div className="banner-content x-50 text-center">
                  <h3 className="banner-title text-white text-uppercase">Sunglasses</h3>
                  <h4 className="banner-subtitle font-weight-bold text-white mb-0">$23.00 - $120.00</h4>
                </div>
              </div>
            </div>
          </div>
        </li>

        <li className={`submenu  ${pathname.includes('/ipad') ? 'active' : ''}`}>
          <ALink href={`/ipad`}>iPad</ALink>

          <ul>
            {
              mainMenu.other.map((item, index) => (
                <li key={`other-${item.title}`}>
                  <ALink href={'/' + item.url}>
                    {item.title}
                    {item.new ? <span className="tip tip-new">New</span> : ""}
                  </ALink>
                </li>
              ))
            }
          </ul>
        </li>

        <li className={`${pathname.includes('/watch') ? 'active' : ''} submenu`}>
          <ALink href={`/watch`}>Watch</ALink>

          <ul>
            {
              mainMenu.element.map((item, index) => (
                <li key={`elements-${item.title}`}>
                  <ALink href={'/' + item.url}>
                    {item.title}
                  </ALink>
                </li>
              ))
            }
          </ul>
        </li>

        <li className={`${pathname.includes('/airpods') ? 'active' : ''} submenu`}>
          <ALink href={`/airpods`}>Airpods</ALink>

          <ul>
            {
              mainMenu.element.map((item, index) => (
                <li key={`elements-${item.title}`}>
                  <ALink href={'/' + item.url}>
                    {item.title}
                  </ALink>
                </li>
              ))
            }
          </ul>
        </li>
      </ul>
    </nav>
  )
}

export default MainMenu;